#!/bin/bash
set -e

echo "Getting lastest CSS and Script resources..."

curl https://developers.google.com/_static/css/devsite-google-blue.css > gae/styles/devsite-google-blue.css
curl https://developers.google.com/_static/css/devsite-orange.css > gae/styles/devsite-orange.css
curl https://developers.google.com/_static/js/framebox.js > gae/scripts/framebox.js
curl https://developers.google.com/_static/js/jquery_ui-bundle.js > gae/scripts/jquery_ui-bundle.js
curl https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js > gae/scripts/jquery-2.1.1.min.js
curl https://developers.google.com/_static/js/prettify-bundle.js > gae/scripts/prettify-bundle.js
curl https://developers.google.com/_static/js/script_foot_closure.js > gae/scripts/footer-closure.js
curl -s https://blinkcomponents-b48b5.firebaseapp.com/blinkcomponents | awk '{gsub (/,/,",\n  "); print}' > src/data/blinkComponents.json
