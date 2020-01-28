/**
 * @fileoverview Helper function that gets all tags, filters out
 * built tags, downloads the remaining tags from git and then builds the
 * JSDocs for that tag.
 *
 * @author Matt Gaunt <gauntface@google.com>
 */
'use strict';

const path = require('path');
const os = require('os');
const fs = require('fs-extra');
const semver = require('semver');

const {getLatestTags} = require('./get-latest-tags');
const getSourceCode = require('./get-source-code');
const buildJSDocs = require('./build-js-docs');


/**
 * Given a set of tags - Loop through each one and build the docs if needed.
 *
 * @param {Object} latestTags And object mapping folder names to release tags.
 *     The object keys will be major verions (e.g. `v4`) or either `latest`
 *     or `prerelease`.
 * @param {string} gitUrl The URL of the Git repo to get tags from.
 * @param {string} docPath The path to write the docs to.
 * @param {string} jsdocConfPath The path to the JSDoc config file.
 */
const buildReferenceDocsForTags = async (
    latestTags, gitUrl, docPath, jsdocConfPath) => {
  for (const [folder, tag] of Object.entries(latestTags)) {
    const taggedOutputPath = path.join(docPath, folder);

    // If this tag is for an older version, and a folder for that version
    // already exists on the file system. Assume it doesn't need to be rebuilt.
    // NOTE: if you need to rebuild the docs for some reason, you can do
    // so by deleting the folder before running this command.
    if (semver.lt(tag, latestTags.latest) &&
        await fs.pathExists(taggedOutputPath)) {
      continue;
    }

    const tmpSrCodePath = path.join(os.tmpdir(), Date.now().toString(), tag);
    await getSourceCode(gitUrl, tag, tmpSrCodePath);
    await buildJSDocs(tag, tmpSrCodePath, taggedOutputPath, jsdocConfPath);
  }
};

/**
 * Build the reference docs for a project.
 *
 * @param {string} gitUrl The Github URL.
 * @param {string} docPath Path to place the documentation files (i.e. built
 * JSDocs)
 * @param {string} jsdocConfPath Path to the JSDoc config path/
 */
const buildReferenceDocs = async (gitUrl, docPath, jsdocConfPath) => {
  const latestTags = await getLatestTags(gitUrl);

  await buildReferenceDocsForTags(
      latestTags, gitUrl, docPath, jsdocConfPath, 'latest');
};

module.exports = buildReferenceDocs;
