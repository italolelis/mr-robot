require('dotenv').config();

const AWS = require('aws-sdk');
var request = require('request');
var recipes = require('./recipes.js');
var slack = require('./slack.js');
var date = require('./date.js');
var weather = require('./weather.js');
var random = require('./randomizer.js');

exports.handler = (event, context, callback) => {
    console.log('Received event:', event.clickType);

    if (event.clickType == 'DOUBLE') {
        console.log("Double click pressed, preparing to request weather....");
        weather.current('germany', 'berlin').then(dayForecast => {
            console.log("Weather retrieved");
            var msg = 'The weather for today: ' + dayForecast.fcttext_metric;
            slack.sendMessage(msg);
        }).catch(console.log);
    } else if (event.clickType == 'LONG') {
        console.log("Long click pressed, preparing to request recipes....");
        recipes.getCurrent().then(response => {
            console.log("Recipes retrieved");
            var recipes = response.data.items;
            var msg = "*Here is this week " + date.getCurrentWeek() + " recipes* \n";

            for (var i = 0; i < recipes.length; i++) {
                var recipe = recipes[i];
                msg += '<https://hellofresh.com' + recipe.websiteUrl + '|' + recipe.name + '> \n';
            }

            slack.sendMessage(msg);
        }).catch(console.log);
    } else {
        console.log("Single click pressed, showing a random message....");
        slack.sendMessage(random.message())
    }
};
