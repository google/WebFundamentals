/**
 * @fileoverview Updates the Git Status based on Deployment Success Failure.
 *
 * @author Pete LePage <petele@google.com>
 */

/* eslint no-console: 0 */

'use strict';

const chalk = require('chalk');
const GitHubApi = require('github');

console.log('Git Build Status Updater');

const AE_APP_ID = process.env.AE_APP_ID;
const REPO_SLUG = process.env.TRAVIS_REPO_SLUG.split('/');
const REPO_OWNER = REPO_SLUG[0];
const REPO_NAME = REPO_SLUG[1];
const OAUTH_TOKEN = process.env.GIT_TOKEN;
const PR_SHA = process.env.TRAVIS_PULL_REQUEST_SHA;

if (!OAUTH_TOKEN) {
  console.log('Unable to update Git Status, GIT_TOKEN unavailable.');
  process.exit(0);
}

let github = new GitHubApi({
  debug: false,
  Promise: Promise,
});

github.authenticate({
  type: 'oauth',
  token: OAUTH_TOKEN,
});

let opts = {
  owner: REPO_OWNER,
  repo: REPO_NAME,
  sha: PR_SHA,
  context: 'wf/staging',
};

if (process.argv[2] === 'pending') {
  opts.state = 'pending';
  opts.description = 'Staging the build on ' + AE_APP_ID;
} else if (process.argv[2] === 'success') {
  opts.state = 'success';
  opts.description = 'Build staged on ' + AE_APP_ID;
  opts.target_url = process.argv[3];
} else if (process.argv[2] === 'failure') {
  opts.state = 'failure';
  opts.description = 'Unable to stage build on ' + AE_APP_ID;
} else {
  console.log(chalk.red('ERROR!'), 'Unknown state, exiting...');
  process.exit(0);
}

console.log('State:', chalk.cyan(opts.state));

github.repos.createStatus(opts)
.catch(function(err) {
  console.log(chalk.red('ERROR'), 'unable to set status:', err);
})
.then(function(result) {
  console.log('Updated.');
});
