'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.current = undefined;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WEATHER_SEARCH_URL = '/forecast/q/';

var capitalizeFirstLetter = function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

var requestWeather = function requestWeather(domain, weatherApiKey, country, city) {
    var url = domain + weatherApiKey + WEATHER_SEARCH_URL + capitalizeFirstLetter(country) + '/' + capitalizeFirstLetter(city) + '.json';

    return new Promise(function (fulfill, reject) {
        (0, _request2.default)({
            url: url,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                fulfill(body);
            } else {
                reject(error);
            }
        });
    });
};

var current = exports.current = function current(country, city) {
    return requestWeather(process.env.WEATHER_URL, process.env.WEATHER_API_KEY, country, city).then(JSON.parse).then(function (jsonResponse) {
        return jsonResponse.forecast.txt_forecast.forecastday[0];
    });
};