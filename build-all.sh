#!/bin/bash
# Build and stages the GitHub web fundamentals repo contents to devsite.
# Run from the location of a clone of the fundamentals repo.


##### DEFINES #####

WEBDIR="$(pwd)"
DGRAY="\033[0;30m"
NOCOLOR="\033[0m"
GREEN="\033[1;32m"

##### FUNCTIONS #####

function log {
  NOW=$(date +"%T")
  echo -e "[$DGRAY$NOW$NOCOLOR] $1 '$GREEN$2$NOCOLOR'"
}

##### SCRIPT #####

log "Starting" "check pre-requisites"
# - do we have node installed
log "" "Node"
VER="$(node -v)"
if [ "${VER:0:5}" != "v0.12" ]; then
    log "ERROR" "please install node 0.12"
    exit
fi
log "" "Node OK"

# - are we in the web dir?
log "" "CWD"
if [ ! -f ".drone.yml" ]; then
  log "ERROR" "please make sure you're in the git checkout location."
  exit
fi
log "" "CWD OK"
log "Finished" "check pre-requisites"

log "Starting" "Updating codelabs"
node tools/generate-codelabs.js
if [ $? -ne 0 ]; then
    log "ERROR" "Codelabs were not updated!"
fi
cd $WEBDIR
log "Finsihed" "Updating codelabs"


log "Starting" "Generating codelab pages"
node tools/generate-codelabs.js
if [ $? -ne 0 ]; then
    log "ERROR" "Unable to generate codelab files..."
fi
log "Finsihed" "Generating codelab pages"




# node build-codelabs.js
