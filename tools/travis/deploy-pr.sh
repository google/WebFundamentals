#!/bin/bash

#
# Auto-Deploy Pull Request
#

# If encrypted variables aren't available, abort
if [ -z "${GIT_TOKEN}" ]; then
  echo "Encrypted variables are unavailable, skipping."
  exit
fi

# If this isn't a pull request, abort.
if [ "${TRAVIS_EVENT_TYPE}" != "pull_request" ]; then
  echo "This only runs on pull_request events. Event was $TRAVIS_EVENT_TYPE"
  exit
fi

# If there were build failures, abort
if [ "${TRAVIS_TEST_RESULT}" = "1" ]; then
  echo "Deploy aborted, there were test failures."
  exit
fi

# Set git build status to Pending
node tools/travis/updateGitStatus.js pending

# Set the AppEngine version for staging
VERSION=pr-$TRAVIS_PULL_REQUEST

# Show the final staged URL
STAGED_URL=https://$VERSION-dot-$AE_APP_ID.appspot.com
echo "Pull Request: $TRAVIS_PULL_REQUEST will be staged at $STAGED_URL"

# Deploy to AppEngine
echo "Deploying to AppEngine ($VERSION)..."
$HOME/google-cloud-sdk/bin/gcloud app deploy app.yaml -q --no-promote --version $VERSION

if [ $? -eq 0 ]; then
  # Set git build status to Success
  node tools/travis/updateGitStatus.js success $STAGED_URL
  # Flush the MemCache
  echo "Flushing MemCache... ($STAGED_URL)"
  curl $STAGED_URL/flushMemCache
else
  # Set git build status to Failed
  node tools/travis/updateGitStatus.js failure
fi
