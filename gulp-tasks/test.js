/**
 * @fileoverview Gulp Task for testing/validating source files.
 *
 * @author Pete LePage <petele@google.com>
 */

'use strict';

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const chalk = require('chalk');
const glob = require('globule');
const jsYaml = require('js-yaml');
const gutil = require('gulp-util');
const GitHubApi = require('github');
const wfRegEx = require('./wfRegEx');
const wfHelper = require('./wfHelper');


const testBook = require('./tests/bookYaml');
const testProject = require('./tests/projectYaml');
const testRedirects = require('./tests/redirectsYaml');
const testGlossary = require('./tests/glossaryYaml');
const testContributors = require('./tests/contributorsYaml');
const testCommonTags = require('./tests/commonTagsJson');
const lintJavaScript = require('./tests/lintJavaScript');
const validateYaml = require('./tests/validateYaml');
const validateJson = require('./tests/validateJson');
const validateJavaScript = require('./tests/validateJavaScript');
const validateHtml = require('./tests/validateHtml');
const validateMedia = require('./tests/validateMedia');
const validateGeneric = require('./tests/validateGeneric');
const validateFilename = require('./tests/validateFilename');
const validateMarkdown = require('./tests/validateMarkdown');
const validatePermissions = require('./tests/validatePermissions');
const validateCommonTyposFile = require('./tests/validateCommonTyposFile');

/** ***************************************************************************
 * Constants & Remark Lint Options
 *****************************************************************************/

// const MAX_DESCRIPTION_LENGTH = 485;
const MAX_FILES_CHANGED_WARNING = 500; // Max # of files changed before warning
const MAX_FILES_CHANGED_ERROR = 1000; // Max # of files changed before error
const MD_FILES = ['.md', '.mdown', '.markdown'];
const EXTENSIONS_TO_SKIP = ['.css', '.vtt', '.xml', '.txt'];
const MEDIA_FILES = [
  '.gif', '.ico', '.jpg', '.png', '.psd', '.svg', '.webp', '.avif',
  '.mov', '.mp3', '.mp4', '.webm',
  '.pdf',
];

const RE_BOM = /^\uFEFF/;
const RE_SRC_BASE = /src\/content\//;
const RE_DATA_BASE = /src\/data\//;
const RE_GULP_BASE = /^gulp-tasks\/?/;
const ESLINT_RC_FILE = '.eslintrc';
const COMMON_TAGS_FILE = 'src/data/commonTags.json';
const COMMON_TYPOS_FILE = 'src/data/common-typos.yaml';
const CONTRIBUTORS_FILE = 'src/data/_contributors.yaml';
const BLINK_COMPONENTS_FILE = 'src/data/blinkComponents.json';
const IS_TRAVIS = process.env.TRAVIS === 'true';
const IS_TRAVIS_PUSH = process.env.TRAVIS_EVENT_TYPE === 'push';
const IS_TRAVIS_ON_MAIN = process.env.TRAVIS_BRANCH === 'main';

let esLintConfig;

/** ***************************************************************************
 * Results
 *****************************************************************************/

let filesTested = 0;
let allErrors = [];
let allWarnings = [];
let filesWithIssues = {};

/** ***************************************************************************
 * Logging Functions
 *****************************************************************************/

/**
 * Logs a message to the console
 *
 * @param {string} level ERROR or WARNING, the level of the error
 * @param {string} filename The file the issue occurred in
 * @param {Object} position The line/column the error occurred on
 * @param {string} message The message to be displayed
 * @param {Object} extra Any extra information to show
 */
