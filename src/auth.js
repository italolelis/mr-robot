import merge from 'lodash/merge';
import {createAnonymousClient} from './client';

const CLIENT_ACCESS_TOKEN_URL = '/auth/oauth2/client/access_token';
const PUBLIC_GRANT_TYPE = 'client_credentials';
const PUBLIC_SCOPE = 'public';

export const fetchPublicToken = (client, params = {}, data = {}) => {
    return client.post({
        path: CLIENT_ACCESS_TOKEN_URL,
        params,
        data: merge({
            grant_type: PUBLIC_GRANT_TYPE,
            scope: PUBLIC_SCOPE,
        }, data),
    });
};

export const createPublicToken = () => {
     const client = createAnonymousClient({
         domain: process.env.API_V2_URL,
     });
 
     return fetchPublicToken(client, {
         country: process.env.TEST_COUNTRY,
     }, {
         client_id: process.env.CLIENT_ID,
         client_secret: process.env.CLIENT_SECRET,
     });
 };
