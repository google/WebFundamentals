'use strict';

var intervalId = null, params;

function createChunks() {
    var div, foo, i, str;
    for (i = 0; i < 20; i++) {
        div = document.createElement('div');
        str = new Array(1000000).join('x');
        foo = {
            str: str,
            div: div
        };
        div.foo = foo;
    }
}

function start() {
    if (intervalId) {
        return;
    }
    intervalId = setInterval(createChunks, 1000);
}

function stop() {
    if (intervalId) {
        clearInterval(intervalId);
    }
    intervalId = null;
}