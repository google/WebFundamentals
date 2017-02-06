#!/bin/bash

function installGAE {
  curl https://sdk.cloud.google.com | bash
  $HOME/google-cloud-sdk/bin/gcloud components update app -q
}

function pullRequest {
  echo "*** PULL REQUEST ***"
  installGAE
}

function deployMaster {
  echo "--- MASTER BUILD ---"
}


echo "Travis Deploy Script"

echo TRAVIS_BRANCH $TRAVIS_BRANCH
echo TRAVIS_BUILD_ID $TRAVIS_BUILD_ID
echo TRAVIS_BUILD_NUMBER $TRAVIS_BUILD_NUMBER
echo TRAVIS_BUILD_DIR $TRAVIS_BUILD_DIR
echo TRAVIS_PULL_REQUEST $TRAVIS_PULL_REQUEST
echo TRAVIS_PULL_REQUEST_BRANCH $TRAVIS_PULL_REQUEST_BRANCH
echo TRAVIS_EVENT_TYPE $TRAVIS_EVENT_TYPE
echo TRAVIS_TEST_RESULT $TRAVIS_TEST_RESULT

if [ "${TRAVIS_EVENT_TYPE}" = "pull_request" ]; then
  pullRequest
else
  deployMaster
fi