function logMessage(level, filename, position, message, extra) {
  let logMsg = {
    filename: filename,
    position: position,
    message: message,
    extra: extra,
  };
  let fileLoc = chalk.cyan(filename);
  level = level.toUpperCase();
  if (position && position.line) {
    fileLoc += chalk.gray('#') + chalk.cyan(position.line);
  }
  if (level === 'ERROR') {
    gutil.log(chalk.red('ERROR:'), fileLoc, message);
    allErrors.push(logMsg);
  } else {
    gutil.log(chalk.yellow('WARNING:'), fileLoc, message);
    allWarnings.push(logMsg);
  }
  if (global.WF.options.verbose && extra) {
    // eslint-disable-next-line no-console
    console.log(extra);
  }
  filesWithIssues[filename] = true;
}

/**
 * Logs an ERROR message to the console
 *
 * @param {string} filename The file the issue occurred in
 * @param {Object} position The line/column the error occurred on
 * @param {string} message The message to be displayed
 * @param {Object} extra Any extra information to show
 */
function logError(filename, position, message, extra) {
  if (global.WF.options.testWarnOnly) {
    logWarning(filename, position, message, extra);
    return;
  }
  logMessage('ERROR', filename, position, message, extra);
}

/**
 * Logs a WARNING message to the console
 *
 * @param {string} filename The file the issue occurred in
 * @param {Object} position The line/column the error occurred on
 * @param {string} message The message to be displayed
 * @param {Object} extra Any extra information to show
 */
function logWarning(filename, position, message, extra) {
  logMessage('WARNING', filename, position, message, extra);
}

/**
 * Prints a summary of the test results
 */
function printSummary() {
  const cFilesWithIssues = Object.keys(filesWithIssues).length;
  gutil.log('');
  gutil.log('Test Completed.');
  gutil.log('Files tested:  ', chalk.cyan(filesTested));
  gutil.log(' - with issues:', chalk.yellow(cFilesWithIssues));
  gutil.log('Errors  : ', chalk.red(allErrors.length));
  gutil.log('Warnings: ', chalk.yellow(allWarnings.length));
  if (IS_TRAVIS) {
    let result = {
      summary: {
        filesTested: filesTested,
        filesWithIssues: cFilesWithIssues,
      },
      errors: allErrors,
      warnings: allWarnings,
    };
    result = JSON.stringify(result, null, 2);
    fs.writeFileSync('./test-results.json', result, 'utf8');
  }
}

/**
 * Throws an exception if there are any test failures.
 */
function throwIfFailed() {
  if (allErrors.length >= 1 && !global.WF.options.testWarnOnly) {
    let errorMessage = `There were ${allErrors.length} errors.`;
    throw new Error(errorMessage);
  }
}

/** ***************************************************************************
 * Helper Functions
 *****************************************************************************/

/**
 * Reads a file from the file system.
 *
 * @param {string} filename The file to read.
 * @return {string} The contents of the file, or NULL if it failed to read.
 */
function readFile(filename) {
  try {
    let contents = fs.readFileSync(filename, 'utf8');
    // Check if Byte order mark was included
    if (RE_BOM.test(contents)) {
      contents = contents.replace(RE_BOM, '');
      const msg = 'File was saved as UTF-8+BOM, please save without BOM';
      logWarning(filename, null, msg);
    }
    return contents;
  } catch (ex) {
    logWarning(filename, null, 'Unable to read file, was it deleted?', ex);
    return null;
  }
}

/**
 * Parses a JSON file
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested
 * @param {string} contents The contents of the file to be tested
 * @return {Object} The parsed JSON object
 */
function parseJSON(filename, contents) {
  try {
    return JSON.parse(contents);
  } catch (ex) {
    const msg = `Unable to parse JSON: ${ex.message}`;
    logError(filename, null, msg, ex);
  }
  return null;
}

/**
 * Parses a YAML file
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested
 * @param {string} contents The contents of the file to be tested
 * @return {Object} The parsed YAML object
 */
function parseYAML(filename, contents) {
  try {
    return jsYaml.safeLoad(contents);
  } catch (ex) {
    let msg = 'Unable to parse YAML';
    if (ex.reason) {
      msg = ex.reason;
    }
    let position = ex.mark;
    if (position && position.line) {
      position.line++;
    }
    logError(filename, position, msg, ex);
  }
  return null;
}

