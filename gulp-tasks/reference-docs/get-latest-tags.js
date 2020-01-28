/**
 * @fileoverview Gets all tags for a Git repo.
 *
 * @author Matt Gaunt <gauntface@google.com>
 */
'use strict';

const remoteGitTags = require('remote-git-tags');
const semver = require('semver');


let remoteTags = null;


/**
 * Gets the latest tags for each major version of a git repo. The object
 * returned will also include keys for `latest` as well as `prerelease`,
 * if applicable.
 *
 * @param {string} gitUrl URL of the git repo you want to get tags for.
 * @param {number} [oldestMajorVersion=1] The oldest major version to include.
 * @return {Promise<Object>}
 */
const getLatestTags = async (gitUrl, oldestMajorVersion = 1) => {
  const latestTagsMap = {};

  // Don't fetch the tag map if we've already fetched it.
  if (!remoteTags) {
    remoteTags = await remoteGitTags(gitUrl);
  }

  const sortedTags = [...remoteTags.keys()].sort(semver.rcompare);
  for (const tag of sortedTags) {
    // Set the latest prerelease.
    if (semver.prerelease(tag) !== null) {
      // Only add the most recent prerelease.
      if (!latestTagsMap.prerelease) {
        latestTagsMap.prerelease = tag;
      }
      continue;
    }

    // Set the latest stable version (note: running the above conditional
    // first ensures a prerelease isn't tagged as latest).
    if (!latestTagsMap.latest) {
      latestTagsMap.latest = tag;
    }

    // Set the latest of each major version (>= version 2).
    const majorVersion = semver.major(tag);
    const majorVersionTag = `v${majorVersion}`;
    if (!latestTagsMap[majorVersionTag] &&
        majorVersion >= oldestMajorVersion) {
      latestTagsMap[majorVersionTag] = tag;
    }
  }
  return latestTagsMap;
};

module.exports = {getLatestTags};
