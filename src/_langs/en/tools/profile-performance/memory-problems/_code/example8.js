'use strict';

var intervalId,
    closures = [];

function createLargeClosure() {
    var largeStr = new Array(1000000).join('x');
    return function lC() {
        return largeStr;
    };
}

function createSmallClosure() {
    var smallStr = 'x';
    var largeStr = new Array(1000000).join('x');
    return function sC() {
        return smallStr;
    };
}

function createEvalClosure() {
    var smallStr = 'x';
    var largeStr = new Array(1000000).join('x');
    return function eC() {
        eval('');
        return smallStr;
    };
}

function largeClosures() {
    stopInterval();
    intervalId = setInterval(function() {
        closures.push(createLargeClosure());
    }, 1000);
}

function smallClosures() {
    stopInterval();
        intervalId = setInterval(function() {
        closures.push(createSmallClosure());
    }, 1000);

}

function evalClosures() {
    stopInterval();
    intervalId = setInterval(function() {
        closures.push(createEvalClosure());
    }, 1000);
}

function stopInterval() {
    if (intervalId) {
        clearInterval(intervalId);
    }
    intervalId = null;
}

function clear() {
    closures.length = 0;
}

function stopAndClear() {
    stopInterval();
    clear();
}