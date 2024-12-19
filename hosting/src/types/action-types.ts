export const MERCHANT_LOGIN_ACTION = '@@MERCHANT/LOGIN';
export const MERCHANT_LOGOUT_ACTION = '@@MERCHANT/LOGOUT';
export const APP_VALID_ACTION = '@@APP/APP_VALID';
export const STORE_SHOP_DATA = '@SHOP/DATA';

interface IMerchantLoginAction {
  type: typeof MERCHANT_LOGIN_ACTION;
  payload: IMerchant;
}

interface IMerchantLogoutAction {
  type: typeof MERCHANT_LOGOUT_ACTION;
}

export type IMerchantActionTypes = IMerchantLoginAction | IMerchantLogoutAction;

export interface IMerchant {}

interface IAppAction {
  type: typeof APP_VALID_ACTION;
}

export type IAppActionTypes = IAppAction;

export interface IShop {
  id: number;
  email: string;
  domain: string;
  myshopify_domain: string;
  plan_name: string;
  name: string;
}
export interface ISession {}

interface IShopAction {
  type: typeof STORE_SHOP_DATA;
  payload: {
    session: ISession;
    shop: IShop;
  };
}

export type IShopActionTypes = IShopAction;
