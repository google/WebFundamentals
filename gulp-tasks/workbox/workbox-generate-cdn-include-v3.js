/**
 * @fileoverview Generate the latest CDN URL that can be included in docs.
 *
 * @author Matt Gaunt <gauntface@google.com>
 */

'use strict';

const gulp = require('gulp');
const path = require('path');
const fs = require('fs-extra');

const getLatestTags = require('../reference-docs/get-latest-tags');

gulp.task('workbox-generate-cdn-include-v3', () => {
  const gitUrl = 'https://github.com/GoogleChrome/workbox.git';
  return getLatestTags(gitUrl, {
    includePrerelease: true,
  })
  .then((latestTags) => {
    // TODO: Replace these three lines for Workbox-build when getModuleUrl()
    // will be exposed
    const buildPath = path.dirname(require.resolve('workbox-build'));
    const workboxBuild = require(path.join(buildPath, 'lib', 'cdn-utils.js'));
    const latestUrl = workboxBuild.getModuleUrl('workbox-sw');

    // Substring removes the 'v' at the front of the git tag.
    if (latestUrl.indexOf(latestTags[0].substring(1)) === -1) {
      throw new Error(`The latest tag isn't in the module URL from ` +
        `workbox-build. This means the workbox-build version is out of date.`);
    }

    const toolsPath = path.join(
      __dirname, '..', '..', 'src', 'content', 'en', 'tools'
    );
    const includePath = path.join(
      toolsPath, 'workbox', '_shared', 'workbox-sw-cdn-url.html');

    fs.ensureDirSync(path.dirname(includePath));
    fs.writeFileSync(includePath, latestUrl);
  });
});
