const AWS = require('aws-sdk');
var request = require('request');
var IncomingWebhook = require('@slack/client').IncomingWebhook;
var url = 'https://hooks.slack.com/services/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';
var weatherApiKey = '83fd9c6880730970'

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
        username: 'Mr. Roboot',
        iconEmoji: ':robot_face:',
        channel: 'squad-purchasing'
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
