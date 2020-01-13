project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A regular round-up of articles, videos and talks authored by the Yeoman community.

{# wf_updated_on: 2019-01-16 #}
{# wf_published_on: 2013-12-25 #}
{# wf_tags: news,frontend,workflow,tools,yeoman #}
{# wf_blink_components: N/A #}

# The Yeoman Monthly Digest #2 {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}


Allo’ Allo’ and Happy Holidays! Welcome to the second issue of the [Yeoman](http://yeoman.io) monthly digest – our regular round-up of articles, tips, generators and videos to help you stay on top of what’s new with your favourite man-in-a-hat. We hope you find the updates below helpful!

## Grunt pro-tips

It’s tempting to try every Grunt plug-in out there – there’s a bajillion! It’s also easy to get carried away. Before you know it, you’re staring at your terminal far longer than you used to be, waiting for your tasks to complete. It can be frustrating during your build, but *super* frustrating during your watch.

Fortunately, the community has been working towards speeding up your development cycle even more.

* Reduce your Grunt compilation time with [this](https://github.com/gruntjs/grunt/issues/975#issuecomment-29058707) custom task trick
* Use [grunt-newer](https://github.com/tschaub/grunt-newer) to only run Grunt tasks on files that changed
* Run tasks concurrently with [grunt-concurrent](https://github.com/sindresorhus/grunt-concurrent) so multiple tasks can be run simultaneously

Some other tips:

* Use [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks) to load multiple tasks automatically rather than `loadNpmTask`-ing it yourself
* [Reuse multiple Grunt environments across multiple projects](https://npmjs.org/package/grunt-source)

## Videos

* [Lessons learned building an app with Yeoman, Angular and Node at MadJS](https://www.youtube.com/watch?v=VvrpjH5g9Fo)

* [Yeoman at NebraskaJS](https://www.youtube.com/watch?v=TUk19YoP-oI)

* [Yeoman Generators at NebraskaJS](https://www.youtube.com/watch?v=oPfeuVtOGz4)

* [Yeoman Generator Development (part 1)](https://www.youtube.com/watch?v=q-KRiwXhbhU)

* [Up and running with Sass boilerplate generator](https://www.youtube.com/watch?v=KqG4sY0KBAo)

* [Angular workflow with Yeoman and WebStorm](https://www.youtube.com/watch?v=_HYVuHHR55A)

* [A Yeoman generator for Drupal themes](https://www.youtube.com/watch?v=5YnC7iQBObk)


## Articles

* [Easy Angular development with Yeoman & AngularJS](http://jjt.io/2013/11/14/easy-angular-development-yeoman-generator-angular/)

* [Full-stack with Yeoman and MEAN](
http://addyosmani.com/blog/full-stack-javascript-with-mean-and-yeoman/)

* [Productive Out-of-the-Box with Ember.js (using Yeoman)](
http://www.infoq.com/presentations/emberjs-tools-yeoman)

* [Ember.js Basics - Project Structure](http://www.infragistics.com/community/blogs/brent_schooley/archive/2013/11/19/ember-js-basics-project-structure.aspx)

* [Writing a social bookmarking app with Yeoman and Ember](https://www.openshift.com/blogs/day-24-yeoman-ember-the-missing-tutorial)

* [Creating apps with Angular and Node using Yeoman](http://tylerhenkel.com/creating-apps-with-angular-and-node-using-yeoman/)

* [Building a Chrome Extension with the Yeoman Chrome Extension generator](https://www.openshift.com/blogs/day-29-yeoman-chrome-generator-write-your-first-google-chrome-extension)

* [Web App with the dream team: Angular, Cordova, Yeoman and TopCoat](http://www.numediaweb.com/web-app-with-dream-team/)

* [Building a secret santa app with Yeoman](http://www.christopherlaughlin.co.uk/2013/12/15/secret-santa-any-excuse-to-use-javascript/)

* [Publish packages to npm with Yeoman](
http://h3manth.com/new/blog/2013/publish-packages-to-npm-with-yeoman/)

## Generators

yo [1.0.7-pre](https://npmjs.org/package/yo) is now available for testing on npm and we look forward to talking more about our roadmap for 2014 in the coming weeks. In the mean time, there's lots of **juicy** new updates to both our official generators and those you've been authoring below.

![](/web/updates/images/2013/12/yeoman-digest/KY2KVeX.jpg)

### Official generator updates

* [Backbone](https://github.com/yeoman/generator-backbone/releases/tag/v0.2.2) 0.2.2 released with RequireJS + CoffeeScript support & --appPath option
* [AngularJS](https://github.com/yeoman/generator-angular/releases) 0.7.1 with support for Angular 1.2.6 and grunt-bower-install
* [Ember.js](https://github.com/yeoman/generator-ember/releases/tag/v0.8.0) 0.8.0 released. Scaffolding updated to Ember 1.2 syntax, improved CoffeeScript support, templating, REST routes
* [WebApp](https://github.com/yeoman/generator-webapp/blob/master/changelog.md) 0.4.5 and 0.4.6 including improved HTMLMin, bower install fixes and grunt-bower-install support for CSS dependencies
* [Polymer](https://github.com/yeoman/generator-polymer/releases/tag/0.0.8) generator 0.0.8 with Web Component concatenation and other updates
* [Chrome app](https://github.com/yeoman/generator-chromeapp) 0.2.5 - proper support for livereload, rewritten app generator, build task for packaging, new permissions code and more.

Other official generators including [jQuery](https://github.com/yeoman/generator-jquery), [Gruntfile](https://github.com/yeoman/generator-gruntfile), [CommonJS](https://github.com/yeoman/generator-commonjs), [NodeJS](https://github.com/yeoman/generator-node) and [Mocha](https://github.com/yeoman/generator-mocha) have also been updated.

### Featured Community generators

* [Zurb Foundation](https://github.com/bauschan/generator-zurb-foundation)
* [Gulp plugin](https://github.com/hparra/generator-gulp-plugin)
* [RevealJS](https://github.com/slara/generator-reveal)
* [Browserify projects](https://github.com/vincentmac/generator-browserify/)
* [InuitCSS](https://github.com/tgdev/generator-inuit)
* [Ghost blogs](http://learnjs.io/blog/2013/11/11/yo-ghost/)
* [Ghost themes](https://github.com/diogobeda/generator-ghost-theme)
* [Laravel projects](https://github.com/vijaysai/generator-genlaravel)
* [Three.js](https://github.com/timmywil/generator-threejs)
* [React](https://github.com/petehunt/generator-react-quickstart)
* [Assemble](https://github.com/assemble/generator-assemble)
* [MarionetteJS](https://github.com/mrichard/generator-marionette)
* [MariaJS 2.0](https://github.com/revathskumar/generator-maria/releases/tag/v0.2.0)
* [Simple webapps](http://jorshasaur.us/simple-web-app-generator-for-yeoman/)
* [Drupal themes](https://github.com/pixelmord/generator-drupaltheme)
* [JHipster](http://jhipster.github.io/2013/12/03/jhipster-release-0.2.0.html) Yeoman / Maven / Spring / Angular
* [AWS](https://github.com/pius/generator-aws) Provision AWS backends for webapps
* [Sencha touch apps](https://github.com/kashiro/generator-senchatouch)
* [Yomonger](http://devries.jp/blog/2013/11/22/meet-yomonger/) a generator for Modox themes


## StackOverflow answers

* [How to upgrade an existing project scaffolded with Yeoman](http://stackoverflow.com/questions/18480316/how-to-upgrade-existing-project-scaffolded-with-yeoman)

* [How to log a colored message with Yeoman](http://stackoverflow.com/questions/18354585/how-to-log-a-colored-message-with-yeoman/18369822#18369822)

* [GruntJS vs. Yeoman vs. Guard](http://stackoverflow.com/questions/13299068/gruntjs-vs-yeoman-vs-guard/13685443#13685443)

* [How to set headers in a Yeoman project](http://stackoverflow.com/questions/14617111/yeoman-how-to-set-headers-htaccess/14623169#14623169)

* [Files to commit in a Yeoman project](http://stackoverflow.com/questions/18241893/files-to-commit-to-repository-in-a-yeoman-project/18248303#18248303)

* [How to prevent Bower from bloating my app](http://stackoverflow.com/questions/20683349/how-to-prevent-bower-from-bloating-my-app)

## yo newyear

That's a wrap! If there are Yeoman resources you would like to suggest for the next issue, please feel free to suggest them to [@yeoman](http://twitter.com/yeoman) on Twitter and we’ll be sure to check em’ out. Happy Holidays and have a fantastic new year!

*With special thanks to Stephen Sawchuk, Sindre Sorhus and Pascal Hartig for their review of this issue*



{% include "web/_shared/helpful.html" %}
{% include "web/_shared/rss-widget-updates.html" %}
