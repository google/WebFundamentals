#!/bin/bash
# Script to sync the GitHub web fundamentals samples contents onto GitHub Pages.
# Run from the location of a clone of the fundamentals repo.

WEBDIR="$(pwd)"
GHDIR="/tmp/WF-gh-pages"

# - are we in the web dir?
if [ ! -f "Gruntfile.js" ]; then
  echo "Please make sure you're in the git checkout location."
  exit
fi

echo "----- Getting latest sources from GitHub"

# Git pull
git checkout master
git pull https://github.com/Google/WebFundamentals master
LASTCOMMIT=$(git rev-list HEAD --max-count=1)

if [ $? -ne 0 ]; then
  echo "Updating the git repo failed, please check for errors."
  exit
fi

echo "----- Building WebFundamentals (en only)"

# Make devsite
grunt devsite --lang=en

if [ $? -ne 0 ]; then
  echo "Build failed - please fix before continuing"
  exit
fi

echo "----- Syncing samples to Github Pages clone"

pushd .

if [[ ! -d $GHDIR ]]; then
  mkdir $GHDIR
  git clone -b gh-pages https://github.com/googlesamples/web-fundamentals.git $GHDIR
fi
cd $GHDIR
git pull
cp -r $WEBDIR/appengine/build/_langs/en/fundamentals/resources/samples/* $GHDIR/samples
git commit -a -m "Updating Web Fundamentals Samples to $LASTCOMMIT"
git push origin gh-pages

popd

echo "----- Samples pushed live.
  To clean up after yourself, run:
  rm -rf $GHDIR"
