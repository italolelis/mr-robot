'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createAuthorizedClient = exports.createAnonymousClient = undefined;

var _jsClient = require('js-client');

var _jsClient2 = _interopRequireDefault(_jsClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createAnonymousClient = exports.createAnonymousClient = function createAnonymousClient() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var domain = _ref.domain;
    var timeout = _ref.timeout;

    return new _jsClient2.default({
        domain: domain,
        timeout: timeout
    }, {});
};

var createAuthorizedClient = exports.createAuthorizedClient = function createAuthorizedClient() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var domain = _ref2.domain;
    var timeout = _ref2.timeout;

    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var tokenType = _ref3.tokenType;
    var accessToken = _ref3.accessToken;

    return new _jsClient2.default({
        domain: domain,
        timeout: timeout
    }, {
        token_type: tokenType, // eslint-disable-line camelcase
        access_token: accessToken });
};