/**
 * @fileoverview Removes Staged PRs that are either closed or merged.
 *
 * @author Pete LePage <petele@google.com>
 */

/* eslint no-console: 0 */

'use strict';

let chalk = require('chalk');
let GitHubApi = require('github');
const exec = require('child_process').exec;

console.log('Travis Deployment Cleanup');

const OAUTH_TOKEN = process.env.GIT_TOKEN;
if (!OAUTH_TOKEN) {
  console.log(chalk.red('OOPS:'), 'Encrypted variables are unavailable.');
  process.exit(0);
}

let travisIsPush = process.env.TRAVIS_EVENT_TYPE === 'push';
if (travisIsPush !== true) {
  console.log(chalk.yellow('Skipping:'), 'Event type must be push.');
  process.exit(0);
}

let travisIsOnMaster = process.env.TRAVIS_BRANCH === 'master';
if (travisIsOnMaster !== true) {
  console.log(chalk.yellow('Skipping:'), 'Must be on master');
  process.exit(0);
}

const GCLOUD = process.env.HOME + '/google-cloud-sdk/bin/gcloud';
const REPO_SLUG = process.env.TRAVIS_REPO_SLUG.split('/');
const REPO_OWNER = REPO_SLUG[0];
const REPO_NAME = REPO_SLUG[1];

let github = new GitHubApi({
  debug: false,
  Promise: Promise,
});

github.authenticate({
  type: 'oauth',
  token: OAUTH_TOKEN,
});

/**
 * Executes a shell command and returns the result in a promise.
 *
 * @param {string} cmd The command to run.
 * @param {string} cwd The working directory to run the command in.
 * @return {Promise} The promise that will be resolved on completion.
 */
function promisedExec(cmd, cwd) {
  return new Promise(function(resolve, reject) {
    const cmdLog = chalk.cyan(`$ ${cmd}`);
    console.log(cmdLog);
    const execOptions = {
      cwd: cwd,
      maxBuffer: 1024 * 1024,
    };
    exec(cmd, execOptions, function(err, stdOut, stdErr) {
      stdOut = stdOut.trim();
      stdErr = stdErr.trim();
      if (err) {
        console.log(cmdLog, chalk.red('FAILED'));
        const output = (stdOut + '\n' + stdErr).trim();
        console.log(output);
        reject(err);
        return;
      }
      console.log(stdOut);
      resolve(stdOut);
    });
  });
}

/**
 * Parses the string of staged PRs and returns an array of PRs
 *
 * @param {string} stagedPRs The list of PRs as provided by AppEngine
 * @return {Array} List of staged PRs
 */
function getListOfStagedPRs(stagedPRs) {
  let result = [];
  stagedPRs = stagedPRs.split('\n');
  stagedPRs.forEach(function(line) {
    let matched = line.match(/ pr-(\d+) /);
    if (matched) {
      result.push(matched[1]);
    }
  });
  return result;
}

return promisedExec(GCLOUD + ' app versions list', '.')
.then(function(allStagedVersions) {
  let promises = [];
  let stagedPRs = getListOfStagedPRs(allStagedVersions);
  stagedPRs.forEach(function(pr) {
    let opts = {
      owner: REPO_OWNER,
      repo: REPO_NAME,
      number: parseInt(pr),
    };
    const p = new Promise(function(resolve, reject) {
      github.pullRequests.get(opts)
      .then(function(prData) {
        if (prData.state === 'closed' || prData.merged === 'true') {
          let cmdLine = GCLOUD + ' app versions delete pr-' + prData.number;
          promisedExec(cmdLine, '.')
          .catch(function(peR) {
            console.log(chalk.red('OOPS!'),
              `Unable to delete pr-${prData.number}`);
            resolve();
          })
          .then(function(peR) {
            console.log(chalk.green('Deleted'), 'pr-' + prData.number);
            resolve();
          });
        }
        resolve();
      });
    });
    promises.push(p);
  });
  return Promise.all(promises);
})
.catch(function(err) {
  console.log('err', err);
});
