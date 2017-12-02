/**
 * @fileoverview Gets all tags for a Git repo.
 *
 * @author Matt Gaunt <gauntface@google.com>
 */
'use strict';

const remoteGitTags = require('remote-git-tags');
const semver = require('semver');

/**
 * Get the latest tags for a git repo.
 *
 * @param {string} gitUrl URL of the git repo you want to get tags for.
 * @param {number} [numberOfReleases=1] Number of releases to build if missing.
 * @param {string} tagType (This should be 'stable' or 'prerelease')
 * @return {Promise<Array<string>>}
 */
const getAllTags = (gitUrl, numberOfReleases, tagType) => {
  numberOfReleases = numberOfReleases || 1;

  return remoteGitTags(gitUrl)
  .then((gitTagsMap) => Array.from(gitTagsMap.keys()))
  .then((allTags) => {
    switch (tagType) {
      case 'stable':
        return allTags.filter((tag) => {
          // If the tag is *not* a prerelease, it'll return non-null and we will
          // include it in the generated docs.
          return (semver.prerelease(tag) === null);
        });
      case 'prerelease':
        return allTags.filter((tag) => {
          // If the tag *is* a prerelease, it'll return non-null and we will
          // include it in the generated docs.
          return (semver.prerelease(tag) !== null);
        });
      default:
        throw new Error(`Unexpected tag type: ${tagType}`);
    }
  })
  .then((allGitTags) => {
    allGitTags.sort(semver.rcompare);
    return allGitTags.splice(0, numberOfReleases);
  });
};

module.exports = {
  stable: (gitUrl, numberOfReleases) => {
    return getAllTags(gitUrl, numberOfReleases, 'stable');
  },
  prerelease: (gitUrl, numberOfReleases) => {
    return getAllTags(gitUrl, numberOfReleases, 'prerelease');
  },
};
