import produce, { Draft } from 'immer';
import {
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
} from '../types';

export const initialState = {
  loginUser: [],
  loginUserLoading: false,
  loginUserDone: false,
  loginUserError: null,
};

export type IUserReducerState = typeof initialState;

export default (state: IUserReducerState = initialState, action: any) =>
  produce(state, (draft: Draft<IUserReducerState>) => {
    switch (action.type) {
      case LOGIN_USER_REQUEST: {
        draft.loginUserLoading = true;
        draft.loginUserDone = false;
        draft.loginUserError = null;
        break;
      }
      case LOGIN_USER_SUCCESS: {
        draft.loginUserLoading = false;
        draft.loginUserDone = true;
        // @ts-ignore
        draft.loginUser.push({name: 'aaa'});
        break;
      }
      case LOGIN_USER_FAILURE: {
        draft.loginUserLoading = false;
        draft.loginUserError = action.error;
        break;
      }
      default: {
        break;
      }
    }
  });

