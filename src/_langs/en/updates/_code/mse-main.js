'use strict';

// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Cache XHRs to avoid repeated requests.
var xhrCache = {};

// Simple XHR based file loader.  Requests |url| as an ArrayBuffer and delivers
// it to |callback| once the request completes successfully.
function GET(url, callback) {
  if (url in xhrCache) {
    if (xhrCache[url] === 'pending') {
      setTimeout(function() {
        GET(url, callback);
      }, 10);
    } else {
      setTimeout(function() {
        callback(xhrCache[url]);
      }, 0);
    }
    return;
  }
  xhrCache[url] = 'pending';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function() {
    if (xhr.status === 200) {
      xhrCache[url] = xhr.response;
      callback(xhr.response);
    } else {
      console.log('GET ' + url + ' failed: ' + xhr.status);
    }
  };
  xhr.send();
}

// Hard coded sample rate for test data; this could be parsed from the container
// instead, but for the sake of focus I've hard coded it.
var SECONDS_PER_SAMPLE = 1 / 44100.0;

// Number of audio chunks to load.
var SEGMENTS = 5;

// Base path for Sintel audio segments.
var SINTEL_BASE_PATH = 'sintel_';

var llama = {};

// Since most MP3 encoders store the gapless metadata in binary, we'll need a
// method for turning bytes into integers.  Note: This doesn't work for values
// larger than 2^30 since we'll overflow the signed integer type when shifting.
llama.readInt = function(buffer) {
  var result = buffer.charCodeAt(0);
  for (var i = 1; i < buffer.length; ++i) {
    result <<= 8;
    result += buffer.charCodeAt(i);
  }
  return result;
};

llama.parseGaplessData = function(arrayBuffer) {
  // Gapless data is generally within the first 4096 bytes, so limit parsing.
  var byteStr = String.fromCharCode.apply(
    null, new Uint8Array(arrayBuffer.slice(0, 4096)));

  var frontPadding = 0;
  var endPadding = 0;
  var realSamples = 0;

  // iTunes encodes the gapless data as hex strings like so:
  //
  //    'iTunSMPB[ 26 bytes ]0000000 00000840 000001C0 0000000000046E00'
  //    'iTunSMPB[ 26 bytes ]####### frontpad  endpad    real samples'
  //
  // The approach here elides the complexity of actually parsing MP4 atoms. It
  // may not work for all files without some tweaks.
  var iTunesDataIndex = byteStr.indexOf('iTunSMPB');
  if (iTunesDataIndex !== -1) {
    var frontPaddingIndex = iTunesDataIndex + 34;
    frontPadding = parseInt(byteStr.substr(frontPaddingIndex, 8), 16);

    var endPaddingIndex = frontPaddingIndex + 9;
    endPadding = parseInt(byteStr.substr(endPaddingIndex, 8), 16);

    var sampleCountIndex = endPaddingIndex + 9;
    realSamples = parseInt(byteStr.substr(sampleCountIndex, 16), 16);
  }

  // Xing padding is encoded as 24bits within the header.  Note: This code will
  // only work for Layer3 Version 1 and Layer2 MP3 files with XING frame counts
  // and gapless information.  See the following documents for more details:
  // http://www.codeproject.com/Articles/8295/MPEG-Audio-Frame-Header (2.3.1)
  // http://gingko.homeip.net/docs/file_formats/dxhead.html (FRAMES_FLAG)
  var xingDataIndex = byteStr.indexOf('Xing');
  if (xingDataIndex === -1) {
    xingDataIndex = byteStr.indexOf('Info');
  }
  if (xingDataIndex !== -1) {
    var frameCountIndex = xingDataIndex + 8;
    var frameCount = llama.readInt(byteStr.substr(frameCountIndex, 4));

    // For Layer3 Version 1 and Layer2 there are 1152 samples per frame.
    realSamples = frameCount * 1152;

    xingDataIndex = byteStr.indexOf('LAME');
    if (xingDataIndex === -1) {
      xingDataIndex = byteStr.indexOf('Lavf');
    }
    if (xingDataIndex !== -1) {
      var gaplessDataIndex = xingDataIndex + 21;
      var gaplessBits = llama.readInt(byteStr.substr(gaplessDataIndex, 3));

      // Upper 12 bits are the front padding, lower are the end padding.
      frontPadding = gaplessBits >> 12;
      endPadding = gaplessBits & 0xFFF;
    }

    realSamples -= frontPadding + endPadding;
  }

  console.log(realSamples + ' -- ' + frontPadding + ' -- ' + endPadding);

  return {
    audioDuration: realSamples * SECONDS_PER_SAMPLE,
    frontPaddingDuration: frontPadding * SECONDS_PER_SAMPLE,
    endPaddingDuration: endPadding * SECONDS_PER_SAMPLE
  };
};

