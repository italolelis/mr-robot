'use strict';

var HelloFreshClient = require('js-client')['default'];

var createAnonymousClient = function createAnonymousClient() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var domain = _ref.domain;
    var timeout = _ref.timeout;

    return new HelloFreshClient({
        domain: domain,
        timeout: timeout
    }, {});
};

var createAuthorizedClient = function createAuthorizedClient() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var domain = _ref2.domain;
    var timeout = _ref2.timeout;

    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var tokenType = _ref3.tokenType;
    var accessToken = _ref3.accessToken;

    return new HelloFreshClient({
        domain: domain,
        timeout: timeout
    }, {
        token_type: tokenType, // eslint-disable-line camelcase
        access_token: accessToken });
};

module.exports = {
    createAnonymousClient: createAnonymousClient,
    createAuthorizedClient: createAuthorizedClient
};