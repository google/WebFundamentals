project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2017-06-14T20:47:44Z #}
{# wf_published_on: 2016-01-01 #}


# Introduction to Gulp {: .page-title }




Codelab:  [Gulp Setup](lab-gulp-setup)

<div id="introduction"></div>


## Introduction




Modern web development has many repetitive tasks like running a local server, minifying code, optimizing images, preprocessing CSS and more. This text discusses  [gulp](http://gulpjs.com/), a build tool for automating these tasks.

<div id="what"></div>


## What is gulp?




[Gulp](http://gulpjs.com/) is a cross-platform, streaming task runner that lets developers automate many development tasks. At a high level, gulp reads files as streams and pipes the streams to different tasks. These tasks are code-based and use plugins. The tasks modify the files, building source files into production files. To get an idea of what gulp can do check the  [list of gulp recipes](https://github.com/gulpjs/gulp/blob/master/docs/recipes/README.md) on GitHub.

<div id="how"></div>


## How to set up gulp




Setting up gulp for the first time requires a few steps. 

### Node

Gulp requires  [Node](https://nodejs.org/en/), and its package manager,  [npm](https://www.npmjs.com/), which installs the gulp plugins.

If you don't already have Node and npm installed, you can install them with  [Node Version Manager](https://github.com/creationix/nvm) (nvm). This tool lets developers install multiple versions of Node, and easily switch between them.



Note: If you have issues with a specific version of Node, you can <a href="https://github.com/creationix/nvm#usage">switch to another version</a> with a single command.



Nvm can then be used to install Node by running the following in the command line:

    nvm install node

This also installs Node's package manager,  [npm](https://www.npmjs.com/). You can check that these are both installed by running the following commands from the command line:

    node -v

    npm -v

If both commands return a version number, then the installations were successful. 

### Gulp command line tool

Gulp's command line tool should also be installed globally so that gulp can be executed from the command line. Do this by running the following from the command line:

    npm install --global gulp-cli

### Creating a new project

Before installing gulp plugins, your application needs to be initialized. Do this by running the following command line command from within your project's working directory:

    npm init

This command begins the generation of a __package.json__ file, prompting you with questions about your application. For simplicity these can all be left blank (either by skipping the prompts with the return key or by using `npm init -y` instead of the above command), but in production you could store  [application metadata](https://nodesource.com/blog/the-basics-of-package-json-in-node-js-and-npm/) here. The file looks like this (your values may be different):

#### package.json

```
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Don't worry if you don't understand what all of these values represent, they are not critical to learning gulp. 

This file is used to track your project's packages. Tracking packages like this allows for quick reinstallation of all the packages and their dependencies in future builds (the `npm install` command will read __package.json__ and automatically install everything listed).



Note: It is a best practice not to push packages to version control systems. It's better to use `npm install` and `package.json` to install project packages locally. 



### Installing packages

Gulp and Node rely on plugins (packages) for the majority of their functionality. Node plugins can be installed with the following command line command:

    npm install pluginName --save-dev

This command uses the npm tool to install the `pluginName` plugin. Plugins and their dependencies are installed in a __node_modules__ directory inside the project's working directory.

The `--save-dev` flag updates __package.json__ with the new package. 

The first plugin that you want to install is gulp itself. Do this by running the following command from the command line from within your project's working directory:

    npm install gulp --save-dev

Gulp and its dependencies are then present in the the __node_modules__ directory (inside the project directory). The __package.json__ file is also updated to the following (your values may vary):

#### package.json

```
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "gulp": "^3.9.1"
  }
}
```

Note that there is now a `devDependencies` field with gulp and its current version listed.

#### Gulpfile

Once packages are installed (in __node_modules__), you are ready to use them. All gulp code is written in a __gulpfile.js__ file. To use a package, start by including it in __gulpfile.js__. The following code in your gulpfile includes the gulp package that was installed in the previous section:

#### gulpfile.js

```
var gulp = require('gulp');
```

<div id="tasks"></div>


## Creating tasks




Gulp tasks are defined in the __gulpfile.js__ file using  [`gulp.task`](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulptaskname--deps--fn). A simple task looks like this: 

#### gulpfile.js

```
gulp.task('hello', function() {
  console.log('Hello, World!');
});
```

This code defines a `hello` task that can be executed by running the following from the command line:

    gulp hello

A common pattern for gulp tasks is the following:

1. Read some source files using  [`gulp.src`](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrcglobs-options)
2. Process these files with one or more functions using Node's `pipe` functionality
3. Write the modified files to a destination directory (creating the directory if doesn't exist) with  [`gulp.dest`](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpdestpath-options)

        gulp.task('task-name', function() {
          gulp.src('source-files') // 1
          .pipe(gulpPluginFunction()) // 2
          .pipe(gulp.dest('destination')); // 3
        });
        


A complete gulpfile might look like this:

#### gulpfile.js

```
// Include plugins
var gulp = require('gulp'); // Required
var pluginA = require('pluginA');
var pluginB = require('pluginB');
var pluginC = require('pluginC');

// Define tasks
gulp.task('task-A', function() {
  gulp.src('some-source-files')
  .pipe(pluginA())
  .pipe(gulp.dest('some-destination'));
});

gulp.task('task-BC', function() {
  gulp.src('other-source-files')
  .pipe(pluginB())
  .pipe(pluginC())
  .pipe(gulp.dest('some-other-destination'));
});
```

Where each installed plugin is included with `require()` and tasks are then defined using functions from the installed plugins. Note that functionality from multiple plugins can exist in a single task.

<div id="examples"></div>


## Examples




Let's look at some examples. 

#### Uglify JavaScript

Uglifying (or minifying) JavaScript is a common developer chore. The following steps set up a gulp task to do this for you (assuming Node, npm, and the gulp command line tool are installed):

1. Create a new project & __package.json__ by running the following in the command line (from the project's working directory):

        npm init
        


2. Install the gulp package by running the following in the command line:

        npm install gulp --save-dev
        


3. Install the  [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) package by running the following in the command line:

        npm install gulp-uglify --save-dev
        


4. Create a __gulpfile.js__ and add the following code to include gulp and gulp-uglify:

        var gulp = require('gulp');
        var uglify = require('gulp-uglify');
        


5. Define the `uglify` task by adding the following code to __gulpfile.js__:

        gulp.task('uglify', function() {
          gulp.src('js/**/*.js')
          .pipe(uglify())
          .pipe(gulp.dest('build'));
        });
        


6. Run the task from the command line with the following:

        gulp uglify
        


The task reads all JavaScript files in the __js__ directory (relative to the __gulpfile.js__ file), executes the `uglify` function on them (uglifying/minifying the code), and then puts them in a __build__ directory (creating it if it doesn't exist).

#### Prefix CSS & build sourcemaps

Multiple plugins can be used in a single task. The following steps set up a gulp task to prefix CSS files and create  [sourcemaps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) for them (assuming Node, npm, and the gulp command line tool are installed):

1. As in the previous example, create a new project and install gulp,  [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer), and  [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) by running the following in the command line (from the project's working directory):

        npm init
        npm install gulp --save-dev
        npm install gulp-autoprefixer --save-dev
        npm install gulp-sourcemaps --save-dev
        


2. Include the installed plugins by adding the following code to a __gulpfile.js__ file:

        var gulp = require('gulp');
        var autoprefixer = require('gulp-autoprefixer');
        var sourcemaps = require('gulp-sourcemaps');
        


3. Create a task that prefixes CSS files, creates sourcemaps on the files, and writes the new files to the __build__ directory by adding the following code to __gulpfile.js__:

        gulp.task('processCSS', function() {
          gulp.src('styles/**/*.css')
          .pipe(sourcemaps.init())
          .pipe(autoprefixer())
          .pipe(sourcemaps.write())
          .pipe(gulp.dest('build'));
        });
        


This task uses two plugins in the same task.

<div id="automation"></div>


## More automation




### Default tasks

Usually, developers want to run multiple tasks each time an application is updated rather than running each task individually. Default tasks are helpful for this, executing anytime the `gulp` command is run from the command line. 

Let's add the following code to __gulpfile.js__ to set `task1` and `task2` as default tasks:

#### gulpfile.js

```
gulp.task('default', ['task1', 'task2']);
```

Running `gulp` in the command line executes both `task1` and `task2`.

### Gulp.watch

Even with default tasks, running tasks each time a file is updated during development can become tedious.  [`gulp.watch`](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglob--opts-tasks-or-gulpwatchglob--opts-cb) watches files and automatically runs tasks when the corresponding files change. For example, the following code in __gulpfile.js__ watches CSS files and executes the `processCSS` task any time the files are updated:

#### gulpfile.js

```
gulp.task('watch', function() {
  gulp.watch('styles/**/*.css', ['processCSS']);
});
```

Running the following in the command line starts the watch:

    gulp watch



Note: The watch task continues to execute once initiated. To stop the task, use <strong>Ctrl + C</strong> in the command line or close the command line window.



<div id="review"></div>


## Review




Using a build tool for the first time can be daunting with multiple tools to install and new files to create. Let's review what we've covered and how it all fits together.

Because gulp and its plugins are node packages, gulp requires  [Node](https://nodejs.org/en/) and its package manager,  [npm](https://www.npmjs.com/). They are global tools so you only need to install them once on your machine, not each time you create a project. In this text, we used  [Node Version Manager](https://github.com/creationix/nvm) (nvm) to install Node and npm, but they could also have been installed directly. 

Gulp runs from the command line, so it requires a command line tool to be installed. Like Node, it's a global tool, and only needs to be installed on your machine (not per project). 

When you want to use gulp in a project, you start by initializing the project with `npm init`. This creates a file called __package.json__. The __package.json__ file tracks the Node packages that are installed for that project. Each time a new package is installed, such as the gulp-uglify plugin, __package.json__ is updated with the `--save-dev` flag. If the project is stored in version control or transferred without including all of the packages (a best practice), the packages can be quickly re-installed with `npm install`. This reads __package.json__ and installs all required packages. 

Once plugins are installed, they need to be included in the __gulpfile.js__ file. This file is where all gulp code belongs. This file is also where gulp tasks are defined. Gulp tasks use JavaScript code and the imported functions from plugins to perform various tasks on files. 

With everything installed and tasks defined, gulp tasks can be run by executing command line commands (such as `gulp uglify`).

<div id="resources"></div>


## Further reading




*  [Gulp's Getting Started guide](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
*  [List of gulp Recipes](https://github.com/gulpjs/gulp/blob/master/docs/recipes/README.md)
*  [Gulp Plugin Registry](http://gulpjs.com/plugins/)


