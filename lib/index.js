'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _recipes = require('./recipes');

var _slack = require('./slack');

var _date = require('./date');

var _weather = require('./weather');

var weather = _interopRequireWildcard(_weather);

var _randomizer = require('./randomizer');

var random = _interopRequireWildcard(_randomizer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_dotenv2['default'].config();

exports.handler = function (event, context, callback) {
    console.log('Received event:', event.clickType);

    if (event.clickType == 'DOUBLE') {
        console.log("Double click pressed, preparing to request weather....");
        weather.current('germany', 'berlin').then(function (dayForecast) {
            console.log("Weather retrieved");
            var msg = 'The weather for today: ' + dayForecast.fcttext_metric;
            (0, _slack.sendMessage)(msg);
        })['catch'](console.log);
    } else if (event.clickType == 'LONG') {
        console.log("Long click pressed, preparing to request recipes....");
        (0, _recipes.getCurrent)().then(function (response) {
            console.log("Recipes retrieved");
            var recipes = response.data.items;
            var msg = "*Here is this week " + (0, _date.getCurrentWeek)() + " recipes* \n";

            for (var i = 0; i < recipes.length; i++) {
                var recipe = recipes[i];
                msg += '<https://hellofresh.com' + recipe.websiteUrl + '|' + recipe.name + '> \n';
            }

            (0, _slack.sendMessage)(msg);
        })['catch'](console.log);
    } else {
        console.log("Single click pressed, showing a random message....");
        (0, _slack.sendMessage)(random.message());
    }
};