import {
  IMerchant,
  IMerchantActionTypes,
  MERCHANT_LOGIN_ACTION,
  MERCHANT_LOGOUT_ACTION,
} from '../types/action-types';

interface IMerchantState {
  isAuthenticated: boolean;
  data: IMerchant | null;
}

const initialState: IMerchantState = {
  isAuthenticated: false,
  data: null,
};

const merchantReducer = (
  state = initialState,
  action: IMerchantActionTypes
) => {
  switch (action.type) {
    case MERCHANT_LOGIN_ACTION:
      return {
        ...state,
        isAuthenticated: true,
        merchant: action.payload,
      };
    case MERCHANT_LOGOUT_ACTION:
      return {
        ...state,
        isAuthenticated: false,
        merchant: null,
      };
    default:
      return state;
  }
};

export default merchantReducer;
