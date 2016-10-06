var merge = require('lodash.merge');
var auth = require('./auth.js');
var hfClient = require('./client.js');
var slack = require('./slack.js');
var date = require('./date.js');

var getRecipes = (tokenType, accessToken, params = {}, data = {}) => {
        var client = hfClient.createAuthorizedClient({
            domain: process.env.API_V2_URL
        }, {
            tokenType: tokenType,
            accessToken: accessToken
        });

        return client.get(merge({
            path: '/recipes',
        }, params));
}

var getCurrent = () => {
    return new Promise((fulfill, reject) => {
        auth.createPublicToken().then(result => {
            getRecipes(result.data.token_type, result.data.access_token, {
                params: { week: date.getCurrentWeek(), country: process.env.TEST_COUNTRY }
            })
            .then(fulfill)
            .catch(reject)
        }).catch(reject);
    });
}

module.exports = {
    getCurrent: getCurrent,
};