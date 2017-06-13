project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: "Testing on Headless Chrome with Karma/Mocha/Chai"

{# wf_updated_on: 2017-06-13 #}
{# wf_published_on: 2017-06-13 #}

{# wf_tags: headless,testing,karma,mocha,chai #}
{# wf_featured_image: /web/updates/images/generic/headless-chrome.png #}
{# wf_featured_snippet: How to setup Karma, Mocha, and Chai to run automated tests on Headless Chrome. #}

# Testing on Headless Chrome with Karma/Mocha/Chai {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}

Karma, Mocha, Chai, Headless Chrome, oh my!

If you want to run automated tests using Headless Chrome, look no further! This article will get you
all setup using Karma as a runner and Mocha/Chai for authoring tests.

**What are these things?**

[Karma](https://karma-runner.github.io) is a testing harness that works with
any of the the most popular testing frameworks ([Jasmine](https://jasmine.github.io/), [Mocha](https://mochajs.org/), [QUnit](https://qunitjs.com/)).

[Chai](http://chaijs.com/) is an assertion library that works with Node and in the browser.
We need the latter.

[Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome) is a way to run the Chrome browser in a headless environment without the full browser UI. It's perfect for CI environment and automated testing.

## Setup

### Installation

Install Karma, the relevant, plugins, and the test runners using **yarn**:

    yarn add --dev karma karma-chrome-launcher karma-mocha karma-chai
    yarn add --dev mocha chai

or use **npm**:

    npm i --save-dev karma karma-chrome-launcher karma-mocha karma-chai
    npm i --save-dev mocha chai

I'm using [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/) in this post, but
if you're not a fan, choose your favorite assertion library that works in the browser.


### Configure Karma

Create a `karma.config.js` file that uses the `ChromeHeadless` launcher.

**karma.conf.js**

```javascript
module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: ['test/**/*.js'],
    reporters: ['progress'],
    port: 9876,  // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['Chrome', 'ChromeHeadless'],
    autoWatch: false,
    // singleRun: false, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity
  })
}
```

Note: Run `./node_modules/karma/bin/ init karma.conf.js` to generate the Karma configuration file.

## Write a test

Create a test in `/test/test.js`.

**/test/test.js**

```javascript
describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
```

## Run your tests

Add a `test` script in `package.json` that runs Karma with our settings.

**package.json**

```json
"scripts": {
  "test": "karma start --single-run --browsers ChromeHeadless karma.conf.js"
}
```

When you run your tests (`yarn test`), you should Headless Chrome fire up and output
the results to the terminal:

<img width="914" alt="Output from Karma" src="https://user-images.githubusercontent.com/238208/27096498-1fd639c6-5026-11e7-9fec-58bc897d1e10.png">

## Creating your own Headless Chrome launcher

The `ChromeHeadless` launcher is great because it works out of the box for
testing on Headless Chrome. It includes the appropriate Chrome flags for you and
launches a remote debugging version of Chrome on port `9222`.

However, sometimes you may want to pass custom flags to Chrome or change the
remote debugging port the launcher uses. To do that, create a `customLaunchers`
field that extends the base `ChromeHeadless` launcher:

**karma.conf.js**

```javascript
module.exports = function(config) {
  ...

  config.set({
    browsers: ['Chrome', 'ChromeHeadless', 'MyHeadlessChrome'],

    customLaunchers: {
      MyHeadlessChrome: {
        base: 'ChromeHeadless',
        flags: ['--disable-translate', '--disable-extensions', '--remote-debugging-port=9223']
      }
    },
  }
};
```

## Running it all on Travis CI

Configuring Karma to run your tests in Headless Chrome is the hard part.
Continuous integration in Travis is just a few lines away!

To run your tests in Travis, use `dist: trusty` and install the Chrome stable addon:

**.travis.yml**

```yaml
language: node_js
node_js:
  - "7"
dist: trusty # needs Ubuntu Trusty
sudo: false  # no need for virtualization.
addons:
  chrome: stable # have Travis install chrome stable.
cache:
  yarn: true
  directories:
    - node_modules
install:
  - yarn
script:
  - yarn test
```

Note: check out the [example repo](https://github.com/ebidel/headless-karma-travis) for reference.

<br>

{% include "comment-widget.html" %}
