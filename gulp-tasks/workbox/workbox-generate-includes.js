/**
 * @fileoverview Generate the latest CDN URL that can be included in docs.
 *
 * @author Matt Gaunt <gauntface@google.com>
 */

'use strict';

const gulp = require('gulp');
const path = require('path');
const fs = require('fs-extra');

const wfHelper = require('../wfHelper');
const {getLatestTags} = require('../reference-docs/get-latest-tags');

/**
 * We need to ensure workbox-build is up to date to get the latest
 * CDN version.
 *
 * @return {Promise} Resolves once workbox has been updates
 */
function updateWorkboxBuild() {
  return wfHelper.promisedExec(`npm install --save-dev workbox-build`);
}

gulp.task('workbox-generate-includes', () => {
  const gitUrl = 'https://github.com/GoogleChrome/workbox.git';
  return updateWorkboxBuild()
  .then(() => getLatestTags(gitUrl))
  .then((latestTags) => {
    // TODO: Replace these three lines for Workbox-build when getModuleUrl()
    // will be exposed
    const buildPath = path.dirname(require.resolve('workbox-build'));
    const workboxBuild = require(path.join(buildPath, 'lib', 'cdn-utils.js'));
    const latestUrl = workboxBuild.getModuleURL('workbox-sw');
    const latestVersion = latestTags.latest.slice(1); // Omit leading "v".

    // Substring removes the 'v' at the front of the git tag.
    if (latestUrl.indexOf(latestTags.latest.substring(1)) === -1) {
      throw new Error(`The latest tag isn't in the module URL from ` +
        `workbox-build. This means the workbox-build version is out of date.`);
    }

    const toolsPath = path.join(
      __dirname, '..', '..', 'src', 'content', 'en', 'tools'
    );

    const includeDir = path.join(toolsPath, 'workbox', '_shared');

    const versionPath = path.join(includeDir, 'workbox-latest-version.html');
    fs.outputFileSync(versionPath, latestVersion);

    const cdnUrlPath = path.join(includeDir, 'workbox-sw-cdn-url.html');
    fs.outputFileSync(cdnUrlPath, latestUrl);
  });
});
