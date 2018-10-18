export GOOGLE_APPLICATION_CREDENTIALS=../key.json
find src/content/en/updates/2018/01/ -iname "*.md" -exec node translate.js -s '{}' -t id \;


#find src/content/en/updates/2018/01/ -iname "*.md" -exec node translate.js -s '{}' -t hi,fr,es,ja,de,ta,vi,ru,id \;
