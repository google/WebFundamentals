#!/bin/bash
# fail on errors
set -e

CLOUDSDK_URL=https://dl.google.com/dl/cloudsdk/release/google-cloud-sdk.tar.gz
SDK_DIR=google-cloud-sdk
GCLOUD=$SDK_DIR/bin/gcloud

# deploy only master builds
if [ "$TRAVIS_BRANCH" != "master" ] || [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo "Skip deploy."
  exit 0
fi

export CLOUDSDK_CORE_DISABLE_PROMPTS=1
export CLOUDSDK_PYTHON_SITEPACKAGES=1

if [ ! -d $SDK_DIR ]; then
  mkdir -p $SDK_DIR
  curl -o /tmp/gcloud.tar.gz $CLOUDSDK_URL
  tar xzf /tmp/gcloud.tar.gz --strip 1 -C $SDK_DIR
  $SDK_DIR/install.sh
fi

$GCLOUD components update app -q
openssl aes-256-cbc -d -K $encrypted_29722e8fb5df_key -iv $encrypted_29722e8fb5df_iv \
        -in tools/web-central-44673aab0806.json.enc \
        -out tools/web-central-44673aab0806.json
$GCLOUD auth activate-service-account $SERVICE_ACCOUNT \
        --key-file tools/web-central-44673aab0806.json
$GCLOUD preview app deploy ./appengine --version travis-master --project web-central

