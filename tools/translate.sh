#!/bin/bash

export GOOGLE_APPLICATION_CREDENTIALS=../../key.json
find ../src/content/en/fundamentals/codelabs/your-first-pwapp/ -iname "*.md" |
while read filename
do
  node translate.js -s $filename -t ar,de,es,fr,hi,id,ja,ko,pt-br,ru,vi,zh-cn,zh-tw  \;
done

#ar,de,es,fr,hi,id,ja,ko,pt-br,ru,vi,zh-cn,zh-tw
#find src/content/en/updates/2018/01/ -iname "*.md" -exec node translate.js -s '{}' -t hi,fr,es,ja,de,vi,ru,id \;