/**
 * Gets a list of all files to be tested.
 *
 * @return {Promise} The list of files
 */
function getFiles() {
  gutil.log(' Searching for files...');
  if (global.WF.options.testPath || global.WF.options.testAll) {
    return new Promise(function(resolve, reject) {
      let globs = ['./gulp-tasks/**/*', './gulpfile.js'];
      let opts = {
        prefixBase: true,
        filter: 'isFile',
      };
      if (global.WF.options.testPath) {
        const testPath = global.WF.options.testPath;
        if (global.WF.options.verbose) {
          gutil.log(' ', 'Searching for files in', chalk.cyan(testPath));
        }
        opts.srcBase = global.WF.options.testPath;
        globs.push('**/*');
      } else {
        opts.srcBase = './src/content';
        global.WF.options.lang.forEach(function(lang) {
          const testPath = `${opts.srcBase}/${lang}`;
          if (global.WF.options.verbose) {
            gutil.log(' ', 'Searching for files in', chalk.cyan(testPath));
          }
          globs.push(`${lang}/**/*`);
        });
      }
      // Skip Puppeteer docs
      globs.push('!en/tools/puppeteer/_src/**/*');
      // Skip any _README.MD files
      globs.push('!_README.MD');
      resolve(glob.find(globs, opts));
    });
  } else {
    gutil.log(' ', 'Searching for changed files');
    let cmd = 'git --no-pager diff --name-only ';
    if (IS_TRAVIS) {
      cmd += '$(git merge-base FETCH_HEAD main) FETCH_HEAD';
    } else {
      cmd += '$(git merge-base origin/main HEAD)';
    }
    return wfHelper.promisedExec(cmd, '.')
    .then(function(results) {
      let files = [];
      let warnForSideEffect = false;
      results.split('\n').forEach(function(filename) {
        if (RE_GULP_BASE.test(filename) || filename === 'gulpfile.js') {
          warnForSideEffect = true;
          files.push(filename);
        } else if (RE_SRC_BASE.test(filename) || RE_DATA_BASE.test(filename) ||
                   filename === 'app.yaml') {
          files.push(filename);
        }
      });
      if (warnForSideEffect === true) {
        const warn = chalk.yellow('WARNING:');
        const msg = `Gulp tasks have changed, be sure to run with ` +
          `${chalk.cyan('--testAll')} or ${chalk.cyan('--testMain')} ` +
          `to catch any unintended side effects!`;
        gutil.log(warn, msg);
      }
      const warnMsg = `More than ${MAX_FILES_CHANGED_WARNING} files changed.`;
      if (files.length > MAX_FILES_CHANGED_ERROR) {
        const msg = `Maxiumum number of changed files exceeeded.`;
        logError('', null, `${msg} ${warnMsg}`);
      } else if (files.length > MAX_FILES_CHANGED_WARNING) {
        logWarning('', null, `${warnMsg}`);
      }
      return files;
    });
  }
}


/** ***************************************************************************
 * Primary File Test
 *****************************************************************************/

/**
 * Tests & validates a file.
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested.
 * @param {Object} opts Options for testing the file
 * @return {Promise} A promise that resolves after the tests have completed.
 */
