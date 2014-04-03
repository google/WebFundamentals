/* To prevent jshint from yelling at module.exports. */
/* jshint node:true */

'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function(connect, dir) {
	return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {

	// Loads all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	require('time-grunt')(grunt);

	// App configuration
	var config = grunt.file.readYAML('site/_config-grunt.yml');

	// Tasks configuration
	grunt.initConfig({

		config: config,

		clean: {
			destination: {
				files: [{
					dot: true,
					src: [
						'<%= config.destination %>/*',
						'!<%= config.destination %>/.git*'
					]
				}]
			},
			tidyup: {
				files: [{
					dot: true,
					src: [
						'<%= config.destination %>/_vendors',
						'<%= config.destination %>/_scripts',
						'<%= config.destination %>/css/styles.css'
					]
				}]
			}
		},

		compass: {
			options: {
				sassDir: '<%= config.source %>/_sass',
				imagesDir: '<%= config.source %>/imgs',
				cssDir: '<%= config.destination %>/css',
				force: true
			},
			uncompressed: {
				options: {
					outputStyle: 'expanded'
				}
			},
			compressed: {
				options: {
					outputStyle: 'compressed'
				}
			}
		},

		// This task is pre-configured by useminPrepare,
		// using the usemin blocks inside index.html.
		//
		// concat: {},

		connect: {
			options: {
				hostname: 'localhost',
				port: config.port
			},
			'destination-source': {
				options: {
					middleware: function(connect) {
						return [
							lrSnippet,
							// serves from destination first
							mountFolder(connect, config.destination),
							// falls back to source if not found in destination
							mountFolder(connect, config.source)
						];
					}
				}
			},
			destination: {
				options: {
					middleware: function(connect) {
						return [
							mountFolder(connect, config.destination)
						];
					}
				}
			}
		},

		csslint: {
			options: {
				csslintrc: '.csslintrc'
			},
			lax: {
				src: '<%= config.destination %>/css/*.css',
				options: {
					import: false
				}
			},
			strict: {
				src: '<%= config.destination %>/css/*.css',
				options: {
					import: 2
				}
			}
		},

		// This task is pre-configured by useminPrepare,
		// using the usemin blocks inside index.html.
		//
		cssmin: {
			options: {
				keepSpecialComments: 0
			}
		},

		htmlmin: {
			all: {
				options: {
					removeCommentsFromCDATA: true,
					// https://github.com/yeoman/grunt-usemin/issues/44
					collapseWhitespace: true,
					collapseBooleanAttributes: true,
					// removeAttributeQuotes: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: '<%= config.destination %>',
					src: ['**/*.html'],
					dest: '<%= config.destination %>'
				}]
			}
		},

		jekyll: {
			destination: {
				config: 'site/_config-grunt.yml'
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			source: [
				'Gruntfile.js',
				'<%= config.source %>/**/*.js',
				'!<%= config.source %>/vendors/**/*.js'
			]
		},

		open: {
			index: {
				path: 'http://localhost:<%=config.port%>'
			}
		},

		shell: {
			options: {
				failOnError: true,
				stdout: true,
				stderr: true
			}
		},

		// This task is pre-configured by useminPrepare,
		// using the usemin blocks inside index.html.
		//
		// uglify: {
		//   build: {}
		// },

		useminPrepare: {
			html: '<%= config.destination %>/index.html',
			options: {
				dest: '<%= config.destination %>'
			}
		},

		usemin: {
			html: ['<%= config.destination %>/**/*.html'],
			options: {
				dirs: ['<%= config.destination %>']
			}
		},

		watch: {
			// When styles change, recompile them
			styles: {
				files: ['<%= config.source %>/_sass/**/*.scss'],
				tasks: ['compass:uncompressed']
			},

			// when scripts change, lint them and run unit tests
			scripts: {
				files: ['<%= config.source %>/**/*.js'],
				tasks: ['jshint:source']
			},

			// when jekyll source changes, recompile them
			jekyll: {
				files: [
					'<%= config.source %>/**/*.html',
					'<%= config.source %>/**/*.liquid',
					'<%= config.source %>/**/*.markdown',
					'<%= config.source %>/**/*.md'
				],
				tasks: ['jekyll:destination', 'compass:uncompressed']
			},

			// when served files change, reload them in the browser
			served: {
				options: {
					livereload: LIVERELOAD_PORT
				},
				files: [
					'<%= config.destination %>/**/*.html',	// view files (from jekyll)
					'<%= config.destination %>/css/*.css',	// css files (from sass)
					'<%= config.source %>/**/*.css',		// css files (raw)
					'<%= config.source %>/**/*.js'			// script files
				]
			}
		}

	});

	// Test task
	grunt.registerTask('test', 'Lints all javascript and CSS sources.\nOptions: --strict: enable strict linting mode', function(){

		var strict = grunt.option('strict');

		if(strict) {
			return grunt.task.run([
				'jshint:source'
				// 'csslint:strict'
			]);
		} else {
			return grunt.task.run([
				'jshint:source'
				// 'csslint:lax'
			]);
		}
	});

	// Build task
	grunt.registerTask('build', 'Runs the "test" tastk, then builds the website.\nOptions:\n  --uncompressed: avoids code compression (js,css,html)', function() {

		var uncompressed = grunt.option('uncompressed');

		if(uncompressed) {
			return grunt.task.run([
				'test',
				'clean:destination',
				'jekyll:destination',
				'compass:uncompressed',
				'useminPrepare',
				'concat',
				'usemin',
				// 'csslint:lax'
				'clean:tidyup'
			]);
		} else {
			return grunt.task.run([
				'test',
				'clean:destination',
				'jekyll:destination',
				'compass:compressed',
				'useminPrepare',
				'concat',
				'cssmin',
				'uglify',
				'usemin',
				'htmlmin:all',
				// 'csslint:lax'
				'clean:tidyup'
			]);
		}

	});

	grunt.registerTask('previewbuild', 'Use this task to preview the final build in your browser. \n  Note: Runs tests automatically before building and serving', function() {

		return grunt.task.run([
			'test',
			'build',
			'open:index',
			'connect:destination:keepalive'
		]);

	});

	// Serve task
	grunt.registerTask('serve', 'Runs the "build" task, then serves the website locally.\nOptions:\n  --uncompressed: avoids code compression (js,css,html)', function() {

		return grunt.task.run([
			'build',
			'open:index',
			'connect:destination:keepalive'
		]);

	});

	// Develop task
	grunt.registerTask('develop', 'The default task for developers.\nRuns the tests, builds the minimum required, serves the content (source and destination) and watches for changes.', function() {

		return grunt.task.run([
			'clean:destination',
			'jekyll:destination',
			'clean:tidyup',
			'compass:uncompressed',
			'open:index',
			'connect:destination-source',
			'watch'
		]);

	});

	// Default task
	grunt.registerTask('default', 'develop');

};
