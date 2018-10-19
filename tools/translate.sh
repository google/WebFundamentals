export GOOGLE_APPLICATION_CREDENTIALS=../../key.json
find ../src/content/en/updates/2018/01/ -iname "cr*.md" -exec node translate.js -s '{}' -t hi,fr,es,ja,de,vi,ru,id \;


#find src/content/en/updates/2018/01/ -iname "*.md" -exec node translate.js -s '{}' -t hi,fr,es,ja,de,vi,ru,id \;
