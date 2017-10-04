'use strict';

/*
    addCommitComment.js
    Adds a comment to the current commit with the build status.
 */

const fs = require('fs');
const chalk = require('chalk');
const GitHubApi = require('github');

const TEST_LOG_FILE = './test-results.json';

console.log('Travis Add Commit Comment');

function generateCommitMessage(gitData, testResults) {
  if (!testResults || (testResults.errors.length === 0 && testResults.warnings.length === 0)) {
    return ':+1:';
  }

  let body = ['**Whoops!**\n\n'];

  if (testResults.errors.length > 0) {
    body.push(`There were **${testResults.errors.length} critical errors** `);
    body.push('that broke the build and prevented it from being automatically ');
    body.push('deployed.\n\n');
  }
  if (testResults.warnings.length > 0) {
    body.push(`There were *${testResults.warnings.length} warnings* that `);
    body.push('will prevent this PR from being merged. Please take a look, ');
    body.push('and either fix, or provide a justification for why they can\'t ');
    body.push('be fixed.\n\n');
  }

  function buildMessages(msgs) {
    msgs.forEach(function(msg) {
      let filename = msg.filename;
      if (msg.position && msg.position.line) {
        filename += `#L${msg.position.line}`;
      }
      let urlToFile = `https://github.com/${gitData.repoOwner}/${gitData.repoName}/`;
      urlToFile += `blame/${gitData.prSHA}/${filename}`;
      body.push(`[\`${filename}\`](${urlToFile}) - ${msg.message}\n`);
    });
  }

  if (testResults.errors.length > 0) {
    body.push('\n\n**ERRORS**\n');
    buildMessages(testResults.errors);
  }

  if (testResults.warnings.length > 0) {
    body.push('\n\n**WARNINGS**\n');
    buildMessages(testResults.warnings);
  }

  body.push('\n');
  return body.join('');
}


/**
 * Adds a commit comment on GitHub
 *
 * @param {Object} data The Travis information to update
 * @param {string} body The body of the message to post
 * @return {Promise} The result of the GitHub API push
 */
function addPRComment(github, gitInfo, body) {
  return github.repos.createComment({
    owner: gitInfo.repoOwner,
    repo: gitInfo.repoName,
    number: gitInfo.prNum,
    body,
  })
  .then(() => console.log(chalk.green('✓'), 'PR comment posted'))
  .catch((err) => {
    console.log(chalk.red('✖'), 'Failed to post PR comment');
    console.error(err);
  });
}

function deletePreviousPRComments(github, gitInfo) {
  return github.issues.getComments({
    owner: gitInfo.repoOwner,
    repo: gitInfo.repoName,
    number: gitInfo.prNum,
  })
  .then((issueCommentsData) => {
    const issueComments = issueCommentsData.data;
    const botIssues = issueComments.filter((issueComment) => {
      return (issueComment.user.login === 'WebFundBot');
    });
    return Promise.all(
      botIssues.map((botIssue) => {
        return github.issues.deleteComment({
          id: botIssue.id,
          owner: gitInfo.repoOwner,
          repo: gitInfo.repoName,
        });
      })
    );
  })
  .then(() => console.log(chalk.green('✓'), 'Deleted previous bot comments'))
  .catch((err) => {
    console.log(chalk.red('✖'), 'Failed to delete previous bot comments');
    console.error(err);
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
      console.log(chalk.red('✖'), 'Travis CI');
      resolve(null);
      return;
    }
    console.log(chalk.green('✓'), 'Travis CI');

    if (process.env.TRAVIS_SECURE_ENV_VARS !== 'true') {
      console.log(chalk.red('✖'), 'Travis Secure Variables');
      resolve(null);
      return;
    }
    console.log(chalk.green('✓'), 'Travis Secure Variables');

    result.git.token = process.env.GIT_TOKEN;
    if (!result.git.token) {
      console.log(chalk.red('✖'), 'Git Token', chalk.red('undefined'));
      resolve(null);
      return;
    }

    let eventType = process.env.TRAVIS_EVENT_TYPE;
    if (!eventType || eventType.toLowerCase() !== 'pull_request') {
      console.log(chalk.red('✖'), 'Event Type:', chalk.red(eventType));
      resolve(null);
      return;
    }
    console.log(chalk.green('✓'), 'Event Type:', chalk.cyan(eventType));

    let prNum = process.env.TRAVIS_PULL_REQUEST;
    let prSHA = process.env.TRAVIS_PULL_REQUEST_SHA;
    if (!prNum || !prSHA) {
      console.log(chalk.red('✖'), 'PR', chalk.red(prNum), chalk.red(prSHA));
      resolve(null);
      return;
    }
    result.git.prNum = parseInt(prNum, 10);
    result.git.prSHA = prSHA;
    console.log(chalk.green('✓'), 'PR', chalk.cyan(prNum), chalk.cyan(prSHA));

    let repoName;
    let repoOwner;
    let repoSlug = process.env.TRAVIS_REPO_SLUG;
    if (!repoSlug || repoSlug.toLowerCase() !== 'google/webfundamentals') {
      console.log(chalk.red('✖'), 'Repo', chalk.red('undefined'), '/', chalk.red('undefined'));
      resolve(null);
      return;
    } else {
      result.git.repoName = 'WebFundamentals';
      result.git.repoOwner = 'Google';
      console.log(chalk.green('✓'), 'Repo', chalk.cyan(result.git.repoOwner), chalk.cyan(result.git.repoName));
    }
    try {
      let contents = fs.readFileSync(TEST_LOG_FILE, 'utf8');
      result.testResults = JSON.parse(contents);
      console.log(chalk.green('✓'), 'Test File', chalk.cyan(TEST_LOG_FILE));
    } catch(ex) {
      console.log(chalk.red('✖'), 'Unable to parse test results.');
      resolve(null);
      return;
    }
    resolve(result);
  });
}


getTravisInfo()
  .then(function(data) {
    let testResults = data.testResults;
    let body = generateCommitMessage(data.git, testResults);

    let github = new GitHubApi({debug: false, Promise: Promise});
    github.authenticate({type: 'oauth', token: data.git.token});
    return deletePreviousPRComments(github, data.git)
    .then(() => addPRComment(github, data.git, body));
  })
  .catch(function(err) {
    console.log(chalk.red('✖'), err.message);
  });
