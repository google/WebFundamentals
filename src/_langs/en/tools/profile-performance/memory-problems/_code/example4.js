'use strict';

var frags = [];

function createFrag() {
    var i, frag, div, buf;
    frag = document.createDocumentFragment();
    for (i = 0; i < 50; i++) {
        div = document.createElement('div');
        buf = document.createTextNode(i + ' - ' + new Date().toTimeString());
        div.appendChild(buf);
        frag.appendChild(div);
    }
    frags.push(frag);
}

function createDetachedNodes() {
    var i;
    for (i = 0; i < 10; i++) {
        createFrag();
    }
}

function cleanNodes() {
    frags.length = 0;
}