llama.loadAudio = function(format, isGapless, mediaSource, waveform) {
  var regions = [];
  var sourceBuffer = mediaSource.addSourceBuffer(format);

  function segmentFilename(format, index) {
    return SINTEL_BASE_PATH + index +
      (format === 'audio/mpeg' ? '.mp3' : '.mp4');
  }

  function drawMarkers() {
    // Wavesurfer doesn't account for the marker width when setting up the
    // graph, so extend it by a pixel after loading is complete.
    waveform.params.container.style.width =
      (waveform.params.container.clientWidth + 1) + 'px';

    // Wavesurfer doesn't seem to handle dynamic loads very well, so ensure
    // the peaks and graph are all drawn out appropriately before marking.
    waveform.drawBuffer();

    // Draw marks for the join points in gapless mode and highlight the gaps
    // when in regular mode.
    while (regions.length > 0) {
      var markRegion = regions.shift();
      if (markRegion[0] === markRegion[1]) {
        waveform.mark({
          color: '#00FF00',
          position: markRegion[0],
          width: 1
        });
      } else {
        waveform.mark({
          color: '#FF0000',
          position: markRegion[0],
          width: Math.ceil((markRegion[1] - markRegion[0]) *
            waveform.params.minPxPerSec)
        });
      }
    }
  }

  function onAudioLoaded(data, index) {
    // Parsing the gapless metadata is unfortunately non trivial and a bit
    // messy, so we'll glaze over it here.  See appendix b if you'd like more
    // details on how to extract this metadata.  ParseGaplessData() will return
    // a dictionary with three elements:
    //
    //    audioDuration: Duration in seconds of all non-padding audio.
    //    frontPaddingDuration: Duration in seconds of the front padding.
    //    endPaddingDuration: Duration in seconds of the end padding.
    //
    var gaplessMetadata = llama.parseGaplessData(data);

    // Each appended segment must be appended relative to the next.  To avoid
    // any overlaps we'll use the ending timestamp of the last append as the
    // starting point for our next append or zero if we haven't appended
    // anything yet.
    var appendTime = index > 0 ? sourceBuffer.buffered.end(0) : 0;

    if (isGapless) {
      // The timestampOffset field essentially tells MediaSource where in the
      // media timeline the data given to appendBuffer() should be placed.  I.e.
      // if the timestampOffset is 1 second, the appended data will start 1
      // second into playback.
      //
      // MediaSource requires that the media timeline starts from time zero, so
      // we need to ensure that the data left after filtering by the append
      // window starts at time zero.  We'll do this by shifting all of the
      // padding we want to discard before our append time.
      sourceBuffer.timestampOffset =
        appendTime - gaplessMetadata.frontPaddingDuration;

      // Simply put, an append window allows you to trim off audio (or video)
      // frames which fall outside of a specified window.  Here we'll use the
      // end of our last append as the start of our append window and the end of
      // the real audio data for this segment as the end of our append window.
      sourceBuffer.appendWindowStart = appendTime;
      sourceBuffer.appendWindowEnd = appendTime + gaplessMetadata.audioDuration;

      if (appendTime > 0) {
        regions.push([appendTime, appendTime]);
      }
    } else {
      // Required so fragmented mp4 appends in sequence.
      sourceBuffer.timestampOffset = appendTime;

      // Coalesce front and end padding between segments.
      var segmentStart = appendTime + gaplessMetadata.frontPaddingDuration;
      if (regions.length === 0) {
        regions.push([appendTime, segmentStart]);
      } else {
        regions[regions.length - 1][1] = segmentStart;
      }
      var segmentEnd = segmentStart + gaplessMetadata.audioDuration;
      regions.push(
        [segmentEnd, segmentEnd + gaplessMetadata.endPaddingDuration]);
    }

    // When appendBuffer() completes it will fire an "updateend" event signaling
    // that it's okay to append another segment of media. Here we'll chain the
    // append for the next segment to the completion of our current append.
    if (index === 0) {
      sourceBuffer.addEventListener('updateend', function() {
        if (++index < SEGMENTS) {
          GET(segmentFilename(format, index), function(data) {
            console.log('Loading ' + segmentFilename(format, index));
            onAudioLoaded(data, index);
          });
        } else {
          // We've loaded all available segments, so tell MediaSource there are
          // no more buffers which will be appended.
          mediaSource.endOfStream();
          drawMarkers();
        }
      });
    }

    // appendBuffer() will now use the timestamp offset and append window
    // settings to filter and timestamp the data we're appending.
    sourceBuffer.appendBuffer(data);
  }

  GET(segmentFilename(format, 0), function(data) {
    console.log('Loading ' + segmentFilename(format, 0));
    onAudioLoaded(data, 0);
  });
};

llama.drawGraph = function(container, format, isGapless, peaks) {
  var mediaSource = new MediaSource();
  var context = window.URL.createObjectURL(mediaSource);
  var waveform = Object.create(WaveSurfer);

  var waveformContainer = document.getElementById(container);
  if (!waveformContainer) { // to cope when iframing individual examples
    return;
  }
  waveform.init({
    backend: 'AudioElement',
    container: waveformContainer,
    dragSelection: false,
    height: waveformContainer.clientHeight,
    progressColor: 'purple',
    scrollParent: false,
    waveColor: 'violet',
  });

  mediaSource.addEventListener('sourceopen', function() {
    llama.loadAudio(format, isGapless, mediaSource, waveform);
  }, false);

  var overlay = waveformContainer.parentElement.querySelector('.play-overlay');
  overlay.onclick = function(e) {
    e.target.style.visibility = 'hidden';
    waveform.play();
  };

  waveform.load(context, peaks);

  waveform.media.addEventListener('ended', function(event) {
    waveform.seekTo(0);
    overlay.style.visibility = 'visible';
  }, false);
};

document.addEventListener('DOMContentLoaded', function(event) {
  llama.drawGraph(
    'waveform_mp3_gapless', 'audio/mpeg', true, mp3GaplessPeaks);
  llama.drawGraph('waveform_mp3_gap', 'audio/mpeg', false, mp3GapPeaks);
  llama.drawGraph('waveform_mp4_gapless',
    'audio/mp4; codecs="mp4a.40.2"',
    true,
    aacGaplessPeaks);
});
