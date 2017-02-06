#!/bin/bash

# If branch is NOT master, abort.
if [ "${TRAVIS_BRANCH}" != "master" ]; then
  exit
fi

# If there were build failures, abort
if [ "${TRAVIS_TEST_RESULT}" = "1" ]; then
  exit
fi

echo "Travis Auto-Deployment (master)"

$HOME/google-cloud-sdk/bin/gcloud app deploy app.yaml -q --no-promote --version master
