/**
 * @fileoverview Build Workbox JSDocs.
 *
 * @author Matt Gaunt <gauntface@google.com>
 */
'use strict';

const gulp = require('gulp');
const path = require('path');

const buildReferenceDocs = require('../reference-docs/build-reference-docs');

// This will generate contributors, update the CDN and build the
// latest reference docs
gulp.task('workbox', [
    'workbox-generate-contributors',
    'workbox-generate-cdn-include-v3',
  ], () => {
  const GIT_URL = 'https://github.com/GoogleChrome/workbox.git';
  const toolsPath = path.join(
    __dirname, '..', '..', 'src', 'content', 'en', 'tools'
  );
  const docPath = path.join(toolsPath, 'workbox', 'reference-docs');
  const jsdocConfPath = path.join(toolsPath, 'workbox', '_jsdoc.conf');

  return buildReferenceDocs(
    GIT_URL,
    docPath,
    jsdocConfPath
  );
});
