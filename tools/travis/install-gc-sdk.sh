#!/bin/bash

# If there were build failures, abort
if [ "${TRAVIS_TEST_RESULT}" = "1" ]; then
  exit
fi

echo "Travis - Install Google Cloud SDK"

#openssl aes-256-cbc -K $encrypted_7c1b14c4fe42_key -iv $encrypted_7c1b14c4fe42_iv -in gcloud-client-secret.json.enc -out gcloud-client-secret.json -d
openssl aes-256-cbc -K $encrypted_0d37b620515f_key -iv $encrypted_0d37b620515f_iv -in gcloud-client-secret.json.enc -out gcloud-client-secret.json -d

curl https://sdk.cloud.google.com | bash
$HOME/google-cloud-sdk/bin/gcloud components install app-engine-python
$HOME/google-cloud-sdk/bin/gcloud components update app -q

$HOME/google-cloud-sdk/bin/gcloud config set project web-central
$HOME/google-cloud-sdk/bin/gcloud auth activate-service-account --key-file gcloud-client-secret.json
