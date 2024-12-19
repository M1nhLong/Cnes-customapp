import {
  Controller,
  Headers,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { handleAppUninstalled, handleShopUpdate } from './funcs';
import {
  EShopifyRestAPIMandatoryWebhookTopics,
  EShopifyRestAPIWebhookTopics,
} from 'src/types/shopify.type';

@Controller('shopify/webhooks')
export class ShopifyWebhookController {
  @Post()
  async post(
    @Headers() headers: Record<string, string>,
    @Res() res: Response,
    @Req() req: Request
  ) {
    const topic = headers['x-shopify-topic'];

    switch (topic) {
      /**
       * Mandatory webhooks
       */
      case EShopifyRestAPIMandatoryWebhookTopics.CUSTOMERS_DATA_REQUEST:
        break;
      case EShopifyRestAPIMandatoryWebhookTopics.CUSTOMERS_REDACT:
        break;
      case EShopifyRestAPIMandatoryWebhookTopics.SHOP_REDACT:
        break;

      case EShopifyRestAPIWebhookTopics.SHOP_UPDATE:
        return await handleShopUpdate(req, res);

      case EShopifyRestAPIWebhookTopics.APP_UNINSTALLED:
        return await handleAppUninstalled(req, res);

      default:
        console.error(
          'ShopifyWebhookController.post -> error',
          `Unhandle topic: ${topic}`
        );
        return res.status(HttpStatus.BAD_REQUEST).json({
          error_code: HttpStatus.BAD_REQUEST,
          message: '',
        });
    }

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: '',
    });
  }
}
