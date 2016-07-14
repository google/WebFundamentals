#!/bin/bash
set -e

rm -rf ./build/

cp -r ./src/content/ ./build/

# Move to build directory so edits are safe
cd ./build/

# Rename .markdown to .md
find . -iname "*.markdown" -exec bash -c 'mv "$0" "${0%\.markdown}.md"' {} \;

find . -iname "*.md" -exec bash -c 'sed -i "$0" -e "s/{% include shared\/toc.liquid %}//g"' {} \;
