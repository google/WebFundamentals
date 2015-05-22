'use strict';

var leakedNodes = [], parentDiv, leaf, counter = 0;

function createLeaf() {
    counter++;
    var div = document.createElement('div');
    div.appendChild(document.createTextNode('Leaf  ' + counter));
    div.someText = (new Array(1E6).join('x'));
    return div;
}

function createBranch(number) {
    var div = document.createElement('div');
    createNodesAndReturnLastLeaf(div, number - 1);
    return div;
}

function createNodesAndReturnLastLeaf(parentDiv, number) {
    var i, lastLeaf;
    for (i = 0; i < number; i++) {
        parentDiv.appendChild(createBranch(number));
    }
    for (i = 0; i < number; i++) {
        parentDiv.appendChild(lastLeaf = createLeaf(number, i));
    }
    return lastLeaf;
}

function createTree() {
    parentDiv = document.createElement('div');
    leaf = createNodesAndReturnLastLeaf(parentDiv, 4);
    document.body.appendChild(parentDiv);
}

function detachTree() {
    document.body.removeChild(parentDiv);
}

function removeTreeReference() {
    parentDiv = null;
}

function removeLeafReference() {
    leaf = null;
}