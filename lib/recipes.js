'use strict';

var merge = require('lodash.merge');
var auth = require('./auth.js');
var hfClient = require('./client.js');
var slack = require('./slack.js');
var date = require('./date.js');

var getRecipes = function getRecipes(tokenType, accessToken) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var client = hfClient.createAuthorizedClient({
        domain: process.env.API_V2_URL
    }, {
        tokenType: tokenType,
        accessToken: accessToken
    });

    return client.get(merge({
        path: '/recipes'
    }, params));
};

var getCurrent = function getCurrent() {
    return new Promise(function (fulfill, reject) {
        auth.createPublicToken().then(function (result) {
            getRecipes(result.data.token_type, result.data.access_token, {
                params: { week: date.getCurrentWeek(), country: process.env.TEST_COUNTRY }
            }).then(fulfill)['catch'](reject);
        })['catch'](reject);
    });
};

module.exports = {
    getCurrent: getCurrent
};