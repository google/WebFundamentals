#!/bin/bash
function updateState {
  curl -so /dev/null -X POST -H "Authorization: token $GITHUB_TOKEN" \
    -d "{\"state\": \"$1\", \"target_url\": \"$DRONE_BUILD_URL\", \"description\": \"drone.io\", \"context\": \"ci/drone\"}" \
    https://api.github.com/repos/google/WebFundamentals/statuses/$DRONE_COMMIT;
}

updateState pending

bundle install --deployment && \
npm install -g grunt-cli && \
npm install

if [ $? -ne "0" ]; then
  updateState error
  exit 1
fi

grunt build

if [ $? -ne "0" ]; then
  updateState failure
  exit 1
fi

updateState success
