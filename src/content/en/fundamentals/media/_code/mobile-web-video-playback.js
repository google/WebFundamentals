/* Basic stuff */

function showVideoControls() {
  videoControls.classList.add('visible');
  videoCurrentTime.textContent = secondsToTimeCode(video.currentTime);
  videoProgressBar.style.transform = `scaleX(${video.currentTime / video.duration})`;
}

function hideVideoControls() {
  videoControls.classList.remove('visible');
}

videoControls.addEventListener('click', function(event) {
  if (videoControls.classList.contains('visible')) {
    hideVideoControls();
  } else {
    showVideoControls();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  showVideoControls();
});


/* Utils */

function secondsToTimeCode(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [
    h,
    m > 9 ? m : '0' + m,
    s > 9 ? s : '0' + s,
  ].filter(Boolean).join(':');
}


/* Custom controls */

video.addEventListener('loadedmetadata', function() {
  console.log('loadedmetadata');
  videoDuration.textContent = secondsToTimeCode(video.duration);
  videoCurrentTime.textContent = secondsToTimeCode(video.currentTime);
  videoProgressBar.style.transform = `scaleX(${video.currentTime / video.duration})`;
});

playPauseButton.addEventListener('click', function(event) {
  event.stopPropagation();
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});

video.addEventListener('play', function() {
  console.log('play');
  playPauseButton.classList.add('playing');
  hideVideoControls();
});

video.addEventListener('pause', function() {
  console.log('pause');
  playPauseButton.classList.remove('playing');
  showVideoControls();
});

video.addEventListener('ended', function() {
  console.log('ended');
  playPauseButton.classList.remove('playing');
  video.currentTime = 0;
  showVideoControls();
});

document.addEventListener('fullscreenchange', function() {
  toggleFullscreenButton.classList.toggle('active', document.fullscreenElement);
});

video.addEventListener('timeupdate', function() {
  console.log('timeupdate');
  if (!videoControls.classList.contains('visible')) {
    return;
  }
  videoCurrentTime.textContent = secondsToTimeCode(video.currentTime);
  videoProgressBar.style.transform = `scaleX(${video.currentTime / video.duration})`;
});

seekForwardButton.addEventListener('click', function(event) {
  event.stopPropagation();
  seekForward();
});

seekBackwardButton.addEventListener('click', function(event) {
  event.stopPropagation();
  seekBackward();
});

const skipTime = 10;

function seekForward() {
  video.currentTime = Math.min(video.currentTime + skipTime, video.duration);
}

function seekBackward() {
  video.currentTime = Math.max(video.currentTime - skipTime, 0);
}

video.addEventListener('seeking', function() {
  console.log('seeking');
  video.classList.add('seeking');
});

video.addEventListener('seeked', function() {
  console.log('seeked');
  setTimeout(function() {
    video.classList.remove('seeking');
  }, 200);
});


/* Fullscreen */

toggleFullscreenButton.addEventListener('click', function(event) {
  event.stopPropagation();
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    requestFullscreenVideo();
    lockScreenInLandscape();
  }
});

function requestFullscreenVideo() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else {
    video.webkitEnterFullscreen();
  }
}

