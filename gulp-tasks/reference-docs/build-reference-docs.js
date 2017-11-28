'use strict';

const path = require('path');
const os = require('os');
const fs = require('fs-extra');

const getLatestTags = require('./get-latest-tags');
const filterTagsToBuild = require('./filter-tags-to-build');
const getSourceCode = require('./get-source-code');
const buildJSDocs = require('./build-js-docs');

const buildReferenceDocs = async (gitUrl, docPath, jsdocConfPath) => {
  // Get all of the latest tags from Github
  const latestTags = await getLatestTags(gitUrl);
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
};

module.exports = buildReferenceDocs;