function testFile(filename, opts) {
  const filenameObj = path.parse(filename.toLowerCase());

  // Check if the file is an extension we skip
  if (EXTENSIONS_TO_SKIP.indexOf(filenameObj.ext) >= 0) {
    if (global.WF.options.verbose) {
      const msg = 'Skipped (extension).';
      gutil.log(chalk.gray('SKIP:'), chalk.cyan(filename), msg);
    }
    return Promise.resolve(false);
  }

  // Check media files & verify they're not too big
  if (MEDIA_FILES.indexOf(filenameObj.ext) >= 0) {
    if (opts.ignoreFileSize) {
      return Promise.resolve(false);
    }
    const warnOnly = IS_TRAVIS && IS_TRAVIS_ON_MAIN;
    return validateMedia.test(filename, warnOnly);
  }

  // Attempt to read the file contents
  let contents = readFile(filename);
  if (!contents) {
    return Promise.resolve(false);
  }

  // Check if the file has the wf_ignore_file attribute, if so, skip tests.
  if (wfRegEx.RE_IGNORE_FILE.test(contents)) {
    if (!opts.hideIgnored) {
      const msg = `Skipped (wf_ignore_file).`;
      logWarning(filename, null, msg);
    }
    return Promise.resolve(false);
  }

  // Check if the file is auto-generated, if it is, ignore it
  if (wfRegEx.RE_AUTO_GENERATED.test(contents)) {
    if (global.WF.options.verbose) {
      const msg = `Skipped (auto-generated).`;
      gutil.log(chalk.gray('SKIP:'), chalk.cyan(filename), msg);
    }
    return Promise.resolve(false);
  }

  // Check the app.yaml file
  if (filenameObj.base === 'app.yaml') {
    logWarning(filename, null, `'app.yaml' was changed, was that intentional?`);
    return validateYaml.test(filename, contents);
  }

  // Check the contributors file
  if (filenameObj.base === '_contributors.yaml') {
    return validateYaml.test(filename, contents)
      .then((parsed) => testContributors.test(filename, parsed));
  }

  // Check the contributors file
  if (filenameObj.base === 'common-typos.yaml') {
    return validateYaml.test(filename, contents)
      .then((parsed) => validateCommonTyposFile.test(filename, parsed));
  }

  // Check the glossary file
  if (filenameObj.base === 'glossary.yaml') {
    return validateYaml.test(filename, contents)
      .then((parsed) => testGlossary.test(filename, parsed));
  }

  // Check the redirects file
  if (filenameObj.base === '_redirects.yaml') {
    return validateYaml.test(filename, contents)
      .then((parsed) => testRedirects.test(filename, parsed));
  }

  // Check the project.yaml file
  if (filenameObj.base === '_project.yaml') {
    return validateYaml.test(filename, contents)
      .then((parsed) => testProject.test(filename, parsed));
  }

  // Check _book.yaml & _toc.yaml files
  if (filenameObj.base === '_book.yaml' ||
      filenameObj.base.endsWith('_toc.yaml')) {
    return validateYaml.test(filename, contents)
      .then((parsed) => testBook.test(filename, parsed));
  }

  // Check the common tags file
  if (filenameObj.base === 'commontags.json') {
    return validateJson.test(filename, contents)
      .then((parsed) => testCommonTags.test(filename, parsed));
  }

  // Check & validate the Gulp JavaScript files
  if (RE_GULP_BASE.test(filenameObj.dir) ||
      filenameObj.base === 'gulpfile.js') {
    return lintJavaScript.test(filename, esLintConfig, contents);
  }

  // Check markdown files
  if (MD_FILES.indexOf(filenameObj.ext) >= 0) {
    return validateMarkdown.test(filename, contents, opts);
  }

  // Check HTML files
  if (filenameObj.ext === '.html') {
    return validateHtml.test(filename, contents, opts);
  }

  // Check YAML files
  if (filenameObj.ext === '.yaml') {
    return validateYaml.test(filename, contents)
      .then((parsed) => {
        // Not all _toc.yaml files will be named _toc.yaml, so if it has a
        // toc element, treat it as a _toc.yaml file.
        if (parsed.toc) {
          return testBook.test(filename, parsed);
        }
      });
  }

  // Check JSON files
  if (filenameObj.ext === '.json') {
    return validateJson.test(filename, contents);
  }

  // Check JS files
  if (opts.warnOnJavaScript && filenameObj.ext === '.js') {
    return validateJavaScript.test(filename, contents);
  }

  // Check any stray files
  return validateGeneric.test(filename, contents);
}

