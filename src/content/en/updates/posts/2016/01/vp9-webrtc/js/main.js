"use strict";

var videos = [
{ "sample": "vp8_vs_vp9_1", "vp8_path" : "videos/out1.vp8.off.900.25.1280_720.webm", "vp8_bitrate" :"900 kbs", "vp9_path" : "videos/out1.vp9.650.25.1280_720_0.webm", "vp9_bitrate" :"650 kbs"},
{ "sample": "vp8_vs_vp9_2", "vp8_path" : "videos/out2.vp8.off.900.25.1280_720.webm", "vp8_bitrate" :"900 kbs", "vp9_path" : "videos/out2.vp9.650.25.1280_720_0.webm", "vp9_bitrate" :"650 kbs"},
{ "sample": "vp8_vs_vp9_3", "vp8_path" : "videos/out3.vp8.off.900.25.1280_720.webm", "vp8_bitrate" :"900 kbs", "vp9_path" : "videos/out3.vp9.650.25.1280_720_0.webm", "vp9_bitrate" :"650 kbs"},
{ "sample": "vp8_vs_vp9_4", "vp8_path" : "videos/out4.vp8.off.900.25_1280_720.webm", "vp8_bitrate" :"900 kbs", "vp9_path" : "videos/out4.vp9.650.25.1280_720_0.webm", "vp9_bitrate" :"650 kbs"},
];


var TIME_STEP = 1.0 / 24.0;

var addUrlForm = document.getElementById("addUrlForm");
var backwardButton = document.getElementById("backwardButton");
var forwardButton = document.getElementById("forwardButton");
var getLinkButton = document.getElementById("getLinkButton");
var getLinkUrl = document.getElementById("getLinkUrl");
var inlineStyle = document.getElementById("inlineStyle");
var leftImgDiv = document.getElementById("leftImgDiv");
var leftVidDiv = document.getElementById("leftVidDiv");
var localFile = document.getElementById("localFile");
var playButton = document.getElementById("playButton");
var rateForm = document.getElementById("rateForm");
var rateInput = document.getElementById("rateInput");
var rightImgDiv = document.getElementById("rightImgDiv");
var rightVidDiv = document.getElementById("rightVidDiv");
var seekSlider = document.getElementById("seekSlider");
var selectA = document.getElementById("selectA");
var splitSlider = document.getElementById("splitSlider");
var videoUrl = document.getElementById("videoUrl");
var viewLink = document.getElementById("viewLink");
var curTime = 0;
//var webPath = "http://gfsviewer.corp.google.com/cns/rc-d/home/on2-prod/vp9_comparison_videos/";
//var localPath = "./samples/"
//var local=1; //This determines if we should use the webpath or localpath

// Create the medias
var leftImg = new Image();
leftImg.id = "leftImg";
var rightImg = new Image();
rightImg.id = "rightImg";

var leftVid = document.createElement("video");
leftVid.id = "leftVid";
leftVid.dataset.mediagroup = "splitvideos";
var rightVid = document.createElement("video");
rightVid.id = "rightVid";
rightVid.dataset.mediagroup = "splitvideos";

var vp9Fallback = document.createElement("source");
vp9Fallback.src = "./samples/black.webm";
var h264Fallback = document.createElement("source");
h264Fallback.src = "./samples/black.mp4";

$(leftVid).append($([vp9Fallback, h264Fallback]).clone());
$(rightVid).append($([vp9Fallback, h264Fallback]).clone());

mediaGroupSetup([leftVid, rightVid]);

var controller = leftVid.controllerShim;

var mediaURLArray = new Array();

var playIcon = '<span class="glyphicon glyphicon-play"></span>';
var pauseIcon = '<span class="glyphicon glyphicon-pause"></span>';

function loadMedia(name, thisParam, thisImg, thisVid, otherVid) {
    var ext = name.split('.').pop();

    uri.setSearch(thisParam, name);

    if (ext == "gif" || ext == "jpg" || ext == "jpeg" || ext == "png") {
        var oldName = thisImg.src;
        thisImg.src = mediaURLArray[name] || name;
        thisImg.style.display = "";
        thisVid.style.display = "none";
        if (oldName == name && thisImg == leftImg) {
            // The load event won't be fired so we need to call the callback ourselves
            onLeftImgLoaded();
        }
    } else {
        thisVid.src = mediaURLArray[name] || name;
        thisVid.style.display = "";
        thisImg.style.display = "none";
    }
}

function loadLeftMedia(name) {
    loadMedia(name, "left", leftImg, leftVid, rightVid);
}
function loadRightMedia(name, reload) {
    loadMedia(name, "right", rightImg, rightVid, leftVid);
}

function storeCurrentTime(someTime)
{
    if (someTime !=0)
        curTime = someTime;
    else
        curTime = 0;
}

$(selectA).change(function() {
    storeCurrentTime(rightVid.currentTime);
    var x = selectA.selectedIndex;
    var y = selectA.options;
    var selected = y[x].index;
    loadLeftMedia(videos[selected].vp8_path);
    loadRightMedia(videos[selected].vp9_path);
    leftVid.load();
    rightVid.load();
});

