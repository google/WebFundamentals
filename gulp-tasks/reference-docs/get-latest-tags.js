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
 * @param {string} gitUrl URL of the git repo you want to get tags for
 * @param {Object} options
 * @param {number} [options.numberOfReleases=1] Latest release.
 * @param {boolean} [options.includePrerelease=false] Include prerelease
 * versions.
 * @return {Promise<Array<string>>}
 */
const getLatestTags = (gitUrl, options) => {
  options = options || {};
  const numberOfReleases = options.numberOfReleases || 1;
  const includePrerelease = options.includePrerelease || false;

  return remoteGitTags(gitUrl)
  .then((gitTagsMap) => Array.from(gitTagsMap.keys()))
  .then((allGitTags) => {
    if (includePrerelease) {
      return allGitTags;
    }

    return allGitTags.filter((tag) => {
      // If the tag is *not* a prerelease, it'll return null and we will
      // include it in the generated docs.
      return (semver.prerelease(tag) === null);
    });
  })
  .then((allGitTags) => {
    allGitTags.sort(semver.rcompare);
    return allGitTags.splice(0, numberOfReleases);
  });
};

module.exports = getLatestTags;
