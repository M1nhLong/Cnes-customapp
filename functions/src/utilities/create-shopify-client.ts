import { GraphqlClient, Session } from '@shopify/shopify-api';
import { RestClient } from 'node_modules/@shopify/shopify-api/dist/ts/lib/clients/admin/rest/client';
import { shopify } from 'src/main';

export function createShopifyRestAPIClient(session: Session): RestClient {
  return new shopify.clients.Rest({ session });
}

export function createShopifyGraphQLAPIClient(session: Session): GraphqlClient {
  return new shopify.clients.Graphql({ session });
}
