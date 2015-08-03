var config = require('./config');

config.rigUrl = process.env.RIG_URL;
config.apiKey = process.env.WPT_API_KEY;
config.secret = process.env.SECRET;

if (typeof config.apiKey === 'undefined') {
  console.error ('No WebPagetest API key provided');
  process.exit(-1);
}

if (typeof config.tasks === 'undefined' || config.tasks.length === 0) {
  console.error ('No tasks provided');
  process.exit(-1);
}

if (typeof config.rigUrl === 'undefined') {
  console.error ('No Rig URL provided');
  process.exit(-1);
}

if (typeof config.secret === 'undefined') {
  console.error ('No secret provided');
  process.exit(-1);
}

var request = require('request');
var fs = require('fs');
var https = require('https');
var WebPageTest = require('webpagetest');
var wpt = new WebPageTest('www.webpagetest.org', config.apiKey);
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

  wpt.runTest(currentTask.url, wptRequestOptions,
      onWebPageTestResult.bind(currentTask));
}

function onWebPageTestResult (err, data) {

  if (err) {
    console.error(err);
    process.exit(-1);
  }

  // Get the test results.
  var results = data.data;
  var id = results.id;
  var firstView = data.data.runs['1'].firstView;
  var speedIndex = firstView.SpeedIndex;

  // console.log(this.labels, id);

  if (!this.results) {
    this.results = {
      "speedIndex": speedIndex,
      "completed": results.completed,
      "commit": process.env.TRAVIS_COMMIT
    };
  }

  // Set up the secret
  this.secret = process.env.SECRET;

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
    host: config.rigUrl,
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
      "datetime": (new Date(this.results.completed * 1000).toString())
    }

    if (typeof this.results.speedIndex !== 'undefined')
      submissionData["speed-index"] = this.results.speedIndex.toString();

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
        process.exit(-1);
      }

      try {
        bigrigResponse = JSON.parse(body);
      } catch (e) {
        console.error(e);
        process.exit(-1);
      }

      if (bigrigResponse.status !== 'ok') {
        console.error(bigrigResponse.status)
        process.exit(-1);
      }
    })
  }
}
