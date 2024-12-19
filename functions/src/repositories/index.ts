import { MerchantRepository } from './merchant.repository';
import { SessionRepository } from './session.repository';
import { ShopRepository } from './shop.repository';

export const sessionRepo = new SessionRepository();
export const shopRepo = new ShopRepository();
export const merchantRepo = new MerchantRepository();
