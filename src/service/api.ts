import { GraphQLClient } from 'graphql-request';

import { getSdk } from '../generated/graphql';

export const client = new GraphQLClient('http://localhost:5000/graphql/');
export const Api = getSdk(client);
