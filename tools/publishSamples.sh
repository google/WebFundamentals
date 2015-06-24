#!/bin/bash
# Script to sync the GitHub web fundamentals samples contents onto GitHub Pages.
# Run from the location of a clone of the fundamentals repo.

WEBDIR="$(pwd)"
GHSAMPLESDIR="/tmp/WF-gh-pages"

# Verifies we are in the WF Root Dir by checking for the existance of 
# Gruntfile.js
if [ ! -f "Gruntfile.js" ]; then
  # TODO: this should be more robust, right now any Gruntfile.js will work.
  echo "Please make sure you're in the git checkout location."
  exit
fi


echo "----- Getting latest sources from GitHub"

# Git pull
git checkout master
git pull

# Checks the exit code, if it is Not Equal to zero, fail.
if [ $? -ne 0 ]; then
  echo "Updating the git repo failed, please check for errors."
  exit
fi

# Save the last commit ID for use later
LASTCOMMIT=$(git rev-list HEAD --max-count=1)


echo "----- Building WebFundamentals (en only)"

# Make devsite
grunt samples --lang=en

# Checks the exit code, if it is Not Equal to zero, fail.
if [ $? -ne 0 ]; then
  echo "Build failed - please fix before continuing"
  exit
fi

echo "----- Syncing samples to Github Pages clone"

pushd .

# Checks if the $GHSAMPLEDIR exists, if not, create and clone repo there
if [[ ! -d $GHSAMPLESDIR ]]; then
  mkdir $GHSAMPLESDIR
  git clone -b gh-pages https://github.com/googlesamples/web-fundamentals.git $GHSAMPLESDIR
fi

cd $GHSAMPLESDIR
# Make sure we've got the latest bits
git pull

# Copy the samples from the build directory to the $GHSAMPLEDIR
cp -r $WEBDIR/appengine/build/_langs/en/fundamentals/resources/samples/* $GHSAMPLESDIR/samples

# Commit and push changes up to repo
git add .
git commit -a -m "Updating Web Fundamentals Samples to $LASTCOMMIT"
git push origin gh-pages

popd

echo "----- Samples pushed live to https://github.com/googlesamples/web-fundamentals/tree/gh-pages
  View the samples at: https://googlesamples.github.io/web-fundamentals/samples/
  To clean up after yourself, run:
  rm -rf $GHSAMPLESDIR"
