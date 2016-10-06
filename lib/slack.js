'use strict';

var IncomingWebhook = require('@slack/client').IncomingWebhook;

var createIncomeWebhook = function createIncomeWebhook() {
    return new IncomingWebhook(process.env.SLACK_WEBHOOK, {
        username: process.env.APP_NAME,
        iconEmoji: process.env.APP_ICON,
        channel: process.env.SLACK_CHANNEL
    });
};

var sendMessage = function sendMessage(msg) {
    console.log("Sending message to slack");
    var wh = createIncomeWebhook();
    wh.send(msg, function () {
        function onSendEnd() {
            console.log('Message sent');
        }

        return onSendEnd;
    }());
};

module.exports = {
    createIncomeWebhook: createIncomeWebhook,
    sendMessage: sendMessage
};