'use strict';

/*
    wfGitHelper.js
    TODO
 */

let GitHubApi = require('github');


const OWNER = 'petele';
const REPO = 'WebFundamentals';
const OAUTH_TOKEN = process.env.GIT_TOKEN

let github = new GitHubApi({
  debug: false,
  Promise: Promise
});



github.authenticate({
  type: 'oauth',
  token: OAUTH_TOKEN
});

function addComment(issueId, body) {
  return github.issues.createComment({
    owner: OWNER,
    repo: REPO,
    number: issueId,
    body: body
  });
}

exports.addComment = addComment;


