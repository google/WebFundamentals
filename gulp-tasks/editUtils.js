'use strict';

var gutil = require('gulp-util');
var wfHelper = require('./wfHelper');

var UPPERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`';
var LOWERS = 'abcdefghijklmnopqrstuvwxyz0123456789`';
var LC_WORDS = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'from',
                'in', 'into', 'near', 'nor', 'of', 'on', 'onto', 'or', 'the', 'to', 'with'];
var UC_WORDS = ['API', 'DR', 'FAQ', 'FCM', 'HTTP', 'HTTPS', 'I', 'ID', 'TL', 'UI', 'VAPID'];
// ToDo: Replace with external json file.
var PROPER_NOUNS = ['Application panel', 'Canary', 'Chrome', 'DevTools', 'Foreign Fetch', 'IndexedDB', 'MessageChannel','MediaStream', 'Origin Trial', 'PaymentRequest', 'Payment Request API', 'Resources panel', 'RTCCertificate', 'SharedWorkers', 'Web Animations', 'Web Push Protocol'];

function isCodeSample(chunk) {
	if (chunk == "    # Writing an Article {: .page-title }") {
		// gutil.log("[IN ISCODESAMP]", chunk);
	}
 	var reIndent = /( {4}).+/g;
	var lines = (chunk.match(/\n/g)||['']).length;

	// var indents = chunk.match(reIndent).length;
	var matches = chunk.match(reIndent);
	var indents;
	if (matches) {
		indents = matches.length;
	} else {
		indents = 0;
	}
	// gutil.log(lines == indents);
	return (lines == indents);
}

function isTitleCase(title) {
	// gutil.log("[ISTITLE] ", title)
	title = title.trim();
	var words = title.split(' ');
	var retVal = true;
	words.forEach(function(val, index, array) {
		if (UPPERS.indexOf(val.charAt(0)) < 0) {
			if (LC_WORDS.indexOf(val.toLowerCase()) < 0) {
				retVal = false;
				return;
			}
		}
	});
	return retVal;
}

function isSentenceCase(title) {
	title = title.trim();
	PROPER_NOUNS.forEach(function(noun, index, array) {
		if (title.indexOf(noun) >= 0) {
			var newNoun = noun.replace(' ', '_');
			if (title.indexOf(noun) > 0) {
				newNoun = newNoun.toLowerCase();
			}
			title = title.replace(noun, newNoun)
		}
	});
	var words = title.split(' ');
	var retVal = true;
	words.forEach(function(val, index, array) {
		if (index == 0) {
			if (UPPERS.indexOf(val.charAt(0)) < 0) {
				retVal = false;
				return;
			}
		} else {
			if ((LOWERS.indexOf(val.charAt(0)) < 0) && 
				(UC_WORDS.indexOf(val.toUpperCase()) < 0) &&
				(val.indexOf('.') < 0)) {
				retVal = false;
				return;
			}
		}
	});
	return retVal;
}

exports.isTitleCase = isTitleCase;
exports.isSentenceCase = isSentenceCase;
exports.isCodeSample = isCodeSample;