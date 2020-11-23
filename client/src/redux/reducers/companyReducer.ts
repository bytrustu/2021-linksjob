import produce from 'immer';
import {
  LOAD_MAIN_COMPANY_POSTS_FAILURE,
  LOAD_MAIN_COMPANY_POSTS_REQUEST,
  LOAD_MAIN_COMPANY_POSTS_SUCCESS,
} from '../types';

export const initialState = {
  mainCompanyPosts: [],
  mainCompanyPostsLoading: false,
  mainCompanyPostsDone: false,
  mainCompanyPostsError: null,
};

export type ICompanyReducerState = typeof initialState;

export default (state: ICompanyReducerState = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MAIN_COMPANY_POSTS_REQUEST: {
        draft.mainCompanyPostsLoading = true;
        draft.mainCompanyPostsDone = false;
        draft.mainCompanyPostsError = null;
        break;
      }
      case LOAD_MAIN_COMPANY_POSTS_SUCCESS: {
        draft.mainCompanyPostsLoading = false;
        draft.mainCompanyPostsDone = true;
        draft.mainCompanyPosts = draft.mainCompanyPosts.concat(action.data);
        break;
      }
      case LOAD_MAIN_COMPANY_POSTS_FAILURE: {
        draft.mainCompanyPostsLoading = false;
        draft.mainCompanyPostsError = action.error;
        break;
      }
      default: {
        break;
      }
    }
  });

