#!/bin/bash
set -ev

#
# Install the Google Cloud SDK
#

# If encrypted variables aren't available, abort
if [ -z "${GIT_TOKEN}" ]; then
  echo "Encrypted variables are unavailable, skipping."
  exit
fi

# Decrypt the Service Account Key
openssl aes-256-cbc -K $encrypted_7c1b14c4fe42_key -iv $encrypted_7c1b14c4fe42_iv -in gcloud-client-secret.json.enc -out gcloud-client-secret.json -d

if [ ! -f $HOME/google-cloud-sdk/bin/gcloud ]; then
  # Download & install the Google Cloud SDK
  curl https://sdk.cloud.google.com | bash
fi

# Update any necessary components
$HOME/google-cloud-sdk/bin/gcloud components update app -q

# Set the AppEngine App ID to $AE_APP_ID
$HOME/google-cloud-sdk/bin/gcloud config set project $AE_APP_ID

# Authenticate to AppEngine using the service account
$HOME/google-cloud-sdk/bin/gcloud auth activate-service-account --key-file gcloud-client-secret.json
