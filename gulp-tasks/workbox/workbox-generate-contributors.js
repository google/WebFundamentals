'use strict';

const GitHubApi = require('github');
const fs = require('fs-extra');
const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const wfTemplateHelper = require('../wfTemplateHelper');

const MAX_COLLABORATORS = 20;

/**
 * Generates a list of contributors with links and images into
 * tools/workbox/templates using the Github API to get the top 20
 * contributors.
 */

gulp.task(`workbox-generate-contributors`, function() {
  let token = process.env.GITHUB_TOKEN;
  if (!token) {
    token = fs.readFileSync('./src/data/githubKey.txt', 'utf8');
  }

  if (!token) {
    gutil.log(`Unable to build Workbox contributors due to no ` +
      `GITHUB_TOKEN existing on the current PATH or ` +
      `in src/data/githubKey.txt.`);

    // Return a promise so gulp is happy and thinks the task completed
    return Promise.resolve();
  }

  const github = new GitHubApi();
  github.authenticate({
    type: 'token',
    token: process.env.GITHUB_TOKEN,
  });

  return github.repos.getStatsContributors({
    owner: 'googlechrome',
    repo: 'workbox',
  })
  .then((contributorStats) => {
    contributorStats.sort((a, b) => b.total - a.total);

    if (contributorStats.length > MAX_COLLABORATORS) {
      contributorStats = contributorStats.splice(0, MAX_COLLABORATORS);
    }

    const template = path.join(
      global.WF.src.templates, 'workbox', 'contributors.html');
    const outputPath = path.join(
      __dirname, '..', '..', 'src', 'content', 'en', 'tools',
      'workbox', '_shared', 'contributors.html');

    return wfTemplateHelper.renderTemplate(
      template,
      {contributorStats},
      outputPath
    );
  })
  .catch((err) => {
    gutil.log(gutil.colors.red(
      `An error occured when generating the Workbox ` +
      `collaborators.`
    ));
    gutil.log(err);
  });
});