/**
 * Temporary function to print results from refactored tests
 *
 * @param {Array} results The array of results.
 * @return {Array} results as handed in.
 */
function printTestResults(results) {
  if (!results) {
    return false;
  }
  if (Array.isArray(results) === false) {
    results = [results];
  }
  results.forEach((result) => {
    const filename = result.filename;
    const position = result.position;
    const message = result.message;
    const extra = result.extra;
    if (result.level === 'ERROR') {
      logError(filename, position, message, extra);
    } else {
      logWarning(filename, position, message, extra);
    }
  });
  return true;
}


/** ***************************************************************************
 * Get PR data to potentially ignore any tests
 *****************************************************************************/

gulp.task('test:travis-init', function() {
  // Get the PR number and GitHub Token
  const prNumber = parseInt(process.env.TRAVIS_PULL_REQUEST, 10);
  const gitToken = process.env.GIT_TOKEN;
  // Verify we're on Travis, have a PR# and have the git token
  if (!IS_TRAVIS || !prNumber || !gitToken) {
    gutil.log(' ', 'Not Travis.');
    return Promise.resolve();
  }
  gutil.log(' ', `${chalk.cyan('Travis PR')} - getting title & description.`);
  const prOpts = {
    owner: 'Google',
    repo: 'WebFundamentals',
    number: prNumber,
  };
  // Look up the PR body and check it's contents
  const github = new GitHubApi({debug: false, Promise: Promise});
  github.authenticate({type: 'oauth', token: gitToken});
  return github.pullRequests.get(prOpts).then((prData) => {
    gutil.log('  ', `${prData.title} (${prData.number})`);
    const body = prData.body;
    const ciFlags = wfRegEx.getMatch(/\[WF_IGNORE:(.*)\]/, body, '').split(',');
    if (ciFlags.indexOf('BLINK') >= 0) {
      global.WF.options.ignoreBlink = true;
    }
    if (ciFlags.indexOf('MAX_LEN') >= 0) {
      global.WF.options.ignoreMaxLen = true;
    }
    if (ciFlags.indexOf('SCRIPT') >= 0) {
      global.WF.options.ignoreScript = true;
    }
    if (ciFlags.indexOf('FILE_SIZE') >= 0) {
      global.WF.options.ignoreFileSize = true;
    }
    if (ciFlags.indexOf('ESLINT') >= 0) {
      global.WF.options.ignoreESLint = true;
    }
    if (ciFlags.indexOf('LAST_UPDATED') >= 0) {
      global.WF.options.ignoreLastUpdated = true;
    }
    if (ciFlags.indexOf('PERM_CHECK') >= 0) {
      global.WF.options.ignorePermissions = true;
    }
    if (ciFlags.indexOf('FEED_WIDGET') >= 0) {
      global.WF.options.ignoreMissingFeedWidget = true;
    }
    if (ciFlags.indexOf('TYPOS') >= 0) {
      global.WF.options.ignoreTypos = true;
    }
    if (ciFlags.indexOf('TEMPLATE_TAGS') >= 0) {
      global.WF.options.ignoreTemplateTags = true;
    }
    if (ciFlags.indexOf('HELPFUL_WIDGET') >= 0) {
      global.WF.options.ignoreHelpfulWidget = true;
    }
  });
});

/** ***************************************************************************
 * Gulp Test Task
 *****************************************************************************/

