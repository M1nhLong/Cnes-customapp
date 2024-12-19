import { APP_VALID_ACTION, IAppActionTypes } from '../types/action-types';
interface IAppState {
  isValidRequest: boolean;
}

const initialState: IAppState = {
  isValidRequest: false,
};

const appReducer = (state = initialState, action: IAppActionTypes) => {
  switch (action.type) {
    case APP_VALID_ACTION:
      return {
        isValidRequest: true,
      };
    default:
      return state;
  }
};

export default appReducer;
