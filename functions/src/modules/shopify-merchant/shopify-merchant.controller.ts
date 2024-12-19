import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { merchantRepo, sessionRepo, shopRepo } from 'src/repositories';
import {
  ShopifyWebhookService,
  WEBHOOK_TOPICS,
} from '../shopify-webhook/shopify-webhook.service';
import { createShopifyRestAPIClient, pick, sleep } from 'src/utilities';

@Controller('shopify/merchant')
export class ShopifyMerchantController {
  @Post('verify')
  async verify(@Req() req: Request, @Res() res: Response) {
    try {
      const shop = req.headers['x-shop-domain'] as string;
      if (shop === '') {
        return res.status(HttpStatus.BAD_REQUEST).json({
          error_code: HttpStatus.BAD_REQUEST,
          error_message: 'Unable to verify identity',
        });
      }

      const existingSessions = await sessionRepo.findSessionsByShop(shop);
      if (existingSessions.length < 1) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          error_code: HttpStatus.BAD_REQUEST,
          error_message: 'Unable to verify identity',
        });
      }

      const client = createShopifyRestAPIClient(existingSessions[0]);

      const existingShops = await shopRepo.findShopByShopifyDomain(
        existingSessions[0].shop
      );

      if (existingShops.length < 1) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          error_code: HttpStatus.BAD_REQUEST,
          error_message: 'Unable to verify identity',
        });
      }

      let existingMerchants = await merchantRepo.findMerchantByShop(
        existingShops[0].myshopify_domain
      );

      if (existingMerchants.length < 1) {
        const initialMerchantData = {
          is_installed: true,
          shop: existingShops[0].myshopify_domain,
          webhooks: [],
        };
        await merchantRepo.createMerchant(initialMerchantData);
        existingMerchants[0] = initialMerchantData;
      }

      if (!existingMerchants[0]?.is_installed) {
        const shopResponse = await client.get({
          path: '/shop.json',
        });

        if (!shopResponse?.body?.shop?.id) {
          return res.status(HttpStatus.BAD_REQUEST).json({
            error_code: HttpStatus.BAD_REQUEST,
            error_message: 'Inactive merchant',
          });
        }

        await merchantRepo._updateByID(existingSessions[0].shop, {
          is_installed: true,
        });
      }

      if (existingMerchants[0]?.webhooks?.length !== WEBHOOK_TOPICS.length) {
        await merchantRepo.removeAllWebhooks(existingMerchants[0].shop);
        await ShopifyWebhookService.deleteWebhooks(client);
        await sleep(300);
        try {
          ShopifyWebhookService.registerWebhooks(client);
        } catch (error) {
          console.error(`ShopifyMerchantController.verify:registerWebhooks -> error`, error);
        }
      }

      const filteredSession = pick(existingSessions[0], ['shop']);
      // functions/src/types/shopify.type.ts#IShopifyShop
      const filteredShop = pick(existingShops[0], [
        'id',
        'email',
        'domain',
        'myshopify_domain',
        'plan_name',
        'name'
      ]);

      return res.status(HttpStatus.OK).json({
        code: 200,
        message: '',
        data: {
          session: filteredSession,
          shop: filteredShop,
        },
      });
    } catch (error) {
      console.error('ShopifyMerchantController.verify -> error', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error_code: HttpStatus.INTERNAL_SERVER_ERROR,
        error_message:
          error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }
}
