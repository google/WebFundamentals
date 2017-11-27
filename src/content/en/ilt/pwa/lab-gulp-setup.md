project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2017-07-24 #}
{# wf_published_on: 2016-01-01 #}


# Lab: Gulp Setup {: .page-title }




Concepts:  [Introduction to Gulp](introduction-to-gulp)

<div id="overview"></div>


## Overview




This lab shows you how you can automate tasks with  [gulp](https://github.com/gulpjs/gulp/tree/master/docs), a build tool and task runner.

#### What you will learn

* How to set up gulp
* How to create tasks using gulp plugins
* Ways to automate your development

#### What you should know

* Basic JavaScript, HTML, and CSS
* Some experience using a command line interface

#### What you will need

* Computer with terminal/shell access
* Connection to the internet 
* A text editor
*  [Node](https://nodejs.org/en/) and  [npm](https://www.npmjs.com/)

<div id="1"></div>


## 1. Get set up




If you have not downloaded the repository, installed Node, and started a local server, follow the instructions in [Setting up the labs](setting-up-the-labs).



Note: <a href="tools-for-pwa-developers#unregister">Unregister</a> any service workers and <a href="tools-for-pwa-developers#clearcache">clear all service worker caches</a> for localhost so that they do not interfere with the lab.



If you have a text editor that lets you open a project, open the __gulp-lab/app__ folder. This will make it easier to stay organized. Otherwise, open the folder in your computer's file system. The __app__ folder is where you will be building the lab. 

This folder contains:

* __js/main.js__ and __styles/main.css__ are sample resources that we use to experiment
* __index.html__ is the main HTML page for the sample site/application
* __gulpfile.js__ is the file that gulp uses to execute tasks, and where you will write your code

<div id="2"></div>


## 2. Install global tools




[Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) is available as a Node package. In this section we install the gulp command line tool on your system. 

To install the gulp command line tool, run the following in the command line:

    npm install --global gulp-cli

#### Explanation

This command installs the gulp command line tool (globally) using npm. We use the command line tool to actually execute gulp. 

<div id="3"></div>


## 3. Prepare the project




All projects that use gulp need to have the gulp package installed locally.

From __app/__ (the project root), run the following in the command line:

    npm init -y

Note that a __package.json__ file was created. Open the file and inspect it.

From the same directory, run the following in the command line:

    npm install gulp --save-dev

Note that a __node_modules__ directory has been added to the project with various packages. Also note that __package.json__ now lists "gulp" as a dependency. 



Note: Some text editors hide files and directories that are listed in the <strong>.gitignore</strong> file. Both <strong>node_modules</strong> and <strong>build</strong> are in our <strong>.gitignore</strong>. If you have trouble viewing these during the lab, just delete the <strong>.gitignore</strong> file.



In <strong>gulpfile.js</strong>, replace the TODO 3 comment with the following:

#### gulpfile.js

```
var gulp = require('gulp');
```

#### Explanation 

We start by generating __package.json__ with `npm init` (the `-y` flag uses default configuration values for simplicity). This file is used to keep track of the packages that your project uses, including gulp and its dependencies.

The next command installs the gulp package and its dependencies in the project. These are put in a __node_modules__ folder. The `--save-dev` flag adds the corresponding package (in this case gulp) to __package.json__. Tracking packages like this allows quick re-installation of all the packages and their dependencies on future builds (the `npm install` command will read __package.json__ and automatically install everything listed).

Finally we add code to __gulpfile.js__ to include the gulp package. The __gulpfile.js__ file is where all of the gulp code should go.

<div id="4"></div>


## 4. Minify JavaScript




This exercise implements a simple task to minify (also called "uglify" for JavaScript) the __app/js/main.js__ JavaScript file.  

From __app/__, run the following in the command line:

    npm install gulp-uglify --save-dev

Now replace TODO 4.1 in <strong>gulpfile.js</strong> with the following code:

#### gulpfile.js

```
var uglify = require('gulp-uglify');
```

Replace TODO 4.2 with the following code:

#### gulpfile.js

```
gulp.task('minify', function() {
  gulp.src('js/main.js')
  .pipe(uglify())
  .pipe(gulp.dest('build'));
});
```

Save the file. From __app/__, run the following in the command line:

    gulp minify

Open __app/js/main.js__ and __app/build/main.js__. Note that the JavaScript from __app/js/main.js__ has been minified into __app/build/main.js__.

#### Explanation

We start by installing the __gulp-uglify__ package (this also updates the __package.json__ dependencies). This enables minification functionality in our gulp process. 

Then we include this package in the __gulpfile.js__ file, and add code to create a `minify` task. This task gets the __app/js/main.js__ file, and pipes it to the `uglify` function (which is defined in the __gulp-uglify__ package). The `uglify` function minifies the file, pipes it to the `gulp.dest` function, and creates a __build__ folder containing the minified JavaScript.

<div id="5"></div>


## 5. Prefix CSS




In this exercise, you add vendor prefixes to the __main.css__ file.  

Read the documentation for  [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer). Using section 4 of this lab as an example, complete the following tasks:

1. Install the gulp-autoprefixer package
2. Require the package in __gulpfile.js__
3. Write a task in __gulpfile.js__ called `processCSS`, that adds vendor prefixes to the __app/styles/main.css__ and puts the new file in __app/build/main.css__

Test this task by running the following (from __app/__) in the command line:

    gulp processCSS

Open __app/styles/main.css__ and __app/build/main.css__. Does the `box-container` class have vendor prefixes for the `display: flex` property?

__Optional__: Read the  [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) documentation and incorporate  [sourcemap](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) generation in the `processCSS` task (not in a new task). 



__Hint:__ The <a href="https://www.npmjs.com/package/gulp-autoprefixer">gulp-autoprefixer</a> documentation has a useful example. Test by rerunning the <code>processCSS</code> task, and noting the sourcemap comment in the <strong>app/build/main.css</strong> file.



<div id="6"></div>


## 6. Automate development tasks




### 6.1 Define default tasks

Usually we want to run multiple tasks each time we rebuild an application. Rather than running each task individually, they can be set as default tasks. 

Replace TODO 6.1 in <strong>gulpfile.js</strong> with the following:

#### gulpfile.js

```
gulp.task('default', ['minify', 'processCSS']);
```

Now delete the __app/build__ folder and run the following in the command line (from __app/__):

    gulp

Note that both the `minify` and `processCSS` tasks were run with that single command (check that the __app/build__ directory has been created and that __app/build/main.js__ and __app/build/main.css__ are there).

#### Explanation

Default tasks are run anytime the `gulp` command is executed. 

### 6.2 Set up gulp watch

Even with default tasks, it can become tedious to run tasks each time a file is updated during development.  [gulp.watch](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglob--opts-tasks-or-gulpwatchglob--opts-cb) watches files and automatically runs tasks when the corresponding files change.

Replace TODO 6.2 in <strong>gulpfile.js</strong> with the following:

#### gulpfile.js

```
gulp.task('watch', function() {
  gulp.watch('styles/*.css', ['processCSS']);
});
```

Save the file. From __app/__, run the following in the command line:

    gulp watch

Add a comment to __app/styles/main.css__ and save the file. Open __app/build/main.css__ and note the real-time changes in the corresponding build file.

TODO: Now update the <code>watch</code> task in <strong>gulpfile.js</strong> to watch <strong>app/js/main.js</strong> and run the <code>minify</code> task anytime the file changes. Test by editing the value of the variable <code>future</code> in <strong>app/js/main.js</strong> and noting the real-time change in <strong>app/build/main.js</strong>. Don't forget to save the file and rerun the <code>watch</code> task. 



Note: The watch task continues to execute once initiated. You need to restart the task in the command line whenever you make changes to the task. If there is an error in a file being watched, the watch task terminates, and must be restarted. To stop the task, use <strong>Ctrl+c</strong> in the command line or close the command line window.



#### Explanation

We created a task called `watch` that watches all CSS files in the __styles__ directory, and all the JS files in the __js__ directory. Any time any of these files changes (and is saved), the corresponding task (`processCSS` or `minify)` executes.

### 6.3 Set up BrowserSync

You can also automate the setup of a local testing server.

From __app/__, run the following in the command line:

    npm install browser-sync --save-dev

Replace TODO 6.3a in <strong>gulpfile.js</strong> with the following:

#### gulpfile.js

```
var browserSync = require('browser-sync');
```

Now replace TODO 6.3b in <strong>gulpfile.js</strong> with the following: 

#### gulpfile.js

```
gulp.task('serve', function() {
  browserSync.init({
    server: '.',
    port: 3000
  });
});
```

Save the file. Now run the following in the command line (from __app/__):

    gulp serve

Your browser should open __app/__ at __localhost:3000__ (if it doesn't, open the browser and navigate there).

#### Explanation

The gulp  [browsersync](https://www.browsersync.io/docs/gulp) package starts a local server at the specified directory. In this case we are specifying the target directory as '__.__', which is the current working directory (__app/__). We also specify the port as 3000.

### 6.4 Put it all together

Let's combine everything learned so far.

TODO: Change the default tasks from <code>minify</code> and <code>processCSS</code> to <code>serve</code>.

TODO: Update the <code>serve</code> task to the following code:

```
gulp.task('serve', ['processCSS'], function() {
  browserSync.init({
    server: '.',
    port: 3000
  });
  gulp.watch('styles/*.css', ['processCSS']).on('change', browserSync.reload);
  gulp.watch('*.html').on('change', browserSync.reload);
});
```

Close the app from the browser and delete __app/build/main.css__. From __app/__, run the following in the command line: 

    gulp

Your browser should open __app/__ at __localhost:3000__ (if it doesn't, open the browser and navigate there). Check that the __app/build/main.css__ has been created. Change the color of the blocks in __app/styles/main.css__ and check that the blocks change color in the page.

#### Explanation

In this example we changed the default task to `serve` so that it runs when we execute the `gulp` command. The `serve` task has `processCSS` as a  *dependent task* . This means that the `serve` task will execute the `processCSS` task before executing itself. Additionally, this task sets a watch on CSS and HTML files. When CSS files are updated, the `processCSS` task is run again and the server reloads. Likewise, when HTML files are updated (like __index.html__), the browser page reloads automatically. 

__Optional__: In the `serve` task, add `minify` as a dependent task. Also in `serve`, add a watcher for __app/js/main.js__ that executes the `minify` task and reloads the page whenever the __app/js/main.js__ file changes. Test by deleting __app/build/main.js__ and re-executing the `gulp` command. Now __app/js/main.js__ should be minified into __app/build/main.js__ and it should update in real time. Confirm this by changing the console log message in __app/js/main.js__ and saving the file - the console should log your new message in the app.

<div id="7"></div>


## Congratulations!




You have learned how to set up gulp, create tasks using plugins, and automate your development!

### Resources

*  [Gulp's Getting Started guide](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
*  [List of gulp Recipes](https://github.com/gulpjs/gulp/blob/master/docs/recipes/README.md)
*  [Gulp Plugin Registry](http://gulpjs.com/plugins/)


