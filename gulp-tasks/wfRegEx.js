'use strict';

/*
    wfRegEx.js
    Standardized list of RegEx's used across the building of WebFundamentals
 */

var RE_BOOK_PATH = /^book_path: (.*)\n/m;
var RE_PROJECT_PATH = /^project_path: (.*)\n/m;
var RE_DESCRIPTION = /^description:(.*)\n/m;

var RE_UPDATED = /^{#\s?wf_updated_on: (.*?)\s?#}\s?\n/m;
var RE_PUBLISHED = /^{#\s?wf_published_on: (.*?)\s?#}\s?\n/m;

var RE_IMAGE = /^{#\s?wf_featured_image: (.*?)\s?#}\s?\n/m;
var RE_TAGS = /^{#\s?wf_tags: (.*?)\s?#}\s?\n/m;
var RE_SNIPPET = /^{#\s?wf_featured_snippet: (.*?)\s?#}\s?\n/m;

var RE_TITLE = /^# (.*) {: \.page-title\s?}/m;

var RE_AUTHOR_LIST = /^{%\s?include "web\/_shared\/contributors\/.*?\.html"\s?%}\s?\n/gm;
var RE_AUTHOR_KEY = /\/contributors\/(.*)\.html"/;

var RE_PODCAST = /^{#\s?wf_podcast_audio: (.*?) #}\s?\n/m;
var RE_PODCAST_DURATION = /^{#\s?wf_podcast_duration: (.*?)\s?#}\s?\n/m;
var RE_PODCAST_SUBTITLE = /^{#\s?wf_podcast_subtitle: (.*?)\s?#}\s?\n/m;
var RE_PODCAST_SIZE = /^{#\s?wf_podcast_fileSize: (.*?)\s?#}\s?\n/m;

var RE_INCLUDE_FILE = /["|'](.*)["|']/;
var RE_INCLUDES = /^{%\s?include .*\s?%}/gm;

var RE_MD_INCLUDE = /^{#\s?wf_md_include\s?#}/m;


function getMatch(regEx, content, defaultResponse) {
  var result = content.match(regEx);
  if (result && result[1]) {
    return result[1];
  }
  return defaultResponse;
}

exports.getMatch = getMatch;
exports.RE_BOOK_PATH = RE_BOOK_PATH;
exports.RE_PROJECT_PATH = RE_PROJECT_PATH;
exports.RE_UPDATED_ON = RE_UPDATED;
exports.RE_PUBLISHED_ON = RE_PUBLISHED;
exports.RE_DESCRIPTION = RE_DESCRIPTION;
exports.RE_TITLE = RE_TITLE;
exports.RE_TAGS = RE_TAGS;
exports.RE_IMAGE = RE_IMAGE;
exports.RE_SNIPPET = RE_SNIPPET;
exports.RE_AUTHOR_LIST = RE_AUTHOR_LIST;
exports.RE_AUTHOR_KEY = RE_AUTHOR_KEY;
exports.RE_PODCAST = RE_PODCAST;
exports.RE_PODCAST_DURATION = RE_PODCAST_DURATION;
exports.RE_PODCAST_SUBTITLE = RE_PODCAST_SUBTITLE;
exports.RE_PODCAST_SIZE = RE_PODCAST_SIZE;
exports.RE_MD_INCLUDE = RE_MD_INCLUDE;
exports.RE_INCLUDES = RE_INCLUDES;
exports.RE_INCLUDE_FILE = RE_INCLUDE_FILE;

