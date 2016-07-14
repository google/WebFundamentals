This is a copy of the old jekyll build but it's output is devsite friendly markdown.

Edit layouts, includes and plugins here to alter all of the content.

you'll need to run the following in this directory:

    easy_install pygments
    gem install bundler
    rvm . do bundle install

Then run:

    ./alteration-script.sh

This script will copy over the old content, run jekyll over it using the migration layouts, includes and plugins and produce a more devsite friendly markdown version.
