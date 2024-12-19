import { IMerchant, MERCHANT_LOGIN_ACTION } from '../types/action-types';

export const merchantLogin = (merchant: IMerchant) => {
  return {
    type: MERCHANT_LOGIN_ACTION,
    payload: merchant,
  };
};
