#!/bin/bash
set -ev

#
# Auto-Deploy MASTER
#

# If this isn't a push, abort.
if [ "${TRAVIS_EVENT_TYPE}" != "push" ]; then
  exit
fi

# If this isn't master, abort.
if [ "${TRAVIS_BRANCH}" != "master" ]; then
  exit
fi

# If there were build failures, abort...
if [ "${TRAVIS_TEST_RESULT}" = "1" ]; then
  echo "Deploy aborted, there were test failures."
  exit
fi

# Deploy to AppEngine
$HOME/google-cloud-sdk/bin/gcloud app deploy app.yaml -q --no-promote --version master

# Flush the MemCache
curl https://$AE_APP_ID.appspot.com/flushMemCache
