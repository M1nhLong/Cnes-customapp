import { ISession, IShop, STORE_SHOP_DATA } from '../types/action-types';

export const storeShopifyShopData = ({
  session,
  shop,
}: {
  session: ISession;
  shop: IShop;
}) => {
  return {
    type: STORE_SHOP_DATA,
    payload: { session, shop },
  };
};
