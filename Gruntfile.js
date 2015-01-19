/* To prevent jshint from yelling at module.exports. */
/* jshint node:true */

'use strict';

var LIVERELOAD_PORT = 35729;

module.exports = function(grunt) {

	// Loads all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	require('time-grunt')(grunt);

	// App configuration
	var config = grunt.file.readYAML('config/common.yml');

	// Tasks configuration
	grunt.initConfig({

		config: config,

		clean: {
			destination: {
				files: [{
					dot: true,
					src: '<%= config.destination %>/*'
				}]
			},
			icons: {
				files: [{
					dot: true,
					src: '<%= config.source %>/icons/icons*.*'
				}]
			}
		},

		copy: {
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
				path: 'appengine',
				auth: 'oauth2'
			},
			deploy: {
				action: 'update'
			},
			local: {
				action: 'run',
				options: {
					async: true,
					args: {
						port: config.port
					}
				}
			},
			stop: {
				action: 'kill'
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

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			source: [
				'Gruntfile.js',
				'<%= config.source %>/**/*.js',
				'!<%= config.source %>/**/_code/**/*.js'
			]
		},

		open: {
			local: {
				path: 'http://localhost:<%=config.port%>/web/fundamentals'
			},
			staging: {
				path: 'http://web-central.appspot.com/web/fundamentals'
			},
		},

		sass: {
			options: {
				precision: 10,
				includePaths: ['<%= config.source %>/css'],
				imagePath: '<%= config.source %>/imgs',
				outputStyle: 'nested'
			},
			all: {
				files: {
					'<%= config.source %>/css/styles.css': '<%= config.source %>/_sass/styles.scss'
				}
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
				tasks: ['sass', 'cssmin', 'copy:cssToDest']
			},

			// when jekyll source changes, recompile them
			jekyll: {
				files: [
					'<%= config.source %>/**/*.liquid',
					'<%= config.source %>/**/*.markdown',
					'<%= config.source %>/**/*.rb',
					'<%= config.source %>/**/*.md',
					'<%= config.source %>/**/*.xml'
				],
				tasks: ['jekyll:appengine']
			},

			// when served files change, reload them in the browser
			served: {
				options: {
					livereload: LIVERELOAD_PORT
				},
				files: [
					'<%= config.destination %>/**/*.html',  // view files (from jekyll)
					'<%= config.destination %>/css/*.css'   // css files (from sass)
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

	// jekyll:target [--lang <lang_code,lang_code,...|all>]
	// where 'target' is config/target.yml file.
	// defaults to '--lang all'.
	// 'all' builds for all languages specified in config.yml/langs_available + 'en'.
	// builds w/o multilang support if config.yml is missing langs_available.
	grunt.registerTask('jekyll', 'Run jekyll build.\nOptions:\n  [--lang]: list of languages or "all"', function() {
		var langs = grunt.option('lang') || 'all';

		var cfgname = this.args[0] || 'appengine';

		// read langs from config/target.yml
		// returns langs_available + prime_lang
		//         or [] if langs_available is not defined.
		var langsFromConfig = function() {
			/*jshint camelcase: false */
			var cfg = grunt.file.readYAML('config/common.yml');
			if (typeof cfg.langs_available === 'undefined') {
				return [];
			}
			cfg.langs_available.unshift(cfg.prime_lang);
			return cfg.langs_available;
			/*jshint camelcase: true */
		};

		if (langs === 'all' ) {
			langs = langsFromConfig();
		} else {
			langs = langs.split(/,|\s/).filter(function(item) {
				return item.length > 0;
			});
		}

		var cfgfiles = 'config/wsk-version.yml,config/common.yml,config/' + cfgname + '.yml';
		var args = ['build', '--config', cfgfiles, '-t'];
		var spawnJekyll = function(lang, callback) {
			var opts = {env: process.env, stdio: 'inherit'};
			if (lang !== null) {
				opts.env.TRANS_LANG = lang;
				// opts.env.MENTOS_TIMEOUT = 32;
			}
			grunt.util.spawn({cmd: 'jekyll', args: args, opts: opts}, callback);
		};

		var done = this.async();
		var count = 0;
		var waitAll = function(err, res, code) {
			if (err) {
				grunt.fatal(String(res), code);
			}
			if (++count >= langs.length) {
				done();
			}
		};

		// multilang build
		for (var i = 0; i < langs.length; i++) {
			spawnJekyll(langs[i], waitAll);
		}
		// simple build (no multilang support)
		if (langs.length === 0) {
			spawnJekyll(null, waitAll);
		}
	});

	// Test task
	grunt.registerTask('test', 'Lints all javascript and CSS sources.', 'jshint:source');

	grunt.registerTask('prepare', ['wsk-version', 'test', 'clean:destination', 'sass', 'cssmin']);

	// Build task
	grunt.registerTask('build', 'Runs the "test" task, then builds the website.', [
		'prepare',
		'jekyll:appengine'   // Build the site with Jekyll
	]);

	// Develop task
	grunt.registerTask('develop', 'The default task for developers.\nRuns the tests, builds the minimum required, serves the content and watches for changes.', [
		'build',   // Build the site with Jekyll
		'gae:local',
		'open:local',
		'watch'
	]);

	// Devsite task
	grunt.registerTask('devsite', 'Runs the build steps with devsite config', [
		'clean:icons',        // Clean up icon font files for regeneration
		'webfont:icons',      // Generate icon font files and SASS
		'prepare',
		'jekyll:devsite',     // Build the site with Jekyll
		'htmlmin:all'         // Minify the final HTML
	]);

	// Default task
	grunt.registerTask('default', 'develop');

};
