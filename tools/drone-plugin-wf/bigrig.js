/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';
var fs = require('fs');
var request = require('request');
var https = require('https');
var WebPageTest = require('webpagetest');

var argv = require('yargs').argv;
argv.config = argv.config || 'bigrig-config.json';
var config = JSON.parse(fs.readFileSync(argv.config, 'utf8'));
config.baseURL = argv.baseUrl || '';
config.commitURL = argv.commitUrl;
config.wptApiKey = process.env.WPT_API_KEY;
config.rigHost = process.env.RIG_URL;
config.rigSecret = process.env.RIG_SECRET;

if (typeof config.wptApiKey === 'undefined') {
  console.error ('No WebPagetest API key provided');
  process.exit(1);
}

if (typeof config.tasks === 'undefined' || config.tasks.length === 0) {
  console.error ('No tasks provided');
  process.exit(1);
}

if (typeof config.rigHost === 'undefined') {
  console.error ('No Rig host provided');
  process.exit(1);
}

if (typeof config.rigSecret === 'undefined') {
  console.error ('No Rig secret provided');
  process.exit(1);
}

var wpt = new WebPageTest('www.webpagetest.org', config.wptApiKey);
var wptRequestOptionsBase = {
  private: true,
  location: 'Dulles:Chrome',
  pollResults: 5,
  timeout: 240,
  timeline: true,
  timelineCallStack: true,
  video: true
}

var timelineRequestBase = {
  host: 'www.webpagetest.org',
  port: 443
}

var tasks = Object.keys(config.tasks);

for (var t = 0; t < tasks.length; t++) {
  var currentTask = config.tasks[tasks[t]];
  console.log("Running test for: " + tasks[t]);

  // Set up the run for this task.
  var wptRequestOptions = JSON.parse(JSON.stringify(wptRequestOptionsBase));

  if (typeof currentTask.location !== 'undefined')
    wptRequestOptions.location = currentTask.location;

  if (typeof currentTask.connectivity !== 'undefined')
    wptRequestOptions.connectivity = currentTask.connectivity;

  wpt.runTest(config.baseURL + currentTask.url, wptRequestOptions,
      onWebPageTestResult.bind(currentTask));
}

function onWebPageTestResult (err, data) {

  if (err) {
    console.error(err);
    process.exit(1);
  }

  // Get the test results.
  var results = data.data;
  var id = results.id;
  var firstView = data.data.runs['1'].firstView;
  var speedIndex = firstView.SpeedIndex;

  console.log('Test ID: ' + id);

  if (!this.results) {
    this.results = {
      "speedIndex": speedIndex,
      "completed": results.completed,
      "commit": process.env.TRAVIS_COMMIT,
      "id": id
    };
  }

  // Set up the secret
  this.secret = config.rigSecret;

  // Request the timeline data. Clone the timeline request, which feels ick.
  // Why don't we have proper Object.clone yet? I dunno.
  var timelineRequest = JSON.parse(JSON.stringify(timelineRequestBase));
  timelineRequest.path = '/getTimeline.php?test=' +
      results.id + '&run=1&cached=0';

  https.get(timelineRequest, onTimelineData.bind(this));
}

function onTimelineData (timelineRequestRes) {

  this.results.timelineData = '';

  timelineRequestRes.setEncoding('utf8');
  timelineRequestRes.on('data', function(chunk) {
    this.results.timelineData += chunk;
  }.bind(this));

  timelineRequestRes.on('end', onTimelineDataComplete.bind(this));
}

function onTimelineDataComplete () {

  var uploadRequest = {
    host: config.rigHost,
    port: 443,
    path: '/action/import?secret=' + encodeURIComponent(this.secret)
  }

  https.get(uploadRequest, onUploadRequest.bind(this));

}

function onUploadRequest (uploadRequestRes) {

  this.uploadURLInfo = '';

  uploadRequestRes.setEncoding('utf8');
  uploadRequestRes.on('data', function(chunk) {
    this.uploadURLInfo += chunk;
  }.bind(this));

  uploadRequestRes.on('end', onUploadRequestComplete.bind(this));
}

function onUploadRequestComplete () {

  var uploadURLData = JSON.parse(this.uploadURLInfo);

  if (uploadURLData.status.indexOf('http') === 0) {

    // We are a go.
    var submissionData = {
      "secret": this.secret,
      "labels": this.labels.split(','),
      "datetime": (new Date(this.results.completed * 1000).toUTCString()),
      "webpagetest-id": this.results.id
    }

    if (typeof this.results.speedIndex !== 'undefined')
      submissionData["speed-index"] = this.results.speedIndex.toString();

    if (config.commitURL) {
      submissionData["commit"] = config.commitURL;
    }

    var formData = {
      "data": JSON.stringify(submissionData),
      "custom_file": {
        value: this.results.timelineData,
        options: {
          filename: 'wpt-trace-' + this.results.completed + '.json',
          contentType: 'application/json'
        }
      }
    }

    request.post({
      url: uploadURLData.status,
      formData: formData
    }, function (err, httpResponse, body) {

      if (err) {
        console.error(err);
        process.exit(1);
      }

      try {
        bigrigResponse = JSON.parse(body);
      } catch (e) {
        console.error(e);
        process.exit(1);
      }

      if (bigrigResponse.status !== 'ok') {
        console.error(bigrigResponse.status)
        process.exit(1);
      }
    })
  }
}
