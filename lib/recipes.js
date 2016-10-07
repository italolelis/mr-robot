'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCurrent = exports.getRecipes = undefined;

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _auth = require('./auth');

var _client = require('./client');

var _date = require('./date');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRecipes = exports.getRecipes = function getRecipes(tokenType, accessToken) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var client = (0, _client.createAuthorizedClient)({
        domain: process.env.API_V2_URL
    }, {
        tokenType: tokenType,
        accessToken: accessToken
    });

    return client.get((0, _merge2.default)({
        path: '/recipes'
    }, params));
};

var getCurrent = exports.getCurrent = function getCurrent() {
    return new Promise(function (fulfill, reject) {
        (0, _auth.createPublicToken)().then(function (result) {
            getRecipes(result.data.token_type, result.data.access_token, {
                params: { week: (0, _date.getCurrentWeek)(), country: process.env.TEST_COUNTRY }
            }).then(fulfill).catch(reject);
        }).catch(reject);
    });
};