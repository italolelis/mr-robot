'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createPublicToken = exports.fetchPublicToken = undefined;

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _client = require('./client');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var CLIENT_ACCESS_TOKEN_URL = '/auth/oauth2/client/access_token';
var PUBLIC_GRANT_TYPE = 'client_credentials';
var PUBLIC_SCOPE = 'public';

var fetchPublicToken = exports.fetchPublicToken = function fetchPublicToken(client) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return client.post({
        path: CLIENT_ACCESS_TOKEN_URL,
        params: params,
        data: (0, _merge2['default'])({
            grant_type: PUBLIC_GRANT_TYPE,
            scope: PUBLIC_SCOPE
        }, data)
    });
};

var createPublicToken = exports.createPublicToken = function createPublicToken() {
    var client = (0, _client.createAnonymousClient)({
        domain: process.env.API_V2_URL
    });

    return fetchPublicToken(client, {
        country: process.env.TEST_COUNTRY
    }, {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
    });
};