import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import appConfig from 'src/config';
import admin from 'firebase-admin';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private allowedOrigins = [
    'https://admin.shopify.com',
    `https://${appConfig.shopify.app_url}`,
  ];
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const origin = req.headers.origin || '';
      if (!this.allowedOrigins.includes(origin)) {
        return res.status(HttpStatus.FORBIDDEN).json({
          error_code: HttpStatus.FORBIDDEN,
          error_message: 'Access denied',
        });
      }

      const idToken = (req.headers['x-app-token'] || '') as string;
      const shopAddress = (req.headers['x-app-shopify-domain'] || '') as string;

      if (idToken === '') {
        throw new Error('error/access-denied');
      }

      const verify = await admin.auth().verifyIdToken(idToken);
      if (verify) {
        req.headers['x-shop-domain'] = shopAddress;
        return next();
      }

      throw new Error('error/access-denied');
    } catch (error) {
      if (error instanceof Error) {
        if (!error.message.startsWith('error/')) {
          console.error(`AuthMiddleware.use -> error`, error);
        }
      }
      return res.status(HttpStatus.UNAUTHORIZED).json({
        error_code: HttpStatus.UNAUTHORIZED,
        error_message: 'Access denied',
      });
    }
  }
}
