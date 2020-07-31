/**
 * @fileoverview Build Workbox JSDocs.
 *
 * @author Matt Gaunt <gauntface@google.com>
 */
'use strict';

const fs = require('fs-extra');
const gulp = require('gulp');
const path = require('path');
const buildJSDocs = require('../reference-docs/build-js-docs');

// This will update the CDN and build the reference docs for the passed
// `srcPath` and `outputDir` options.
// `outputDir` defaults to `latest`, but can be used to build any doc set
// assuming your local `srcPath` repo has that version checked out.
gulp.task('workbox', [
    'workbox-generate-includes',
    'workbox-no-index',
  ], async () => {
  const toolsPath =
      path.join(__dirname, '..', '..', 'src', 'content', 'en', 'tools');

  const docsPath = path.join(toolsPath, 'workbox', 'reference-docs');
  const jsdocConfPath = path.join(toolsPath, 'workbox', '_jsdoc.conf');

  const {srcPath, outputDir = 'latest'} = global.WF.options;
  if (!srcPath) {
    throw new Error(
        `You must pass option '--srcPath' when using 'gulp workbox'`);
  }
  if (!fs.existsSync(srcPath)) {
    throw new Error(`srcPath '${srcPath}' does not exist.`);
  }

  const {version} = fs.readJsonSync(path.resolve(srcPath, 'lerna.json'));
  const outputPath = path.join(docsPath, outputDir);

  await buildJSDocs(version, srcPath, outputPath, jsdocConfPath);
});