gulp.task('test', ['test:travis-init'], function() {
  if (global.WF.options.help) {
    gutil.log(' ', chalk.cyan('--help'), 'Shows this message');
    gutil.log(' ', chalk.cyan('--testAll'), 'Tests all files');
    gutil.log(' ', chalk.cyan('--testMain'), 'Tests all files like Travis');
    gutil.log(' ', chalk.cyan('--testTests'), 'Tests the test files');
    gutil.log(' ', chalk.cyan('--ignoreESLint'), 'Skips ESLinting');
    gutil.log(' ', chalk.cyan('--ignoreBlink'), 'Skips wf_blink_components');
    gutil.log(' ', chalk.cyan('--ignoreMaxLen'), 'Skips line length checks');
    gutil.log(' ', chalk.cyan('--ignoreScript'), 'Skips <script> checks');
    gutil.log(' ', chalk.cyan('--ignoreFileSize'), 'Skips file size checks');
    gutil.log(' ', chalk.cyan('--ignorePermissions'), 'Skips permission check');
    gutil.log(' ', chalk.cyan('--ignoreLastUpdated'), 'Skips wf_updated_on');
    gutil.log(' ', chalk.cyan('--ignoreHelpfulWidget'), 'Skips helpful widget');
    gutil.log(' ', chalk.cyan('--ignoreTemplateTags'),
      'Skips template tag check ({{)');
    gutil.log(' ', chalk.cyan('--ignoreMissingFeedWidget'),
      'Skips feed widget check on updates');
    gutil.log(' ', chalk.cyan('--ignoreTypos'), 'Ignores common typos');
    return true;
  }

  if ((global.WF.options.testMain) ||
      (IS_TRAVIS && IS_TRAVIS_PUSH && IS_TRAVIS_ON_MAIN)) {
    global.WF.options.testAll = true;
    global.WF.options.ignoreBlink = true;
    global.WF.options.ignoreMaxLen = true;
    global.WF.options.ignoreScript = true;
    global.WF.options.ignoreFileSize = true;
    global.WF.options.ignorePermissions = true;
    global.WF.options.ignoreLastUpdated = true;
    global.WF.options.ignoreTemplateTags = true;
    global.WF.options.ignoreCommentWidget = true;
    global.WF.options.ignoreHelpfulWidget = true;
    global.WF.options.ignoreMissingFeedWidget = true;
    global.WF.options.ignoreTypos = true;
    global.WF.options.hideIgnored = true;
  }

  let opts = {
    enforceLineLengths: true,
    lastUpdateMaxDays: 7,
    warnOnJavaScript: true,
    commonTags: parseJSON(COMMON_TAGS_FILE, readFile(COMMON_TAGS_FILE)),
    commonTypos: parseYAML(COMMON_TYPOS_FILE, readFile(COMMON_TYPOS_FILE)),
    contributors: parseYAML(CONTRIBUTORS_FILE, readFile(CONTRIBUTORS_FILE)),
  };

  // Comment widget will be deprecated in 2019Q2-3, disabling the warning
  global.WF.options.ignoreCommentWidget = true;

  // Test main
  if (global.WF.options.testMain) {
    const msg = `${chalk.cyan('--testMain')} was used.`;
    gutil.log(chalk.bold.blue(' Option:'), msg);
  }

  // Test all files
  if (global.WF.options.testAll) {
    const msg = `${chalk.cyan('--testAll')} was used.`;
    gutil.log(chalk.bold.blue(' Option:'), msg);
  }

  // Test the test files
  if (global.WF.options.testTests) {
    global.WF.options.testPath = './src/tests';
    opts.lastUpdateMaxDays = false;
  }

  // Supress ESLinter
  if (global.WF.options.ignoreESLint) {
    const msg = `${chalk.cyan('--ignoreESLint')} was used.`;
    gutil.log(chalk.bold.blue(' Option:'), msg);
  } else {
    esLintConfig = parseJSON(ESLINT_RC_FILE, readFile(ESLINT_RC_FILE));
  }

  // Supress wf_blink_components warnings
  if (global.WF.options.ignoreBlink) {
    const msg = `${chalk.cyan('--ignoreBlink')} was used.`;
    gutil.log(chalk.bold.blue(' Option:'), msg);
  } else {
    opts.blinkComponents = parseJSON(BLINK_COMPONENTS_FILE,
        readFile(BLINK_COMPONENTS_FILE));
  }

  // Supress max line length warnings
  if (global.WF.options.ignoreMaxLen) {
    const msg = `${chalk.cyan('--ignoreMaxLen')} was used.`;
    gutil.log(chalk.bold.blue(' Option:'), msg);
    opts.enforceLineLengths = false;
  }

  // Supress markdown script warnings
  if (global.WF.options.ignoreScript) {
    const msg = `${chalk.cyan('--ignoreScript')} was used.`;
    gutil.log(chalk.bold.blue(' Option:'), msg);
    opts.ignoreScriptTags = true;
  }

  // Supress file size warnings
  if (global.WF.options.ignoreFileSize) {
    const msg = `${chalk.cyan('--ignoreFileSize')} was used.`;
    gutil.log(chalk.bold.blue(' Option:'), msg);
    opts.ignoreFileSize = true;
  }

  // Supress executable file check
  opts.checkPermissions = true;
  if (global.WF.options.ignorePermissions) {
    const msg = `${chalk.cyan('--ignorePermissions')} was used.`;
    gutil.log(chalk.bold.blue(' Option:'), msg);
    opts.checkPermissions = false;
  }

  // Supress missing helpful widget warnings
  if (global.WF.options.ignoreHelpfulWidget) {
    const msg = `${chalk.cyan('--ignoreHelpfulWidget')} was used.`;
    gutil.log(chalk.bold.blue(' Option:'), msg);
    opts.ignoreMissingHelpfulWidget = true;
  }

  // Supress missing feed widget checks
  if (global.WF.options.ignoreMissingFeedWidget) {
    const msg = `${chalk.cyan('--ignoreMissingFeedWidget')} was used.`;
    gutil.log(chalk.bold.blue(' Option:'), msg);
    opts.ignoreMissingFeedWidget = true;
  }

  // Supress last updated warnings
  if (global.WF.options.ignoreLastUpdated) {
    const msg = `${chalk.cyan('--ignoreLastUpdated')} was used.`;
    gutil.log(chalk.bold.blue(' Option:'), msg);
    opts.lastUpdateMaxDays = false;
  }

  // Supress template tag ({{}}) checks
  if (global.WF.options.ignoreTemplateTags) {
    const msg = `${chalk.cyan('--ignoreTemplateTags')} was used.`;
    gutil.log(chalk.bold.blue(' Option:'), msg);
    opts.ignoreTemplateTags = true;
  }

  // Skips the common typos checks
  if (global.WF.options.ignoreTypos) {
    const msg = `${chalk.cyan('--ignoreTypos')} was used.`;
    gutil.log(chalk.bold.blue(' Option:'), msg);
    opts.ignoreTypos = true;
  }

  // Hide ignored file warning
  if (global.WF.options.hideIgnored) {
    const msg = `${chalk.cyan('--hideIgnored')} was used.`;
    gutil.log(chalk.bold.blue(' Option:'), msg);
    opts.hideIgnored = true;
  }

  return getFiles()
    .then(function(files) {
      gutil.log(chalk.green('Testing'), 'files...');
      return Promise.all(files.map(function(filename) {
        if (global.WF.options.verbose) {
          gutil.log('TESTING:', chalk.cyan(filename));
        }
        if (!validateFilename.test(filename)) {
          logError(filename, null, `File contains illegal characters.`);
        }
        if (opts.checkPermissions && !validatePermissions.test(filename)) {
          const msg = `File is executable, remove the 'x' attribute.`;
          logError(filename, null, msg);
        }
        return testFile(filename, opts)
          .catch(printTestResults)
          .then((wasTested) => {
            if (wasTested) {
              filesTested++;
            }
          });
      }));
    })
    .catch(function(ex) {
      const msg = `A critical gulp task exception occurred: ${ex.message}`;
      logError('gulp-tasks/test.js', null, msg, ex);
    })
    .then(printSummary)
    .then(throwIfFailed);
});
