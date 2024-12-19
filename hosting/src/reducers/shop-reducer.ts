import {
  ISession,
  IShop,
  IShopActionTypes,
  STORE_SHOP_DATA,
} from '../types/action-types';

interface IShopState {
  session: ISession | null;
  shop: IShop | null;
}

const initialState: IShopState = {
  session: null,
  shop: null,
};

const shopReducer = (state = initialState, action: IShopActionTypes) => {
  switch (action.type) {
    case STORE_SHOP_DATA:
      return {
        ...state,
        session: action.payload.session,
        shop: action.payload.shop,
      };
    default:
      return state;
  }
};

export default shopReducer;
