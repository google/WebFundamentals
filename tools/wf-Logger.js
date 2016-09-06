'use strict';

var util = require('util');
var colors = require('colors');
var moment = require('moment');

var INSPECT_OPTS = {colors: true, depth: 3};
var LOG_LEVELS = {
  START: {level: 0, color: colors.green},
  STOP: {level: 0, color: colors.red},
  INIT: {level: 0, color: colors.green},
  EXCPT: {level: 0, color: colors.red},
  ERROR: {level: 10, color: colors.red},
  WARN: {level: 40, color: colors.yellow},
  INFO: {level: 50, color: colors.cyan},
  TODO: {level: 60, color: colors.magenta},
  DEBUG: {level: 60, color: colors.blue},
  EXTRA: {level: 70, color: colors.blue}
};

function getLogColorByName(levelName) {
  var logInfo = LOG_LEVELS[levelName];
  if (logInfo) {
    return logInfo.color;
  }
  return colors.white;
}

function printLog(level, message, extra) {
  var msg = [];
  msg.push(moment().format('YYYY-MM-DDTHH:mm:ss.SSS'));
  var formattedLevel = ('     ' + level).slice(-5);
  var levelColor = getLogColorByName(level);
  msg.push(levelColor(formattedLevel));
  msg.push(message);
  console.log(msg.join(' | '));
  if (extra) {
    if (extra.stack) {
      console.log(extra.message);
      console.log(extra.stack);
    } else {
      console.log(util.inspect(extra, INSPECT_OPTS));
    }
  }
}

function taskStart(taskName) {
  printLog('START', 'Starting ' + taskName);
}

function taskStop(taskName) {
  printLog('STOP', 'Completed ' + taskName);
}

function log(message, extra) {
  printLog('INFO', message, extra);
}

function warn(message, extra) {
  printLog('WARN', message, extra);
}

function error(message, extra) {
  printLog('ERROR', message, extra);
}

function exception(message, extra) {
  printLog('EXCPT', message, extra);
}

function debug(message, extra) {
  printLog('DEBUG', message, extra);
}

exports.taskStart = taskStart;
exports.taskStop = taskStop;
exports.exception = exception;
exports.error = error;
exports.warn = warn;
exports.log = log;
exports.info = log;
exports.debug = debug;
