'use strict';

/*
    wfRegEx.js
    Standardized list of RegEx's used across the building of WebFundamentals
 */

var RE_BOOK_PATH = /^book_path: (.*)\n/m;
var RE_PROJECT_PATH = /^project_path: (.*)\n/m;
var RE_DESCRIPTION = /^description:\s?(.*)\n/m;

var RE_REGION = /^{#\s?wf_region:\s?(.*?)\s?#}\s?\n/m;
var RE_VERTICAL = /^{#\s?wf_vertical:\s?(.*?)\s?#}\s?\n/m;
var RE_FEATURED_DATE = /^{#\s?wf_featured_date:\s?(.*?)\s?#}\s?\n/m;

var RE_UPDATED = /^{#\s?wf_updated_on:\s?(.*?)\s?#}\s?\n/m;
var RE_PUBLISHED = /^{#\s?wf_published_on:\s?(.*?)\s?#}\s?\n/m;

var RE_IMAGE = /^{#\s?wf_featured_image:\s?(.*?)\s?#}\s?\n/m;
var RE_IMAGE_SQUARE = /^{#\s?wf_featured_image_square:\s?(.*?)\s?#}\s?\n/m;
var RE_BLINK_COMPONENTS = /^{#\s?wf_blink_components:\s?(.*?)\s?#}\s?\n/m;
var RE_TAGS = /^{#\s?wf_tags:\s?(.*?)\s?#}\s?\n/m;
var RE_SNIPPET = /^{#\s?wf_featured_snippet:\s?(.*?)\s?#}\s?\n/m;

var RE_TITLE = /^# (.*) {: \.page-title\s?}/m;
var RE_TITLE_CLASS = /{:\s?\.page-title\s?}/gm;

var RE_AUTHOR_LIST = /^{%\s?include "web\/_shared\/contributors\/(.*?)\.html"\s?%}\s?\n/gm;
var RE_AUTHOR_KEY = /\/contributors\/(.*)\.html"/;

var RE_PODCAST = /^{#\s?wf_podcast_audio: (.*?) #}\s?\n/m;
var RE_PODCAST_DURATION = /^{#\s?wf_podcast_duration: (.*?)\s?#}\s?\n/m;
var RE_PODCAST_SUBTITLE = /^{#\s?wf_podcast_subtitle: (.*?)\s?#}\s?\n/m;
var RE_PODCAST_SIZE = /^{#\s?wf_podcast_fileSize: (.*?)\s?#}\s?\n/m;

var RE_INCLUDE_MD = /^<<(.*?)>>/gm;
var RE_INCLUDE_FILE = /["|'](.*)["|']/;
var RE_INCLUDES = /^{%\s?include ["|'](.*)["|']\s?%}/gm;

const RE_INCLUDE_CODE = /{% includecode .*?%}/gm;
const RE_INCLUDE_CODE_PATH = /content_path=["']?(.*?)["' ]/;

var RE_SINGLE_LINE_COMMENT = /^{%\s?comment\s?%}.*{%\s?endcomment\s?%}$/gm;

var RE_MD_INCLUDE = /^{#\s?wf_md_include\s?#}/m;
var RE_AUTO_GENERATED = /^{#\s?wf_auto_generated\s?#}/m;
var RE_DEVSITE_TRANSLATION = /^{# wf_devsite_translation #}/m;


function getMatch(regEx, content, defaultResponse) {
  var result = content.match(regEx);
  if (result && result[1]) {
    return result[1];
  }
  return defaultResponse;
}

function getMatches(regEx, content) {
  let results = [];
  let myArray;
  while((myArray = regEx.exec(content)) !== null) {
    results.push(myArray);
  }
  return results;
}

exports.getMatch = getMatch;
exports.getMatches = getMatches;
exports.RE_BOOK_PATH = RE_BOOK_PATH;
exports.RE_PROJECT_PATH = RE_PROJECT_PATH;
exports.RE_UPDATED_ON = RE_UPDATED;
exports.RE_PUBLISHED_ON = RE_PUBLISHED;
exports.RE_DESCRIPTION = RE_DESCRIPTION;
exports.RE_BLINK_COMPONENTS = RE_BLINK_COMPONENTS;
exports.RE_REGION = RE_REGION;
exports.RE_VERTICAL = RE_VERTICAL;
exports.RE_FEATURED_DATE = RE_FEATURED_DATE;
exports.RE_TITLE = RE_TITLE;
exports.RE_TITLE_CLASS = RE_TITLE_CLASS;
exports.RE_TAGS = RE_TAGS;
exports.RE_IMAGE = RE_IMAGE;
exports.RE_IMAGE_SQUARE = RE_IMAGE_SQUARE;
exports.RE_SNIPPET = RE_SNIPPET;
exports.RE_AUTHOR_LIST = RE_AUTHOR_LIST;
exports.RE_AUTHOR_KEY = RE_AUTHOR_KEY;
exports.RE_PODCAST = RE_PODCAST;
exports.RE_PODCAST_DURATION = RE_PODCAST_DURATION;
exports.RE_PODCAST_SUBTITLE = RE_PODCAST_SUBTITLE;
exports.RE_PODCAST_SIZE = RE_PODCAST_SIZE;
exports.RE_MD_INCLUDE = RE_MD_INCLUDE;
exports.RE_INCLUDES = RE_INCLUDES;
exports.RE_INCLUDE_MD = RE_INCLUDE_MD;
exports.RE_INCLUDE_FILE = RE_INCLUDE_FILE;
exports.RE_INCLUDE_CODE = RE_INCLUDE_CODE;
exports.RE_INCLUDE_CODE_PATH = RE_INCLUDE_CODE_PATH;
exports.RE_SINGLE_LINE_COMMENT = RE_SINGLE_LINE_COMMENT;
exports.RE_AUTO_GENERATED = RE_AUTO_GENERATED;
exports.RE_DEVSITE_TRANSLATION = RE_DEVSITE_TRANSLATION;
