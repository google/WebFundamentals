#!/bin/bash
set -e

mkdir -p ./jekyll/_includes/svgs/

cp -r ../Old/src/content/ ./
cp -r ../Old/src/static/imgs/*.svg ./jekyll/_includes/svgs/

# Move to content directory so edits are safe
# Rename .markdown to .md
cd ./content/
find . -iname "*.markdown" -exec bash -c 'mv "$0" "${0%\.markdown}.md"' {} \;
find . -iname "*.md" -exec bash -c 'sed -i "$0" -e "s/{% include shared\/toc.liquid %}//g"' {} \;
cd ..

# Build Jekyll Site (WF markdown to Devsite markdown)
bundle exec jekyll build --config "./jekyll/_config/common.yml,./jekyll/_config/appengine.yml,./jekyll/_config/localhost.yml"

# Change HTML extension to md
cd ./build/
find . -iname "*.html" -exec bash -c 'mv "$0" "${0%\.html}.md"' {} \;
cd ..
