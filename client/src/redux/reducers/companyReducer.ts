import produce, { Draft } from 'immer';
import {
  LOAD_MAIN_COMPANY_POSTS_FAILURE,
  LOAD_MAIN_COMPANY_POSTS_REQUEST,
  LOAD_MAIN_COMPANY_POSTS_SUCCESS,
  SEARCH_COMPANY_FAILURE,
  SEARCH_COMPANY_REQUEST,
  SEARCH_COMPANY_SUCCESS,
} from '../types';

export const initialState = {
  mainCompanyPosts: [],
  mainCompanyPostsLoading: false,
  mainCompanyPostsDone: false,
  mainCompanyPostsError: null,
  companySearchData: null,
  companySearchLoading: false,
  companySearchDone: false,
  companySearchError: null,
};

export type ICompanyReducerState = typeof initialState;

export default (state: ICompanyReducerState = initialState, action: any) =>
  produce(state, (draft: Draft<ICompanyReducerState>) => {
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
      case SEARCH_COMPANY_REQUEST: {
        draft.companySearchLoading = true;
        draft.companySearchDone = false;
        draft.companySearchError = null;
        break;
      }
      case SEARCH_COMPANY_SUCCESS: {
        draft.companySearchLoading = false;
        draft.companySearchDone = true;
        draft.companySearchData = action.data.data ? action.data.data : {};
        break;
      }
      case SEARCH_COMPANY_FAILURE: {
        draft.mainCompanyPostsLoading = false;
        draft.mainCompanyPostsError = action.error;
        break;
      }
      default: {
        break;
      }
    }
  });

