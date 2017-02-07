#!/bin/bash
set -ev

#
# Clean-up Deployed PRs
#

# If this isn't a cron job, abort.
if [ "${TRAVIS_EVENT_TYPE}" != "cron" ]; then
  exit
fi

# TODO - Cleanup Deployed PRs
$HOME/google-cloud-sdk/bin/gcloud app versions list
