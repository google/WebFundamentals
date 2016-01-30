var videoElement = document.createElement('video');
var canPlayH264 = true;
var canPlayVP9 = true;

if (!(videoElement.canPlayType('video/mp4; codecs="avc1.42001E, mp4a.40.2"'))) {
    $("#warnH264").show();
    canPlayH264 = false;
}

if (!(videoElement.canPlayType('video/webm; codecs="vp9"'))) {
    $("#warnVP9").show();
    canPlayVP9 = false;
}
