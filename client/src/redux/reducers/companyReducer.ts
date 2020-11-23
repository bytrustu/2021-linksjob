import produce from 'immer';
import {
  LOAD_MAIN_COMPANY_POSTS_FAILURE,
  LOAD_MAIN_COMPANY_POSTS_REQUEST,
  LOAD_MAIN_COMPANY_POSTS_SUCCESS,
} from '../types';

export const initialState = {
  mainCompanyPosts: [],
}

export type ICompanyReducerState = typeof initialState;

// @ts-ignore
export default (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_MAIN_COMPANY_POSTS_REQUEST: {
      draft.mainCompanyPosts = !action.lastId ? [] : draft.mainCompanyPosts;
      break;
    }
    case LOAD_MAIN_COMPANY_POSTS_SUCCESS: {
      break;
    }
    case LOAD_MAIN_COMPANY_POSTS_FAILURE: {
      break;
    }
    default: {
      break;
    }
  }
});

