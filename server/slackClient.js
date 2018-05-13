'use strict';

const {RTMClient} = require('@slack/client');
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
let rtm = null;


function handleOnAuthenticated(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, and connected to following channel 
      ${rtmStartData}`);
}

function handleOnMessage(message) {
    console.log(message);

    rtm.sendMessage('this is a test message', message.channel, function messageSent() {
        // optionally, you can supply a callback to execute once the message has been sent
    });
}

function addAuthenticatedHandler(rtm, handler) {
    rtm.on('authenticated', handler);
}


module.exports.init = function slackClient(token, logLevel) {
    rtm = new RTMClient(token, {LogLevel: logLevel});
    addAuthenticatedHandler(rtm, handleOnAuthenticated);
    rtm.on('message', handleOnMessage);
    return rtm;
}

module.exports.addAuthenticatedHandler = addAuthenticatedHandler;