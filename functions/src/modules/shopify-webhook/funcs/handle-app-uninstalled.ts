import { HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { WEBHOOK_SHOP_DOMAIN_KEY } from 'src/constants';
import { merchantRepo, sessionRepo } from 'src/repositories';
import { isShopDomain } from 'src/utilities/is-shop-domain';

export async function handleAppUninstalled(req: Request, res: Response) {
  try {
    const shop = (req.headers[WEBHOOK_SHOP_DOMAIN_KEY] || '') as string;
    if (!isShopDomain(shop)) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error_code: HttpStatus.BAD_REQUEST,
        error_message: 'Error: Invalid shop',
      });
    }

    const existingSessions = await sessionRepo.findSessionsByShop(shop);
    if (existingSessions.length < 1) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error_code: HttpStatus.BAD_REQUEST,
        error_message: 'Error: Shop not found',
      });
    }

    await merchantRepo._updateByID(
      existingSessions[0].id.replace('offline_', ''),
      {
        is_installed: false,
        webhooks: [],
      }
    );

    await sessionRepo.deleteSession(existingSessions[0].id);

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: '',
    });
  } catch (error) {
    console.error('handleAppUninstalled -> error', error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error_code: HttpStatus.INTERNAL_SERVER_ERROR,
      error_message:
        error instanceof Error ? error.message : 'Internal server error',
    });
  }
}
