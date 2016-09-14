// Subclass of Bot.
// Listens to -type content services.

'use strict';

var Bot = require('../bot');
var util = require('util');

// options.source - The source to receive from.
// options.contentService - The contentService to control.
function SubscribeBot(options) {
  Bot.call(this, options);
  this.incomingEventName = null;
}

util.inherits(SubscribeBot, Bot);

SubscribeBot.prototype.start = function() {
  if (this.enabled)  {
	 console.log("Logging this because it was subscribebot was enabled");
	 return;
  }
  // The above needs to be removed cuz otherwise I can't have more than one smsgh source
  console.log('reached SubscribeBot.start');
  // console.log(this.contentService);
  this.incomingEventName = this.contentService.subscribe(this.source.keywords);
  // console.log(this.incomingEventName);
  SubscribeBot.super_.prototype.start.apply(this);
};

SubscribeBot.prototype.stop = function() {
	console.log("SubscribeBot.stop");
  SubscribeBot.super_.prototype.stop.apply(this);
  this.contentService.unsubscribe();
};

module.exports = SubscribeBot;
