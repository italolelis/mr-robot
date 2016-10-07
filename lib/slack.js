'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendMessage = undefined;

var _client = require('@slack/client');

var createIncomeWebhook = function createIncomeWebhook() {
    return new _client.IncomingWebhook(process.env.SLACK_WEBHOOK, {
        username: process.env.APP_NAME,
        iconEmoji: process.env.APP_ICON,
        channel: process.env.SLACK_CHANNEL
    });
};

var sendMessage = exports.sendMessage = function sendMessage(msg) {
    console.log("Sending message to slack");
    var wh = createIncomeWebhook();
    wh.send(msg, function () {
        function onSendEnd() {
            console.log('Message sent');
        }

        return onSendEnd;
    }());
};