import HelloFreshClient from 'js-client';

export const createAnonymousClient = ({ domain, timeout } = {}) => {
    return new HelloFreshClient({
        domain,
        timeout,
    }, {});
};

export const createAuthorizedClient = ({ domain, timeout } = {}, { tokenType, accessToken } = {}) => {
    return new HelloFreshClient({
        domain,
        timeout,
    }, {
        token_type: tokenType, // eslint-disable-line camelcase
        access_token: accessToken, // eslint-disable-line camelcase
    });
};
