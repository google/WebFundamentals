# Web Fundamentals on DevSite 

## Getting Set Up
1. Get [App Engine Python](https://cloud.google.com/appengine/downloads#Google_App_Engine_SDK_for_Python)
2. Install dependencies: `pip install markdown -t ./gae/lib`
3. Run `npm install` (needed for `build-contributors.js`)

## Generate/Update the contributors include files
1. Run `node build-contributors.js`

## Serve the files
1. Run `start-appengine.sh`

## Convert files from old to new
You have two options, either use Matt's tool, or Pete's RegEx

### Pete's RegEx
Yes, this could be a lot cleaner and easier, sorry.
1. Copy original files into directory where you want them to go
2. Edit `migrate.js` and at the bottom of the script, change the path
3. Run `node migrate.js` It will then create new `.md` files and leave the
   original `.markdown` files in tact so you can verify and copy anything that
   might have gotten lost.
4. Delete the old `.markdown` files
