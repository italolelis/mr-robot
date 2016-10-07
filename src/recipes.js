import merge from 'lodash/merge';
import {createPublicToken} from './auth'
import {createAuthorizedClient} from './client';
import {getCurrentWeek} from './date';

export const getRecipes = (tokenType, accessToken, params = {}, data = {}) => {
        const client = createAuthorizedClient({
            domain: process.env.API_V2_URL
        }, {
            tokenType: tokenType,
            accessToken: accessToken
        });

        return client.get(merge({
            path: '/recipes',
        }, params));
}

export const getCurrent = () => {
    return new Promise((fulfill, reject) => {
        createPublicToken().then(result => {
            getRecipes(result.data.token_type, result.data.access_token, {
                params: { week: getCurrentWeek(), country: process.env.TEST_COUNTRY }
            })
            .then(fulfill)
            .catch(reject)
        }).catch(reject);
    });
}
