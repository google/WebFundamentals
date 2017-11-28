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

gulp.task('workbox-reference-docs-v3', ['workbox-generate-contributors'],
  async () => {
  const gitUrl = 'https://github.com/GoogleChrome/workbox.git';
  const toolsPath = path.join(
    __dirname, '..', '..', 'src', 'content', 'en', 'tools'
  );
  const docPath = path.join(toolsPath, 'workbox', 'v3', 'reference-docs');
  const jsdocConfPath = path.join(toolsPath, 'workbox', 'v3', '_jsdoc.conf');

  // Get all of the latest tags from Github
  const latestTags = await getLatestTags(gitUrl, {
    includePrerelease: true,
  });
  // Filter the list down to tags that need to be built
  const tagsToBuild = await filterTagsToBuild(latestTags, docPath);

  for (const tag of tagsToBuild) {
    const tmpSrCodePath = path.join(os.tmpdir(), Date.now().toString(), tag);
    await getSourceCode(gitUrl, tag, tmpSrCodePath);

    const taggedOutputPath = path.join(docPath, tag);
    await buildJSDocs(tmpSrCodePath, taggedOutputPath, jsdocConfPath);

    if (tag === latestTags[0]) {
      const latestOutputPath = path.join(docPath, 'latest');
      await fs.remove(latestOutputPath);
      await buildJSDocs(tmpSrCodePath, latestOutputPath, jsdocConfPath);
    }
  }
});
