#!/bin/bash
set -e

curl -s https://blinkcomponents-b48b5.firebaseapp.com/blinkcomponents | awk '{gsub (/,/,",\n  "); print}' > src/data/blinkComponents.json
