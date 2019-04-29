project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_blink_components: N/A #}
{# wf_updated_on: 2019-04-26 #}
{# wf_published_on: 2016-01-01 #}


# Lab: Gulp Setup {: .page-title }
{% include "web/ilt/pwa/_shared/update.html" %}




<div id="overview"></div>


## Overview




This lab shows you how you can automate tasks with  [gulp](https://gulpjs.com/), a build tool and task runner.

#### What you will learn

* How to set up gulp
* How to create tasks using gulp plugins
* Ways to automate your development

#### What you should know

* Basic JavaScript, HTML, and CSS
* Some experience using a command line interface
* Some experience with  [Node.js](https://nodejs.org/en/) and  [npm](https://www.npmjs.com/) is recommended

#### What you will need

* Computer with terminal/shell access
* Connection to the internet
* A text editor
*  [Node.js](https://nodejs.org/en/) and  [npm](https://www.npmjs.com/)

<div id="1"></div>


## 1. Get set up




If you have not downloaded the repository and installed the  [LTS version of Node.js](https://nodejs.org/en/), follow the instructions in [Setting up the labs](setting-up-the-labs).

Open the `gulp-lab/project/` folder in your preferred text editor. The `project/` folder is where you will be building the lab.

This folder contains:

* `app/images/` contains sample images
* `app/scripts/main.js` is the app's main JavaScript
* `app/styles/main.css` is the app's main stylesheet
* `index.html` is the home (and only) page for the app
* `gulpfile.js` is an empty gulp configuration file, and where you will write most of your code

<div id="2"></div>


## 2. Install dependencies




[Gulp](https://gulpjs.com/) and its plugins are available as  [Node.js](https://nodejs.org/en/) packages.

In order to use gulp directly from the command line, the gulp command line interface needs to be installed globally. Run the following command to globally install the gulp command line interface:

    npm install gulp-cli --global

Next run the following command from the `project/` directory to create a new `package.json` file, which Node.js uses to track local project dependencies (the `-y` flag accepts the default configuration):

    npm init -y

Note that a `package.json` file was created. Open the file and inspect it.

From the same directory, run the following command to install the first local package, gulp:

    npm install --save-dev gulp@4.0.0

Observe gulp and its dependencies have been installed in a `node_modules/` directory, and that the `package.json` now lists "gulp" as a "devDependency". You should also see that a `package-lock.json` file was created.

Note: Some text editors hide files and directories that are listed in the `.gitignore` file. Both `node_modules/` and `build/` are in the PWA ILT repository `.gitignore`. If you have trouble viewing these during the lab, just delete the `.gitignore` file.

#### Explanation

Both `package.json` and `package-lock.json` allow Node.js to track the dependencies that a project uses, so that we (or other developers) can easily reinstall or update project dependencies.

With  [npm](https://docs.npmjs.com/getting-started/what-is-npm), packages like gulp can be installed locally for our project, in a `node_modules/` folder. The `--save-dev` flag adds the corresponding package (in this case gulp) to `package.json`, and the `@` specifies which version of the package we want to install.

#### For more information

[Package management with npm](https://docs.npmjs.com/getting-started/what-is-npm)

<div id="3"></div>


## 3. Write your first gulp task




Gulp is configured using a `gulpfile.js/` file. In this file, gulp "tasks" are defined using regular JavaScript.

In the empty `project/gulpfile.js` file, add the following code to import the `gulp` package from the `node_modules/` directory.

```
const gulp = require('gulp');
```

Next, add the following function to the same file in order to define a `copy` function:

```
function copy() {
  return gulp.src([
    'app/*.html',
    'app/**/*.jpg',
    'app/**/*.css',
    'app/**/*.js'
  ])
  .pipe(gulp.dest('build'));
}
```

Then add the following line to define a `copy` task:

```
gulp.task('copy', copy);
```

From the command line (at the `project/` directory), use the following command to run the `copy` task:

    gulp copy

Note: If you get a `TypeError: Cannot read property 'apply' of undefined` in the command line, run the following command to uninstall the previous version of gulp on your machine: `npm uninstall -g gulp`. Then reinstall the latest version of the gulp-cli with the following command: `npm install gulp-cli --global`. You may be prompted to remove a file and retry the command. You should be able to run `gulp copy` after the `gulp-cli` has finished reinstalling.

Observe that the files in `app/` have been copied to a `build/` directory.

#### Explanation

Gulp tasks can be defined by functions, and are exposed to gulp with the `gulp.task` method. Once configured, these tasks can be run from the command line using the corresponding task name.

In this example, the `src/` files of our app are being "piped" to a `dest/` folder (`build/`). This example is contrived, but is typical of the general flow of gulp tasks. In general gulp is used to read some source files, process them, and output the processed files to a new destination. Examples of actual processing methods are demonstrated in later steps.

<div id="4"></div>


## 4. Create a dev server




Let's use gulp to serve our app during development, so that we can more easily test our changes.

Run the following to install the  [browser-sync](https://browsersync.io/docs/gulp) package, which provides a local server with live reloading:

    npm install browser-sync --save-dev

Then require the new package in `gulpfile.js` with the following code:

```
const browserSync = require('browser-sync');
```

Add the following `serve` function below the existing code:

```
function serve() {
  return browserSync.init({
    server: 'build',
    open: false,
    port: 3000
  });
}
```

Next, define the `buildAndServe` task, with slightly different syntax than we saw before:

```
gulp.task('buildAndServe', gulp.series(copy, serve));
```

Finally, run `gulp buildAndServe` from the command line. Observe the command line logs and open `localhost:3000/` in your browser to see the app.

Note: [Unregister](tools-for-pwa-developers#unregister) any service workers and [clear all service worker caches](tools-for-pwa-developers#clearcache) for localhost so that they do not interfere with the lab. In Chrome DevTools, you can achieve this by clicking __Clear site data__ from the __Clear storage__ section of the __Application__ tab.

#### Explanation

Similarly to the previous `copy` task, configuring the `buildAndServe` task consisted of installing a package, requiring that package in `gulpfile.js`, and then writing a function to use the package. However, unlike with the `copy` task, we specified a `series` of functions to run for the `buildAndServe` task. Using `gulp.series()` allows us to run tasks sequentially. In this case, the `buildAndServe` task actually runs the `copy` function, followed by `serve` function, effectively "building" and then serving our app.

<div id="5"></div>


## 5. Process JavaScript




Let's take a closer look at processing files with plugins

### 5.1 Compile with babel

Run the following to install the  [gulp-babel](https://www.npmjs.com/package/gulp-babel) package, which uses  [babel](https://babeljs.io/) to compile browser-compatible JavaScript:

    npm install --save-dev gulp-babel babel-core babel-preset-env

Note: If the `browserSync` server is blocking your command line, terminate the process with `Ctrl+c`. Going forward, do the same for any gulp process that blocks the command line when you need it.

Then require the new package in `gulpfile.js` with the following code:

```
const babel = require('gulp-babel');
```

Add the following `processJs` function and expose it to gulp with the `gulp.task` method:

```
function processJs() {
  return gulp.src('app/scripts/*.js')
  .pipe(babel({
      presets: ['env']
  }))
  .pipe(gulp.dest('build/scripts'));
}

gulp.task('processJs', processJs);
```

Next, remove the JavaScript files from the `copy` function, since we are processing them separately in `processJs`. The updated `copy` function should look like:

```
function copy() {
  return gulp.src([
    'app/*.html',
    'app/**/*.jpg',
    'app/**/*.css',
    // 'app/**/*.js' // processed by processJs
  ])
  .pipe(gulp.dest('build'));
}
```

Finally, run `gulp processJs` from the command line. Compare `app/scripts/main.js` and `build/scripts/main.js` and observe that the arrow function has been compiled to the more broadly supported function syntax.

#### Explanation

Similarly to the `copy` task, the `processJs` task reads some `src` files (only `app/scripts/main.js` in our simple app). In this case however, the files are piped through the `babel` function (defined in the required `babel` package). This babel function compiles the source JavaScript in our app, and then pipes the output to a `dest` (`build/scripts/main.js`).

The babel function also accepts some configuration option (`presets`), which is common for gulp modules.

### 5.2 Uglify and rename

A single gulp task is not limited to using one package. Let's extend the `processJs` task to uglify (minify) and rename the apps JavaScript files.

Run the following to install the  [gulp-uglify](https://www.npmjs.com/package/gulp-uglify-es) and  [gulp-rename](https://www.npmjs.com/package/gulp-rename) packages:

    npm install --save-dev gulp-uglify gulp-rename

Then require the new packages in `gulpfile.js` with the following code:

```
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
```

Update the `processJs` function to the following:

```
function processJs() {
  return gulp.src('app/scripts/*.js')
  .pipe(babel({
      presets: ['env']
  }))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('build/scripts'));
}
```

Now run `gulp processJs` from the command line. Observe that `build/scripts/main.js` is now being uglified (minified) and renamed to `build/scripts/main.min.js` (you can delete the old `build/scripts/main.js` file).

#### Explanation

Rather than piping the output of the `babel` function directly to `dest`, `processJs` now pipes the output to another function, `uglify`. That function pipes its own output to yet another function, `rename`. The output of `rename` is what is finally written to `dest`.

### 5.3 Watch files

Gulp supports a powerful "watch" functionality, which configures tasks to be automatically run when specified files change.

Add the following `watch` function and corresponding task:

```
function watch() {
  gulp.watch('app/scripts/*.js', processJs);
}

gulp.task('watch', watch);
```

Now run `gulp watch` from the command line. Comment out all the code in `app/scripts/main.js` and save the file. Observe that `build/scripts/main.min.js` is automatically updated by the `processJs` task.

#### Explanation

Here the  [`watch` method](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglobs-opts-fn) is used to "watch" all the `.js` files in the `app/scripts/` directory (in this case, `main.js`) and run the `processJs` task anytime there are changes. This automation enables us to see changes during development without the need to re-run tasks in the command line.

Similarly to `gulp.src`, `gulp.dest`, and `gulp.task`, the `gulp.watch` method is defined in the gulp package itself, so it doesn't require importing a new package.

<div id="6"></div>


## 6. Optional: Process CSS




The remaining exercises are unguided challenges. Try to complete them on your own. You can view the `solution/` directory if you get stuck.

Define and expose a `processCss` task, similar to the `processJs` task. This task should:

* read the source CSS files from `app/styles/`
* process the files with the  [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) module
* rename the files with a ".min" extension
* write the processed and renamed files to `build/styles/`

Tips

* remember to require the  [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) at the top of `gulpfile.js`
* remember to comment out the CSS pattern in the `copy` function
* you can delete the old `build/styles/main.css` to avoid confusion with the new `build/styles/main.min.css`

<div id="7"></div>


## 7. Optional: Use everything together




Complete the following challenges to combine everything learned so far:

1. Update the `copy` task, so that the JavaScript and CSS files are not copied. (These files are processed by `processJs` and `processCss`, respectively.)
2. Update the `watch` task to run `processCss` whenever the CSS files in `app/styles/` change.
3. Update the `buildAndServe` task to run `copy`, `processJs`, and `processCss` before it `serve`s.
4. In addition, update `buildAndServe` to call both the `serve` and `watch` functions in  [`parallel`](https://github.com/gulpjs/gulp/blob/4.0/docs/API.md#gulpparalleltasks), rather than only calling the `serve` function. If configured correctly, the `gulp` `buildAndServe` command should run `copy`, `processJs`, and `processCss`, and then call both the `serve` and `watch` functions together.
5. Update `app/index.html` to reference `scripts/main.min.js` and `styles/main.min.css` instead of `scripts/main.js` and `styles/main.css` respectively.

Then run `gulp buildAndServe`. If all the challenges are completed successfully, all files in `app/` should be processed into `build/`, the built app should be served at `localhost:3000/`, and appropriate files should be re-processed automatically whenever changes are made.

<div id="congrats"></div>


## Congratulations!




You have learned how to set up gulp, create tasks using plugins, and automate your development!

### Resources

*  [Gulp's Getting Started guide](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
*  [List of gulp Recipes](https://github.com/gulpjs/gulp/blob/master/docs/recipes/README.md)
*  [Gulp Plugin Registry](http://gulpjs.com/plugins/)


