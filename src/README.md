# Google Web Fundamentals


## Prerequisites

- [Node.js with npm](http://nodejs.org)
- The [Grunt CLI](http://gruntjs.com/)
	* `npm install -g grunt-cli`
- RVM, Ruby and Bundler:
    * `curl -sSL https://get.rvm.io | bash`


## Installation

- Clone this repo
- Move to the `src` directory in your working copy
- Install dependencies: `npm install` and `bundle install`
- Install fontforge if required for grunt-webfont on your OS.  See [grunt-webfont installation instructions](https://github.com/sapegin/grunt-webfont/blob/master/Readme.md#installation) for details.


## Running the build

- Run the Jekyll build: `grunt`

### On Mac

- Due to the number of files in the project, you will likely need to increase the maximum number of open file handles.  Use `ulimit -n 1024` to increase the maximum number of open files to 1024 from the default of 256. 

## Change log

- (09/24/2014) NPM and Gem bundles updated, be sure to run `npm update` and `bundle install`
