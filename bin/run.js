'use strict';

const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);

const slackToken = 'xoxb-281823172646-363893499878-tZd7BDVHxgUHK2oPALgRz8je';
const slackLogLevel = 'verbose';

const rtm = slackClient.init(slackToken, slackLogLevel);
rtm.start();


slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on('listening', function () {
    console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')} mode.`);
});