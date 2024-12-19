import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import appConfig from 'src/config';

@Injectable()
export class ShopifyWebhookMiddleware implements NestMiddleware {
  SHOPIFY_API_SECRET: string;

  constructor() {
    this.SHOPIFY_API_SECRET = appConfig.shopify.app_secret;
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const rawBody = (req as any).rawBody;
    const hmac = req.headers['x-shopify-hmac-sha256'];
    if (!hmac) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error_code: HttpStatus.BAD_REQUEST,
        error_message: '',
      });
    }

    const isHmacValid = this.verifyHmac(rawBody, hmac as string);
    if (!isHmacValid) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        error_code: HttpStatus.UNAUTHORIZED,
        error_message: '',
      });
    }

    return next();
  }

  verifyHmac(rawBody: string, hmac: string) {
    const genHash = crypto
      .createHmac('sha256', this.SHOPIFY_API_SECRET)
      .update(rawBody, 'utf8')
      .digest('base64');

    const isHmacValid = crypto.timingSafeEqual(
      Buffer.from(hmac),
      Buffer.from(genHash)
    );

    return isHmacValid;
  }
}
