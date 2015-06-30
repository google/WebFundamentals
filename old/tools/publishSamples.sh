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

echo "----- Getting latest bits"
cd $GHSAMPLESDIR
# Make sure we've got the latest bits
git pull

echo "----- Copying latest samples to $GHSAMPLESDIR"
# Copy the samples from the build directory to the $GHSAMPLEDIR
cp -r $WEBDIR/appengine/build/_langs/en/fundamentals/resources/samples/* $GHSAMPLESDIR/samples

echo "----- Copying additional resource files"
# Move the index file from samples to the root
mv $GHSAMPLESDIR/samples/index.html $GHSAMPLESDIR/index.html

# Copy the required assets from the build to their directories
if [[ ! -d $GHSAMPLESDIR/web/ ]]; then
  mkdir $GHSAMPLESDIR/web/
fi
cp $WEBDIR/appengine/build/favicon.ico $GHSAMPLESDIR/web/

if [[ ! -d $GHSAMPLESDIR/web/css/ ]]; then
  mkdir $GHSAMPLESDIR/web/css/
fi
cp $WEBDIR/appengine/build/css/styles.min.css $GHSAMPLESDIR/web/css/

if [[ ! -d $GHSAMPLESDIR/web/icons/ ]]; then
  mkdir $GHSAMPLESDIR/icons/
fi
cp $WEBDIR/appengine/build/icons/icons.* $GHSAMPLESDIR/web/icons/

if [[ ! -d $GHSAMPLESDIR/web/imgs/ ]]; then
  mkdir $GHSAMPLESDIR/web/imgs/
fi
cp $WEBDIR/appengine/build/imgs/developers-logo.svg $GHSAMPLESDIR/web/imgs/
cp $WEBDIR/appengine/build/imgs/developers-logo_short.svg $GHSAMPLESDIR/web/imgs/


# Commit and push changes up to repo
echo "----- Adding new files"
git add .
echo "----- Commiting to repo"
git commit -a -m "Updating Web Fundamentals Samples to $LASTCOMMIT"
echo "----- Pushing to gh-pages"
git push origin gh-pages

popd
echo "----- Done!"
echo ""
echo ""

echo "----- Samples pushed live to https://github.com/googlesamples/web-fundamentals/tree/gh-pages
  View the samples at: https://googlesamples.github.io/web-fundamentals/samples/
  To clean up after yourself, run:
  rm -rf $GHSAMPLESDIR"