function onLeftLoaded(width, height) {
    splitSlider.style.top = height / 2 + "px";

    // There doesn't seem to be a less ugly way to change the style of these
    // pseudo-elements.
    inlineStyle.innerHTML =
        "#splitSlider::-webkit-slider-thumb { height:" + height + "px; }\n" +
        "#splitSlider::-moz-range-thumb { height:" + height + "px; }\n" +
        "#splitSlider::-moz-range-track { height:" + height + "px; }";

    splitSlider.max = width;
    splitSlider.style.width = splitSlider.max + "px";
    splitSlider.value = splitSlider.max / 2;
    splitSlider.oninput = function() {
        leftVidDiv.style.width = this.value + "px";
        leftImgDiv.style.width = this.value + "px";
    };
    splitSlider.oninput();

    rightVid.style.width = width + "px";
    rightVid.style.height = height + "px";
    rightImg.style.width = width + "px";
    rightImg.style.height = height + "px";

    document.getElementById("playButton").innerHTML = playIcon;

    controller.muted = true;

    seekSlider.value = 0;
}

function onLeftImgLoaded() {
    if (leftImg.style.display != 'none') {
        onLeftLoaded(leftImg.naturalWidth, leftImg.naturalHeight);
    }
}

function onLeftVidLoaded() {
    if (leftVid.style.display != 'none') {
        onLeftLoaded(leftVid.videoWidth, leftVid.videoHeight);
        leftVid.currentTime = curTime;
        rightVid.currentTime = curTime;
    }
}

$(leftImg).on("load", function() {
    onLeftImgLoaded();
});

$(leftVid).on("loadeddata", function() {
    onLeftVidLoaded();
}).on("ended", function() {
    // Loop the videos
    controller.currentTime = 0;
    controller.unpause();
}).on("timeupdate", function() {
    seekSlider.value = controller.currentTime / controller.duration;
});

$(seekSlider).on("input", function() {
    controller.currentTime = this.value * controller.duration;
}).on("mousedown", function() {
    controller.pause();
}).on("mouseup", function() {
    // If we were playing before seeking, start playing again
    if (playButton.innerHTML.trim() == pauseIcon) {
        controller.play();
    }
});

function controllerPlaying() {
    return controller.playbackState == "playing";
}

$(playButton).click(function() {
    if (controllerPlaying()) {
        controller.pause();
        this.innerHTML = playIcon;
    } else {
        controller.play();
        this.innerHTML = pauseIcon;
    }
});

$(backwardButton).click(function() {
    if (controllerPlaying()) {
        controller.pause();
    }
    controller.currentTime -= TIME_STEP;
});

$(forwardButton).click(function() {
    if (controllerPlaying()) {
        controller.pause();
    }
    controller.currentTime += TIME_STEP;
});

$(rateForm).submit(function() {
    // Don't actually submit the form, we just want to validate it
    return false;
});
$(rateInput).on("input", function() {
    if (!this.checkValidity()) {
        return;
    }
    controller.playbackRate = controller.defaultPlaybackRate = this.value;
});

$(getLinkButton).click(function() {
    uri.setSearch("time", controller.currentTime);
    getLinkUrl.value = uri.href();
    getLinkUrl.select();
});

$.fn.optGroups = function(labelText) {
    var groups = this.children("optgroup[label='" + labelText + "']");
    if (groups.length === 0) {
        this.append($("<optgroup/>", {label: labelText}));
        groups = this.children("optgroup[label='" + labelText + "']");
    }
    return groups;
};

// Keyboard shortcuts

Mousetrap.stopCallback = function(e, element, combo) {
    // Ignore the shortcuts for these elements only
    return element.tagName == "SELECT" || element.tagName == "TEXTAREA" ||
        (element.tagName == "INPUT" &&
         (element.type == "number" || element.type == "text" || element.type == "url"));
};

Mousetrap.bind("space", function() {
    $(playButton).click();
    return false; // prevent default behavior
});
Mousetrap.bind("h", function() {
    $(backwardButton).click();
});
Mousetrap.bind("l", function() {
    $(forwardButton).click();
});
Mousetrap.bind("1", function() {
    $('#viewNav a[data-css="./splitview.css"]').tab('show');
});
Mousetrap.bind("2", function() {
    $('#viewNav a[data-css="./vertview.css"]').tab('show');
});
Mousetrap.bind("3", function() {
    $('#viewNav a[data-css="./horizview.css"]').tab('show');
});
Mousetrap.bind("4", function() {
    $('#viewNav a[data-css="./leftview.css"]').tab('show');
});
Mousetrap.bind("5", function() {
    $('#viewNav a[data-css="./rightview.css"]').tab('show');
});

// Bootstrap tabs control
$('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
    viewLink.href = e.target.dataset.css;
});

var uri = new URI(location.href);
var params = uri.search(true);

if (params.time) {
    var leftLoaded = false;
    var rightLoaded = false;

    // We need to wait until both videos are loaded before we can change
    // the controller currentTime
    $(leftVid).on("loadeddata", function() {
        if (rightLoaded) {
            controller.currentTime = params.time;
        }
        leftLoaded = true;
    });
    $(rightVid).on("loadeddata", function() {
        if (leftLoaded) {
            controller.currentTime = params.time;
        }
        rightLoaded = true;
    });
}
$.each(videos, function(i, v) {
    $(".mediaSelector").append($("<option/>", {text: v.sample}));
});
// Load the medias
if (params.left) {
    loadLeftMedia(params.left);
} else {
    loadLeftMedia(videos[0].vp8_path);
}
if (params.right) {
    loadRightMedia(params.right);
} else {
    loadRightMedia(videos[0].vp9_path);
}
$(leftVidDiv).append(leftVid);
$(rightVidDiv).append(rightVid);

if (leftImg.src === "") {
    leftImg.src = "images/black.png";
}
if (rightImg.src === "") {
    rightImg.src = "images/black.png";
}
$(leftImgDiv).append(leftImg);
$(rightImgDiv).append(rightImg);
