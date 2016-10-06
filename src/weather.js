var request = require('request');

const WEATHER_SEARCH_URL = '/forecast/q/';

var capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var requestWeather = (domain, weatherApiKey, country, city) => {
    var url = domain + weatherApiKey + WEATHER_SEARCH_URL + capitalizeFirstLetter(country) + '/' + capitalizeFirstLetter(city) + '.json';

    return new Promise((fulfill, reject) => {
        request({
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
}

var current = (country, city) => {
    return requestWeather(
            process.env.WEATHER_URL, 
            process.env.WEATHER_API_KEY,
            country,
            city
        )
        .then(JSON.parse)
        .then((jsonResponse) => {
            return jsonResponse.forecast.txt_forecast.forecastday[0];         
        });
}

module.exports = {
    current: current,
};