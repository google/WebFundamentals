/* Basic stuff */

function showVideoControls() {
  videoControls.classList.add('visible');
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
  console.log(seconds);
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
  muteButton.classList.toggle('active', video.muted);
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
  playPauseButton.classList.add('paused');
  hideVideoControls();
});

video.addEventListener('pause', function() {
  console.log('pause');
  playPauseButton.classList.remove('paused');
  showVideoControls();
});

video.addEventListener('ended', function() {
  console.log('ended');
  playPauseButton.classList.remove('paused');
  video.currentTime = 0;
  showVideoControls();
});

document.addEventListener('fullscreenchange', function() {
  toggleFullscreenButton.classList.toggle('active', document.fullscreenElement);
});

video.addEventListener('timeupdate', function() {
  console.log('timeupdate');
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
