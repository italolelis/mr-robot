var HelloFreshClient = require('js-client').default;

var createAnonymousClient = ({ domain, timeout } = {}) => {
    return new HelloFreshClient({
        domain,
        timeout,
    }, {});
};

var createAuthorizedClient = ({ domain, timeout } = {}, { tokenType, accessToken } = {}) => {
    return new HelloFreshClient({
        domain,
        timeout,
    }, {
        token_type: tokenType, // eslint-disable-line camelcase
        access_token: accessToken, // eslint-disable-line camelcase
    });
};

module.exports = {
    createAnonymousClient:createAnonymousClient,
    createAuthorizedClient: createAuthorizedClient
};