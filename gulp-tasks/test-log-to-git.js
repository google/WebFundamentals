'use strict';

const fs = require('fs');
const gulp = require('gulp');
const chalk = require('chalk');
const gutil = require('gulp-util');
const GitHubApi = require('github');
const runSequence = require('run-sequence');

const TEST_LOG_FILE = './test-results.json';

function generateCommitMessage(testResults) {
  let body;

  if (testResults.errors.length === 0 && testResults.warnings === 0) {
    body = ':+1';
    return body;
  }

  body = ['**Whoops!**'];
  
  if (testResults.errors.length > 0) {
    body.push(`There were **${testResults.errors.length} critical errors**`);
    body.push('that broke the build and prevented it from being automatically');
    body.push('deployed.\n\n');
  }
  if (testResults.warnings.length > 0) {
    body.push(`There were *${testResults.warnings.length} warnings* that`);
    body.push('will prevent this PR from being merged. Please take a look,');
    body.push('and either fix, or provide a justification for why they can\'t');
    body.push('be fixed.\n\n');
  }
  if (testResults.errors.length > 0) {
    body.push('\n\n**ERRORS**');
    testResults.errors.forEach(function(err) {
      let line = '`' + err.filename;
      if (err.position && err.position.line) {
        line += ':' + err.position.line;
      }
      line += '` ' + err.message;
      body.push(line + '\n');
    });
  }

  if (testResults.warnings.length > 0) {
    body.push('\n\n**WARNINGS**');
    testResults.warnings.forEach(function(err) {
      let line = '`' + err.filename;
      if (err.position && err.position.line) {
        line += ':' + err.position.line;
      }
      line += '` ' + err.message;
      body.push(line + '\n');
    });
  }

  body.push('\n\n');
  return body.join(' ');
}


/**
 * Adds a commit comment on GitHub
 *
 * @param {Object} data The Travis information to update
 * @param {string} body The body of the message to post
 * @return {Promise} The result of the GitHub API push
 */
function addCommitComment(gitInfo, body) {
  let github = new GitHubApi({debug: false, Promise: Promise});
  github.authenticate({type: 'oauth', token: gitInfo.token});
  return github.repos.createCommitComment({
    owner: gitInfo.repoOwner,
    repo: gitInfo.repoName,
    sha: gitInfo.prSHA,
    body: body
  });
}

/**
 * Gets the Travis CI details
 *
 * @return {Promise} An  promise with the build information
 */
function getTravisInfo() {
  return new Promise(function(resolve, reject) {
    let result = {
      git: {}
    };

    if (process.env.TRAVIS !== 'true') {
      gutil.log(chalk.red('✖'), 'Travis CI');
      resolve(null);
      return;
    }
    gutil.log(chalk.green('✓'), 'Travis CI');

    if (process.env.TRAVIS_SECURE_ENV_VARS !== 'true') {
      gutil.log(chalk.red('✖'), 'Travis Secure Variables');
      resolve(null);
      return;
    }
    gutil.log(chalk.green('✓'), 'Travis Secure Variables');

    result.git.token = process.env.GIT_TOKEN;
    if (!result.git.token) {
      gutil.log(chalk.red('✖'), 'Git Token', chalk.red('undefined'));
      resolve(null);
      return;
    }

    let eventType = process.env.TRAVIS_EVENT_TYPE;
    if (!eventType || eventType.toLowerCase() !== 'pull_request') {
      gutil.log(chalk.red('✖'), 'Event Type:', chalk.red(eventType));
      resolve(null);
      return;
    }
    gutil.log(chalk.green('✓'), 'Event Type:', chalk.cyan(eventType));

    let prNum = process.env.TRAVIS_PULL_REQUEST;
    let prSHA = process.env.TRAVIS_PULL_REQUEST_SHA;
    if (!prNum || !prSHA) {
      gutil.log(chalk.red('✖'), 'PR', chalk.red(prNum), chalk.red(prSHA));
      resolve(null);
      return;
    }
    result.git.prNum = parseInt(prNum, 10);
    result.git.prSHA = prSHA;
    gutil.log(chalk.green('✓'), 'PR', chalk.cyan(prNum), chalk.cyan(prSHA));

    let repoName;
    let repoOwner;
    let repoSlug = process.env.TRAVIS_REPO_SLUG;
    if (!repoSlug || repoSlug.toLowerCase() !== 'google/webfundamentals') {
      gutil.log(chalk.red('✖'), 'Repo', chalk.red('undefined'), '/', chalk.red('undefined'));
      resolve(null);
      return;
    } else {
      result.git.repoName = 'WebFundamentals';
      result.git.repoOwner = 'Google';
      gutil.log(chalk.green('✓'), 'Repo', chalk.cyan(result.git.repoOwner), chalk.cyan(result.git.repoName));
    }
    try {
      let contents = fs.readFileSync(TEST_LOG_FILE, 'utf8');
      result.testResults = JSON.parse(contents);
      gutil.log(chalk.green('✓'), 'Test File', chalk.cyan(TEST_LOG_FILE));
    } catch(ex) {
      gutil.log(chalk.red('✖'), 'Unable to parse test results.');
      resolve(null);
      return;
    }
    resolve(result);
  });
}


gulp.task('report-to-git', function() {
  return getTravisInfo()
  .then(function(data) {
    if (data) {
      let testResults = data.testResults;
      let body = generateCommitMessage(testResults);
      return addCommitComment(data.git, body)
      .catch(function(err) {
        gutil.log(chalk.red('✖'), err.message);
      })
      .then(function(resp) {
        if (testResults.errors.length > 0) {
          throw new Error(`${testResults.errors.length} tests failed.`);
        }
      });
    }
  });
});
