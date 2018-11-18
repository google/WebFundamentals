#!/bin/bash

TEMP_FILE='tempFile.txt'

getResource() {
  echo $1
  curl --compressed --fail --progress-bar $1 > $TEMP_FILE
  if [ $? -eq 0 ]; then
      mv $TEMP_FILE $2
  else
      echo Unable to update $1
      rm $TEMP_FILE
  fi
}

echo "Getting lastest CSS and Script resources..."

getResource https://developers.google.com/_static/css/devsite-google-blue.css gae/styles/devsite-google-blue.css
getResource https://developers.google.com/_static/css/devsite-orange.css gae/styles/devsite-orange.css

getResource https://developers.google.com/_static/js/framebox.js gae/scripts/framebox.js
getResource https://developers.google.com/_static/js/jquery-bundle.js gae/scripts/jquery-bundle.js
getResource https://developers.google.com/_static/js/script_foot_closure.js gae/scripts/script_foot_closure.js
getResource https://developers.google.com/_static/js/script_foot.js gae/scripts/script_foot.js
getResource https://developers.google.com/_static/js/prettify-bundle.js gae/scripts/prettify-bundle.js
