#!/bin/bash
# Publishes samples from build/langs/en/resources/samples to Git
# Run from the location of a clone of the fundamentals repo.


##### DEFINES #####

WEBDIR="$(pwd)"
GHSAMPLESDIR="/tmp/WF-gh-pages"
DGRAY="\033[0;30m"
NOCOLOR="\033[0m"
GREEN="\033[1;32m"


##### FUNCTIONS #####

function log {
  NOW=$(date +"%T")
  echo -e "[$DGRAY$NOW$NOCOLOR] $1 '$GREEN$2$NOCOLOR'"
}

##### SCRIPT #####

log "Starting" "publish samples"

#-- Pre-req check --#

log "Starting" "check prerequisites"

# - are we in the web dir?
log "Starting" "check current directory (pwd)"
if [ ! -f "gulpfile.js" ]; then
  log "ERROR" "please make sure you're in the git checkout location."
  exit
fi
log "Finished" "check current directory (pwd)"


# - do the samples exist?
log "Starting" "check if samples exist"
if [ ! -d "build/langs/en/resources/samples" ]; then
  log "ERROR" "Couldn't find any samples."
  exit
fi
log "Finished" "check if samples exist"
log "Finished" "check prerequisites"


# Checks if the $GHSAMPLEDIR exists, if not, create and clone repo there
if [[ ! -d $GHSAMPLESDIR ]]; then
  log "Starting" "clone sample repo"
  mkdir $GHSAMPLESDIR
  git clone -b gh-pages https://github.com/googlesamples/web-fundamentals.git $GHSAMPLESDIR
  log "Finished" "clone sample repo"
fi

log "Starting" "sync sample repo"
cd $GHSAMPLESDIR || exit
git pull
log "Finished" "sync sample repo"

log "Starting" "copy samples"
rsync --delete -a $WEBDIR/build/langs/en/resources/samples/* samples/
log "Finished" "copy samples"

log "Starting" "add new files to repo"
git add .
log "Finished" "add new files to repo"

log "Starting" "commit to repo"
git commit -a -m "Updating Web Fundamentals Samples"
log "Finished" "commit to repo"

log "Starting" "push"
git push origin gh-pages
log "Finished" "push"

log "Finished" "publish samples"
log "View at" "https://github.com/googlesamples/web-fundamentals/tree/gh-pages"
