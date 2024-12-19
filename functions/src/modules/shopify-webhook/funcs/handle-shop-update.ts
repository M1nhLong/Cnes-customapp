import { HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { WEBHOOK_SHOP_DOMAIN_KEY } from 'src/constants';
import { shopRepo } from 'src/repositories';
import { isShopDomain } from 'src/utilities';

export async function handleShopUpdate(req: Request, res: Response) {
  try {
    const shop = (req.headers[WEBHOOK_SHOP_DOMAIN_KEY] || '') as string;
    if (!isShopDomain(shop)) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error_code: HttpStatus.BAD_REQUEST,
        error_message: 'Error: Invalid shop',
      });
    }

    const existingShops = await shopRepo.findShopByShopifyDomain(shop);
    if (existingShops.length < 1) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error_code: HttpStatus.BAD_REQUEST,
        error_message: 'Error: Shop not found',
      });
    }

    await shopRepo._updateByID(shop, req.body);

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: '',
    });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error_code: HttpStatus.INTERNAL_SERVER_ERROR,
      error_message:
        error instanceof Error ? error.message : 'Internal server error',
    });
  }
}
