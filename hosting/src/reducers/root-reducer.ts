import { combineReducers } from 'redux';
import merchantReducer from './merchant-reducer';
import appReducer from './app-reducer';
import shopReducer from './shop-reducer';

const rootReducer = combineReducers({
  merchant: merchantReducer,
  app: appReducer,
  shop: shopReducer,
});

export default rootReducer;
