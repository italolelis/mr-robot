const AWS = require('aws-sdk');
var request = require('request');
var IncomingWebhook = require('@slack/client').IncomingWebhook;
require('dotenv').config()

var url = process.env.SLACK_WEBHOOK;
var weatherApiKey = process.env.WEATHER_API_KEY
var appName = process.env.APP_NAME
var appIcon = process.env.APP_ICON
var slackChannel = process.env.SLACK_CHANNEL

var messages = [
        'I need more :coffee: to work',
        'Hello there :simple_smile:',
        "It's time to :shipit:",
        "Robert approves :robert_approved:",
        'Ouch!! long click hurts man.',
];

function requestWeather(wh) {
    request({
        url: 'http://api.wunderground.com/api/' + weatherApiKey + '/forecast/q/Germany/Berlin.json',
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonResponse = JSON.parse(body); // turn response into JSON
            var dayForecast = jsonResponse.forecast.txt_forecast.forecastday[0];
            msg = 'The weather for today: ' + dayForecast.fcttext_metric;
            wh.send(msg, function onSendEnd() {
                console.log('Finished sending');
            });
        } else {
            console.log(error);
        }
    });
}

exports.handler = (event, context, callback) => {
    console.log('Received event:', event.clickType);

    var wh = new IncomingWebhook(url, {
        username: appName,
        iconEmoji: appIcon,
        channel: slackChannel
    });

    if (event.clickType == 'DOUBLE') {
        requestWeather(wh)
    } else {
        var randomNumber = Math.floor(Math.random()*messages.length);
        var msg = messages[randomNumber];
            wh.send(msg, function onSendEnd() {
            console.log('Finished sending');
        });
    }
};
