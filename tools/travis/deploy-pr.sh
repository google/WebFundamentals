#!/bin/bash

# If this is the master branch, abort
if [ "${TRAVIS_BRANCH}" = "master" ]; then
  exit
fi

# If there were build failures, abort
if [ "${TRAVIS_TEST_RESULT}" = "1" ]; then
  exit
fi

echo "Travis Auto-Deployment (PR)"

echo "TODO - deploy PR here..."
