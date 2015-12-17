var gulp = require('gulp');
var fs = require('fs');
var glob = require('glob');
var inquirer = require('inquirer');
var google = require('googleapis');
var mkdirp = require('mkdirp');

// Check if api key file exists or not
if (fs.existsSync('tools/shows-gen/yt-api-key.json')) {
  var ytKey = require('../tools/shows-gen/yt-api-key.json');

  function selectTypeOfGeneration() {
    return new Promise(function(resolve, reject) {
      inquirer.prompt([
        {
          type: 'list',
          name: 'typeOfGeneration',
          message: 'Would you like to add a single video or a whole playlist?',
          choices: [
            'Single Video',
            'Playlist'
          ],
        },
      ], function(answers) {
        resolve(answers);
      });
    });
  }

  function selectShow(args) {
    return new Promise(function(resolve, reject) {
      var topLevelShowsPath = './src/content/en/shows/';
      var files = fs.readdirSync(topLevelShowsPath);
      var showChoices = [];

      for (var i = 0; i < files.length; i++) {
        if (fs.statSync(topLevelShowsPath + files[i]).isDirectory() &&
          glob.sync(topLevelShowsPath + files[i] + '/index.*').length > 0) {
          showChoices.push(files[i]);
        }
      }

      showChoices.push(new inquirer.Separator());
      showChoices.push('Create New Show');
      showChoices.push(new inquirer.Separator());

      inquirer.prompt([
        {
          type: 'list',
          name: 'showFolderName',
          message: 'Which show folder are you adding to?',
          choices: showChoices,
        },{
          when: function(answers) {
            return answers.showFolderName === 'Create New Show';
          },
          type: 'input',
          name: 'showFolderName',
          message: 'What would you like your new show folder to be called?'
        }
      ], function(answers) {
        args.filepath = topLevelShowsPath + answers.showFolderName;
        resolve(args);
      });
    });
  }

  function selectSeason(args) {
    return new Promise(function(resolve, reject) {
      var files = fs.readdirSync(args.filepath);
      var seasonChoices = [];

      for (var i = 0; i < files.length; i++) {
        if (fs.statSync(args.filepath + '/' + files[i]).isDirectory() &&
          glob.sync(args.filepath + '/' + files[i] +
            '/*.{markdown,md,html}').length > 0) {
          seasonChoices.push(files[i]);
        }
      }

      seasonChoices.push(new inquirer.Separator());
      seasonChoices.push('Create New Season');
      seasonChoices.push(new inquirer.Separator());

      inquirer.prompt([
        {
          type: 'list',
          name: 'seasonName',
          message: 'Which season are you adding to?',
          choices: seasonChoices,
        },{
          when: function(answers) {
            return answers.seasonName === 'Create New Season';
          },
          type: 'input',
          name: 'seasonName',
          message: 'What would you like your new season folder to be called?'
        }
      ], function(answers) {
        args.filepath = args.filepath + '/' + answers.seasonName;
        resolve(args);
      });
    });
  }

  function getShowId(args) {
    return new Promise(function(resolve, reject) {
      inquirer.prompt([
        {
          type: 'text',
          name: 'showID',
          message: 'What is the YouTube Show ID?',
        },
      ], function(answers) {
        if (!answers.showID) {
          reject('No showID given');
          return;
        }

        args.showID = answers.showID;
        resolve(args);
      });
    });
  }

  function getPlaylistId(args) {
    return new Promise(function(resolve, reject) {
      inquirer.prompt([
        {
          type: 'text',
          name: 'playlistID',
          message: 'What is the YouTube Playlist ID?',
        },
      ], function(answers) {
        if (!answers.playlistID) {
          reject('No playlistID given');
          return;
        }

        args.playlistID = answers.playlistID;
        resolve(args);
      });
    });
  }

  function createShowObject(ytVideoObject) {
    var showDetails = {};
    if(ytVideoObject.kind == 'youtube#playlistItem') {
      showDetails.id = ytVideoObject.snippet.resourceId.videoId;
    }
    else {
      showDetails.id = ytVideoObject.id;
    }
    
    showDetails.title = ytVideoObject.snippet.title;
    showDetails.description = ytVideoObject.snippet.description;
    showDetails.publishedOn = ytVideoObject.snippet.publishedAt;

    var largestImgWidth = 0;
    var largestThumbnailImg = null;
    for (var thumbnailKey in ytVideoObject.snippet.thumbnails) {
      var thumbnailObj = ytVideoObject.snippet.thumbnails[thumbnailKey];
      if (thumbnailObj.width > largestImgWidth) {
        largestThumbnailImg = thumbnailObj.url;
      }
    }

    showDetails.thumbnail = largestThumbnailImg;
    return showDetails;
  }

  function getVideoInfo(args) {
    return new Promise(function(resolve, reject) {
      var youtube = google.youtube({version: 'v3', auth: ytKey.apikey});
      youtube.videos.list({
        part: 'id,snippet',
        id: [args.showID],
      }, function(err, result) {
        if (err) {
          console.error('Error when using the YouTube API');
          console.error(err);
          return;
        }

        if (!result.items || result.items.length === 0) {
          reject('Unable to get the YouTube data for "' + args.showID + '"');
          return;
        }

        if (result.items.length > 1) {
          reject('Received more than one result for video ID: "' +
            args.showID + '"');
          return;
        }

        var videoDetails = result.items[0];
        var showDetails = createShowObject(videoDetails);

        args.shows = [showDetails];

        resolve(args);
      });
    });
  }

  function getPlaylistInfo(args) {
    return new Promise(function(resolve, reject) {
      var youtube = google.youtube({version: 'v3', auth: ytKey.apikey});
      youtube.playlistItems.list({
        part: 'id,snippet',
        playlistId: args.playlistID,
        maxResults: 50
      }, function(err, result) {
        if (err) {
          reject('A problem occured fetching playlist with the YouTube API', err);
          return;
        }

        if (!result.items || result.items.length === 0) {
          reject('No videos founds for playlist Id "' +
            args.playlistID + '"', err);
          return;
        }

        args.shows = [];
        for (var i = 0; i < result.items.length; i++) {
          var videoDetails = result.items[i];
          var showDetails = createShowObject(videoDetails);
          args.shows.push(showDetails);
        }
        
        resolve(args);
      });
    });
  }

  function formatDate(dateObj) {
    var year = dateObj.getFullYear().toString();
    var month = (dateObj.getMonth() + 1).toString();
    var day = dateObj.getDate().toString();
    var hour = dateObj.getHours().toString();
    var minute = dateObj.getMinutes().toString();

    if (month.length < 2) {
      month = '0' + month;
    }

    if (day.length < 2) {
      day = '0' + day;
    }
    
    if (hour.length < 2) {
      hour = '0' + hour;
    }
    
    if (minute.length < 2) {
      minute = '0' + minute;
    }

    return year + '-' + month + '-' + day;// + ' ' + hour + ':' + minute + ':00';
  }

  function slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')        // Replace spaces with -
      .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
      .replace(/\-\-+/g, '-')      // Replace multiple - with single -
      .replace(/^-+/, '')          // Trim - from start of text
      .replace(/-+$/, '');         // Trim - from end of text
  }

  function generateFiles(args) {
    return new Promise(function(resolve, reject) {
      var templateFile = fs.readFileSync(
        './tools/shows-gen/show-template.liquid');
      if (!templateFile) {
        reject('Unable to read the template file.');
        return;
      }

      for (var i = 0; i < args.shows.length; i++) {
        var showObj = args.shows[i];
        var showContents = templateFile.toString();
        showContents = showContents.replace('/@ TITLE @/',
          showObj.title);
        showContents = showContents.replace('/@ DESCRIPTION @/',
          showObj.description);
        showContents = showContents.replace('/@ YTID @/',
          showObj.id);
        showContents = showContents.replace('/@ PUBLISHDATE @/',
          formatDate(new Date(showObj.publishedOn)));
        showContents = showContents.replace('/@ UPDATEDATE @/',
          formatDate(new Date(showObj.publishedOn)));
        showContents = showContents.replace('/@ YTTHUMBNAIL @/',
          showObj.thumbnail);

        var filename = slugify(showObj.title) + '.markdown';
        var fullpath = args.filepath + '/' + filename;

        mkdirp(args.filepath);

        fs.writeFileSync(fullpath, showContents);
      }
    });
  }

  gulp.task('shows:generate', function(cb) {
    selectTypeOfGeneration()
      .then(selectShow)
      .then(selectSeason)
      .then(function(args) {
        switch (args.typeOfGeneration) {
          case 'Single Video':
            return getShowId(args)
              .then(getVideoInfo);
          case 'Playlist':
            return getPlaylistId(args)
              .then(getPlaylistInfo)
              .catch(function(err) {
                console.error(err);
              });
          default:
            throw Error('Unable to handle unknown type of generation.');
        }
      })
      .then(generateFiles)
      .then(function() {
        cb();
      })
      .catch(function(err) {
        console.error(err);
      });

  });
} else {
  gulp.task('shows:generate', function(cb) {
    console.log();
    console.warn('You need to add your YT API Key to: ' +
      'tools/shows-gen/yt-api-key.json');
    console.log();
  });
}
