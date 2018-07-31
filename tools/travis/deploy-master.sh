#!/bin/bash

#
# Auto-Deploy MASTER
#

# If encrypted variables aren't available, abort
if [ -z "${GIT_TOKEN}" ]; then
  echo "Encrypted variables are unavailable, skipping."
  exit
fi

# If this isn't a push, abort.
if [ "${TRAVIS_EVENT_TYPE}" != "push" ]; then
  echo "This only runs on push events. Event was $TRAVIS_EVENT_TYPE"
  exit
fi

# If this isn't master, abort.
if [ "${TRAVIS_BRANCH}" != "master" ]; then
  echo "This only runs on the master branch. Branch was $TRAVIS_BRANCH"
  exit
fi

# If there were build failures, abort...
if [ "${TRAVIS_TEST_RESULT}" = "1" ]; then
  echo "Deploy aborted, there were test failures."
  exit
fi

# Deploy to AppEngine
echo "Deploying to AppEngine (master)..."
$HOME/google-cloud-sdk/bin/gcloud app deploy app.yaml -q --no-promote --version master

# Flush the MemCache
echo "Flushing MemCache..."
curl https://$AE_APP_ID.appspot.com/flushMemCache