if ('orientation' in screen) {
  screen.orientation.addEventListener('change', function() {
    // Let's automatically request fullscreen if user switches device in landscape mode.
    if (screen.orientation.type.startsWith('landscape')) {
      // Note: It may silently fail in browsers that don't allow requesting
      // fullscreen from the orientation change event.
      // https://github.com/whatwg/fullscreen/commit/e5e96a9da944babf0e246980559cd80a46a300ca
      requestFullscreenVideo();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  });
}

function lockScreenInLandscape() {
  if (!('orientation' in screen)) {
    return;
  }

  // Let's force landscape mode only if device is in portrait mode and can be held in one hand.
  if (matchMedia('(orientation: portrait) and (max-device-width: 768px)').matches) {
    screen.orientation.lock('landscape').then(function() {
      // When screen is locked in landscape while user holds device in
      // portrait, let's use the Device Orientation API to unlock screen only
      // when it is appropriate to create a perfect and seamless experience.
      listenToDeviceOrientationChanges();
    });
  }
}

function listenToDeviceOrientationChanges() {
  if (!('DeviceOrientationEvent' in window)) {
    return;
  }

  var previousDeviceOrientation, currentDeviceOrientation;
  window.addEventListener('deviceorientation', function onDeviceOrientationChange(event) {
    // event.beta represents a front to back motion of the device and
    // event.gamma a left to right motion.
    if (Math.abs(event.gamma) > 10 || Math.abs(event.beta) < 10) {
      previousDeviceOrientation = currentDeviceOrientation;
      currentDeviceOrientation = 'landscape';
      return;
    }
    if (Math.abs(event.gamma) < 10 || Math.abs(event.beta) > 10) {
      previousDeviceOrientation = currentDeviceOrientation;
      // When device is rotated back to portrait, let's unlock screen orientation.
      if (previousDeviceOrientation == 'landscape') {
        screen.orientation.unlock();
        window.removeEventListener('deviceorientation', onDeviceOrientationChange);
      }
    }
  });
}


/* Background Playback */

document.addEventListener('visibilitychange', function() {
  // Pause video when page is hidden.
  if (document.hidden) {
    video.pause();
  }
});


if ('IntersectionObserver' in window) {
  // Show/hide mute button based on video visibility in the page.
  function onIntersection(entries) {
    console.log('onIntersection');
    entries.forEach(function(entry) {
      muteButton.hidden = video.paused || entry.isIntersecting;
    });
  }
  var observer = new IntersectionObserver(onIntersection);
  observer.observe(video);
}

muteButton.addEventListener('click', function() {
  // Mute/unmute video on button click.
  video.muted = !video.muted;
});

video.addEventListener('volumechange', function() {
  muteButton.classList.toggle('active', video.muted);
});


let playlist = getAwesomePlaylist();
let index = 3;

previousTrackButton.addEventListener('click', playPreviousVideo);
nextTrackButton.addEventListener('click', playNextVideo);

updatePlaylistButtons();

function playPreviousVideo() {
  index = (index - 1 + playlist.length) % playlist.length;
  playVideoFromPlaylist();
}

function playNextVideo() {
  index = (index + 1) % playlist.length;
  playVideoFromPlaylist();
}

function playVideoFromPlaylist() {
  video.src = playlist[index].src;
  video.play()
  .then(_ => {
    setMediaSession();
    updatePlaylistButtons();
  });
}

function setMediaSession() {
  if (!('mediaSession' in navigator)) {
    return;
  }
  let track = playlist[index];
  navigator.mediaSession.metadata = new MediaMetadata({
    title: track.title,
    artist: track.artist,
    artwork: track.artwork
  });
  navigator.mediaSession.setActionHandler('previoustrack', playPreviousVideo);
  navigator.mediaSession.setActionHandler('nexttrack', playNextVideo);
  navigator.mediaSession.setActionHandler('seekbackward', seekBackward);
  navigator.mediaSession.setActionHandler('seekforward', seekForward);
}

function updatePlaylistButtons() {
  let nextIndex = (index + 1) % playlist.length;
  let previousIndex = (index - 1 + playlist.length) % playlist.length;

  nextTrackButton.textContent = /"(.*)"/.exec(playlist[nextIndex].title)[1];
  previousTrackButton.textContent = /"(.*)"/.exec(playlist[previousIndex].title)[1];
}

video.addEventListener('play', function() {
  // Calling this one to set up media session just for the sake of separating
  // background playback.
  setMediaSession();
}, { once: true });

video.addEventListener('loadedmetadata', function() {
  let newTitle = playlist[index].title.replace(/"/g, '');
  if (newTitle !== videoTitle.textContent) {
    videoTitle.textContent = newTitle;
  }
  let newArtist = playlist[index].artist;
  if (newArtist !== videoArtist.textContent) {
    videoArtist.textContent = newArtist;
  }
});

/* Utils */

function getAwesomePlaylist() {
  const BASE_URL = 'https://storage.googleapis.com/media-session/';

  return [{
      src: BASE_URL + 'sintel/trailer.mp4',
      title: '"Sintel" Trailer, Durian Open Movie Project',
      artist: 'Blender Foundation',
      artwork: [
        { src: BASE_URL + 'sintel/artwork-96.png',  sizes: '96x96',   type: 'image/png' },
        { src: BASE_URL + 'sintel/artwork-128.png', sizes: '128x128', type: 'image/png' },
        { src: BASE_URL + 'sintel/artwork-192.png', sizes: '192x192', type: 'image/png' },
        { src: BASE_URL + 'sintel/artwork-256.png', sizes: '256x256', type: 'image/png' },
        { src: BASE_URL + 'sintel/artwork-384.png', sizes: '384x384', type: 'image/png' },
        { src: BASE_URL + 'sintel/artwork-512.png', sizes: '512x512', type: 'image/png' },
      ]
    }, {
      src: BASE_URL + 'big-buck-bunny/trailer.mov',
      title: '"Big Buck Bunny" Trailer, Peach Open Movie Project',
      artist: 'Blender Foundation',
      artwork: [
        { src: BASE_URL + 'big-buck-bunny/artwork-96.png',  sizes: '96x96',   type: 'image/png' },
        { src: BASE_URL + 'big-buck-bunny/artwork-128.png', sizes: '128x128', type: 'image/png' },
        { src: BASE_URL + 'big-buck-bunny/artwork-192.png', sizes: '192x192', type: 'image/png' },
        { src: BASE_URL + 'big-buck-bunny/artwork-256.png', sizes: '256x256', type: 'image/png' },
        { src: BASE_URL + 'big-buck-bunny/artwork-384.png', sizes: '384x384', type: 'image/png' },
        { src: BASE_URL + 'big-buck-bunny/artwork-512.png', sizes: '512x512', type: 'image/png' },
      ]
    }, {
      src: BASE_URL + 'elephants-dream/teaser.mp4',
      title: '"Elephants Dream" Teaser, Orange Open Movie Project',
      artist: 'Blender Foundation',
      artwork: [
        { src: BASE_URL + 'elephants-dream/artwork-96.png',  sizes: '96x96',   type: 'image/png' },
        { src: BASE_URL + 'elephants-dream/artwork-128.png', sizes: '128x128', type: 'image/png' },
        { src: BASE_URL + 'elephants-dream/artwork-192.png', sizes: '192x192', type: 'image/png' },
        { src: BASE_URL + 'elephants-dream/artwork-256.png', sizes: '256x256', type: 'image/png' },
        { src: BASE_URL + 'elephants-dream/artwork-384.png', sizes: '384x384', type: 'image/png' },
        { src: BASE_URL + 'elephants-dream/artwork-512.png', sizes: '512x512', type: 'image/png' },
      ]
    }, {
      src: BASE_URL + 'caminandes/short.mp4',
      title: '"Caminandes 2: Gran Dillama" - Blender Animated Short',
      artist: 'Blender Foundation',
      artwork: [
        { src: BASE_URL + 'caminandes/artwork-96.png',  sizes: '96x96',   type: 'image/png' },
        { src: BASE_URL + 'caminandes/artwork-128.png', sizes: '128x128', type: 'image/png' },
        { src: BASE_URL + 'caminandes/artwork-192.png', sizes: '192x192', type: 'image/png' },
        { src: BASE_URL + 'caminandes/artwork-256.png', sizes: '256x256', type: 'image/png' },
        { src: BASE_URL + 'caminandes/artwork-384.png', sizes: '384x384', type: 'image/png' },
        { src: BASE_URL + 'caminandes/artwork-512.png', sizes: '512x512', type: 'image/png' },
      ]
    }];
}
