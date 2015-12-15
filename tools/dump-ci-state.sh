#!/bin/bash
cat > .state <<EOF
export CI_REPO=$CI_REPO
export CI_BRANCH=$CI_BRANCH
export CI_COMMIT=$CI_COMMIT
export CI_PULL_REQUEST=$CI_PULL_REQUEST
EOF
