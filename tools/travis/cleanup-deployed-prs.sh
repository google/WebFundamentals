#!/bin/bash
set -ev

#
# Clean-up Deployed PRs
#

# If this isn't a push, abort.
if [ "${TRAVIS_EVENT_TYPE}" != "push" ]; then
  exit
fi

# If this isn't master, abort.
if [ "${TRAVIS_BRANCH}" = "master" ]; then
  exit
fi

# TODO - Cleanup Deployed PRs
$HOME/google-cloud-sdk/bin/gcloud app versions list
