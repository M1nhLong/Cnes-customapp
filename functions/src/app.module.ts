import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from './modules/auth/auth.middleware';
import { RawBodyMiddleware } from './modules/raw-body/raw-body.middleware';
import { ShopifyAuthController } from './modules/shopify-auth/shopify-auth.controller';
import { ShopifyMerchantController } from './modules/shopify-merchant/shopify-merchant.controller';
import { ShopifySubscriptionService } from './modules/shopify-subscription/shopify-subscription.service';
import { ShopifyWebhookController } from './modules/shopify-webhook/shopify-webhook.controller';
import { ShopifyWebhookMiddleware } from './modules/shopify-webhook/shopify-webhook.middleware';
import { ShopifyWebhookService } from './modules/shopify-webhook/shopify-webhook.service';

@Module({
  imports: [],
  controllers: [
    ShopifyAuthController,
    ShopifyMerchantController,
    ShopifyWebhookController,
  ],
  providers: [ShopifyWebhookService, ShopifySubscriptionService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'shopify/auth', method: RequestMethod.GET },
        { path: 'shopify/auth/callback', method: RequestMethod.GET },
        { path: 'shopify/webhooks', method: RequestMethod.POST }
      )
      .forRoutes('*');

    consumer.apply(RawBodyMiddleware).forRoutes({
      path: 'shopify/webhooks',
      method: RequestMethod.POST,
    });

    consumer.apply(ShopifyWebhookMiddleware).forRoutes({
      path: 'shopify/webhooks',
      method: RequestMethod.POST,
    });
  }
}
