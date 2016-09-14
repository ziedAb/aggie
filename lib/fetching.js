// Sets up the fetching module process and necessary event proxies.
'use strict';

process.title = 'aggie-fetching';

// This file will initialize any necessary components for the operation of the
// fetching module, along with determining event proxies for communication
// between this and other modules.

var childProcess = require('./child-process');
var logger = require('./logger');

// Extend global error class
require('./error');

// Initialize Bot Master and add event proxies
console.log("before requiring bot master in fetching.js");
var botMaster = require('./fetching/bot-master');
console.log("after requiring bot master in fetching.js");

botMaster.init(function() {
  
    console.log("inside botmaster.addlisteners('source, setupeventProxy') emitterModule:api");
  botMaster.addListeners('source', childProcess.setupEventProxy({
    emitter: '/models/source',
    subclass: 'schema',
    emitterModule: 'api'
  }));
    console.log("inside botmaster.addListeners('source, setup blah blah') emitterModule: fetching");
  botMaster.addListeners('source', childProcess.setupEventProxy({
    emitter: '/models/source',
    subclass: 'schema',
    emitterModule: 'fetching'
  }));
    console.log("inside botmaster.addlisteners, fetching");
  botMaster.addListeners('fetching', childProcess.setupEventProxy({
    emitter: '/lib/api/v1/settings-controller',
    emitterModule: 'api'
  }));
});

console.log("after botmaster.init in fetching.js");
// Initialize Report Writer
var reportWriter = require('./fetching/report-writer');

// handle uncaught exceptions
process.on('uncaughtException', function(err) {
  logger.error(err);
});

// Export fetching module itself as a child process
module.exports = childProcess;
module.exports.botMaster = botMaster;
module.exports.reportWriter = reportWriter;
