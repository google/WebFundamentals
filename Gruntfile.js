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
	var config = grunt.file.readYAML('config/local.yml');

	// Tasks configuration
	grunt.initConfig({

		config: config,

		clean: {
			build: {
				files: [{
					dot: true,
					src: ['src/appengine/build']
				}]
			},
			destination: {
				files: [{
					dot: true,
					src: [
						'<%= config.destination %>/*',
						'!<%= config.destination %>/.git*'
					]
				}]
			},
			icons: {
				files: [{
					dot: true,
					src: [
						'<%= config.source %>/icons/icons*.*'
					]
				}]
			}
		},

		compass: {
			options: {
				sassDir: '<%= config.source %>/_sass',
				imagesDir: '<%= config.source %>/imgs',
				cssDir: '<%= config.source %>/css',
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

		connect: {
			options: {
				hostname: '',
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

		copy: {
			optimisedjsToSrc: {
				src: '*.min.js',
				dest: '<%= config.source %>/js/',
				flatten: true,
				filter: 'isFile',
				expand: true,
				nonull: true,
				cwd: '<%= config.destination %>/js/'
			},
			optimisedcssToSrc: {
				src: '*.min.css',
				dest: '<%= config.source %>/css/',
				flatten: true,
				filter: 'isFile',
				expand: true,
				nonull: true,
				cwd: '<%= config.destination %>/css/'
			},
			jsToDest: {
				src: '*.js',
				dest: '<%= config.destination %>/js/',
				flatten: true,
				filter: 'isFile',
				expand: true,
				nonull: true,
				cwd: '<%= config.source %>/js/'
			},
			cssToDest: {
				src: '*.css',
				dest: '<%= config.destination %>/css/',
				flatten: true,
				filter: 'isFile',
				expand: true,
				nonull: true,
				cwd: '<%= config.source %>/css/'
			}
		},

		csslint: {
			options: {
				csslintrc: 'src/.csslintrc'
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

		cssmin: {
			css: {
				src: '<%= config.source %>/css/styles.css',
				dest: '<%= config.source %>/css/styles.min.css',
				options: {
					keepSpecialComments: 0
				}
			}
		},

		gae: {
			options: {
				path: 'src/appengine',
				auth: 'oauth2'
			},
			deploy: {
				action: 'update'
			},
			local: {
				action: 'run'
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

		imagemin: {
			normal: {
				options: {
					optimizationLevel: 7
				},
				files: [{
					expand: true,
					src: ['**/*.png']
				}]
			},
			o2: {
				options: {
					optimizationLevel: 2
				},
				files: [{
					expand: true,
					src: ['**/*.png']
				}]
			}
		},

		jekyll: {
			appengine: {
				options: {
					config: 'config/wsk-version.yml,config/appengine.yml'
				}
			},
			develop: {
				options: {
					config: 'config/wsk-version.yml,config/local.yml'
				}
			},
			devsite: {
				options: {
					config: 'config/wsk-version.yml,config/devsite.yml'
				}
			}

		},

		jshint: {
			options: {
				jshintrc: 'src/.jshintrc'
			},
			source: [
				'Gruntfile.js',
				'<%= config.source %>/**/js/**/*.js',
				'!<%= config.source %>/**/vendors/**/*.js',
				'!<%= config.source %>/**/*.min.js'
			]
		},

		open: {
			index: {
				path: 'http://localhost:<%=config.port%>/fundamentals'
			}
		},

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
				files: [
					'<%= config.source %>/_sass/**/*.scss',
					'<%= config.source %>/css/**/*.css',
					'!<%= config.source %>/css/**/*.min.css'
				],
				tasks: ['compass:uncompressed', 'cssmin', 'copy:cssToDest']
			},

			// when scripts change, lint them and copy to destination
			scripts: {
				files: ['<%= config.source %>/**/*.js'],
				tasks: ['jshint:source', 'copy:jsToDest']
			},

			// when jekyll source changes, recompile them
			jekyll: {
				files: [
					'<%= config.source %>/**/*.html',
					'<%= config.source %>/**/*.liquid',
					'<%= config.source %>/**/*.markdown',
					'<%= config.source %>/**/*.rb',
					'<%= config.source %>/**/*.md'
				],
				tasks: ['jekyll:develop', 'compass:uncompressed']
			},

			// when served files change, reload them in the browser
			served: {
				options: {
					livereload: LIVERELOAD_PORT
				},
				files: [
					'<%= config.destination %>/**/*.html',  // view files (from jekyll)
					'<%= config.destination %>/css/*.css',  // css files (from sass)
					'<%= config.source %>/**/*.css',    // css files (raw)
					'<%= config.source %>/**/*.js'      // script files
				]
			}
		},

		webfont: {
			icons: {
				src: '<%= config.source %>/icons/*.svg',
				dest: '<%= config.source %>/icons/',
				destCss: '<%= config.source %>/_sass/_components/',
				options: {
					hashes: false,
					stylesheet: 'scss',
					relativeFontPath: '../icons',
					htmlDemo: false,
					template: '<%= config.source %>/_templates/icons-template.css'
				}
			}

		}
	});

	grunt.registerTask('wsk-version', 'Uses the Github API to determine the latest web-starter-kit version, and writes it to ./config/wsk-version.yml', function() {
		var latest = require('latest-release');
		var done = this.async();
		var out = './config/wsk-version.yml';

		grunt.log.writeln('Determining latest web-starter-kit version..');

		latest('google', 'web-starter-kit', function(release, err) {
			if (err) {
				grunt.verbose.or.write('Failed to retrieve latest web-starter-kit release information').error().error(err.message);
			} else {
				grunt.log.writeln('Latest version is: ' + release.name);
				grunt.log.writeln('Saved release information under: ' + out);
				/*jshint camelcase: false */
				/*ignore the casing on the variables. These come directly from the Githup API.*/
				grunt.file.write(out,
					'wsk-tag: ' + release.tag_name + '\n' +
					'wsk-name: ' + release.name + '\n' +
					'wsk-zip-url: ' + release.zipball_url + '\n'
					);
				/*jshint camelcase: true */
				done();
			}
		});
	});



	// Test task
	grunt.registerTask('test', 'Lints all javascript and CSS sources.', 'jshint:source');

	// Build CSS task
	grunt.registerTask('buildcss', 'Build the CSS using Compass.\nOptions:\n  --compressed: enables compression', function() {
		if (grunt.option('compressed')) {
			return grunt.task.run(['compass:compressed']);
		} else {
			return grunt.task.run(['compass:uncompressed']);
		}
	});


	// Build task
	grunt.registerTask('build', 'Runs the "test" task, then builds the website.\nOptions:\n  --compressed: enables code compression (css)', [
			'test',
			'clean:destination',    // Clean out the destination directory
			'buildcss',   // Build the CSS using Compass with compression
			'cssmin',         // Minify the combined CSS
			'wsk-version',  // Check if wsk was updated. If so, update the URL to point to the latest version
			'jekyll:appengine'   // Build the site with Jekyll
	]);

	grunt.registerTask('previewbuild', 'Use this task to preview the final build in your browser.\n  Note: Runs tests automatically before building and serving', ['test', 'build', 'open:index', 'connect:destination:keepalive']);

	// Serve task
	grunt.registerTask('serve', 'Runs the "build" task, then serves the website locally.', 'previewbuild');

	// Develop task
	grunt.registerTask('develop', 'The default task for developers.\nRuns the tests, builds the minimum required, serves the content (source and destination) and watches for changes.', [
			'test',
			'clean:destination',    // Clean out the destination directory
			'compass:uncompressed',   // Build the CSS using Compass without compression
			'cssmin',         // Minify the combined CSS
			'jekyll:develop',   // Build the site with Jekyll
			'open:index',
			'connect:destination-source',
			'watch'
	]);

	// Devsite task
	grunt.registerTask('devsite', 'Runs the build steps with devsite config', function() {
		grunt.config.set('config', grunt.file.readYAML('config/devsite.yml'));

		return grunt.task.run([
			'test',           // Code quality control
			'clean:destination',    // Clean out the destination directory
			'clean:icons',        // Clean up icon font files for regeneration
			'webfont:icons',      // Generate icon font files and SASS
			'compass:uncompressed',   // Build the CSS using Compass with compression
			'cssmin',         // Minify the combined CSS
			'jekyll:devsite',     // Build the site with Jekyll
			'htmlmin:all'       // Minify the final HTML
		]);

	});

	// Default task
	grunt.registerTask('default', 'develop');

};
