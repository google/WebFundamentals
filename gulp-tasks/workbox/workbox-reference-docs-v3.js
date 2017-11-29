/**
 * @fileoverview Build V3 JSDocs for workbox. Delete when no longer pre-release.
 *
 * @author Matt Gaunt <gauntface@google.com>
 */
'use strict';

const gulp = require('gulp');
const path = require('path');
const os = require('os');
const fs = require('fs-extra');

const getLatestTags = require('../reference-docs/get-latest-tags');
const filterTagsToBuild = require('../reference-docs/filter-tags-to-build');
const getSourceCode = require('../reference-docs/get-source-code');
const buildJSDocs = require('../reference-docs/build-js-docs');

/**
 * Temporary build script to generate the reference docs for v3.
 *
 * This should be removed when workbox v3 is merged into master
 */

gulp.task('workbox-reference-docs-v3', ['workbox-generate-contributors', 'workbox-generate-cdn-include-v3'],
  () => {
  const gitUrl = 'https://github.com/GoogleChrome/workbox.git';
  const toolsPath = path.join(
    __dirname, '..', '..', 'src', 'content', 'en', 'tools'
  );
  const docPath = path.join(toolsPath, 'workbox', 'v3', 'reference-docs');
  const jsdocConfPath = path.join(toolsPath, 'workbox', 'v3', '_jsdoc.conf');

  // Get all of the latest tags from Github
  let latestTags;
  return getLatestTags(gitUrl, {
    includePrerelease: true,
  })
  .then((tags) => {
    latestTags = tags;
    // Filter the list down to tags that need to be built
    return filterTagsToBuild(latestTags, docPath);
  })
  .then((tagsToBuild) => {
    return tagsToBuild.reduce((promiseChain, tag) => {
      const tmpSrCodePath = path.join(os.tmpdir(), Date.now().toString(), tag);
      return promiseChain.then(() => {
        return getSourceCode(gitUrl, tag, tmpSrCodePath);
      })
      .then(() => {
        const taggedOutputPath = path.join(docPath, tag);
        return buildJSDocs(tmpSrCodePath, taggedOutputPath, jsdocConfPath);
      })
      .then(() => {
        if (tag === latestTags[0]) {
          const latestOutputPath = path.join(docPath, 'latest');
          fs.removeSync(latestOutputPath);
          return buildJSDocs(tmpSrCodePath, latestOutputPath, jsdocConfPath);
        }
      });
    }, Promise.resolve());
  });
});
