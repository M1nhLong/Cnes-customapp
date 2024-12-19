import { Injectable } from '@nestjs/common';
import { RestClient } from 'node_modules/@shopify/shopify-api/dist/ts/lib/clients/admin/rest/client';
import appConfig from 'src/config';
import { merchantRepo } from 'src/repositories';
import { EShopifyRestAPIWebhookTopics } from 'src/types/shopify.type';

// https://shopify.dev/docs/api/admin-rest/latest/resources/webhook#event-topics
// functions/src/types/shopify.type.ts#EShopifyRestAPIWebhookTopics
export const WEBHOOK_TOPICS = [
  EShopifyRestAPIWebhookTopics.APP_SUBSCRIPTIONS_UPDATE,
  EShopifyRestAPIWebhookTopics.APP_UNINSTALLED,
  EShopifyRestAPIWebhookTopics.SHOP_UPDATE,
];

@Injectable()
export class ShopifyWebhookService {
  static async registerWebhooks(client: RestClient): Promise<boolean> {
    for (let i = 0; i < WEBHOOK_TOPICS.length; i++) {
      const topic = WEBHOOK_TOPICS[i];
      const response = await client.post({
        path: 'webhooks.json',
        data: {
          webhook: {
            address: `https://${appConfig.shopify.app_url}/api/shopify/webhooks`,
            topic: topic,
            format: 'json',
          },
        },
      });
      if (response.body?.webhook) {
        await merchantRepo.insertWebhook(
          client.session.shop,
          response.body.webhook
        );
      }
    }
    return true;
  }

  static async deleteWebhooks(client: RestClient): Promise<boolean> {
    const webhooks = await this.getAllWebhooks(client);
    if (Array.isArray(webhooks)) {
      for (let i = 0; i < webhooks.length; i++) {
        const webhook = webhooks[i];

        await client.delete({
          path: `webhooks/${webhook.id}.json`,
        });
      }
    }

    return true;
  }

  static async getAllWebhooks(client: RestClient, isRetry: boolean = false) {
    try {
      const response = await client.get({ path: 'webhooks.json' });
      const isHasWebhooks = response.body?.webhooks?.length || '';
      if (isHasWebhooks !== '') {
        return response.body.webhooks;
      }
      return [];
    } catch (error) {
      if (!isRetry) {
        console.log('Error in first time, trying again.');
        return await this.getAllWebhooks(client);
      }
      console.log('getAllWebhooks -> error', error);
      return false;
    }
  }
}
