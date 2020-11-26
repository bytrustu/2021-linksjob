import produce, { Draft } from 'immer';
import {
  LOAD_MAIN_COMPANY_POSTS_FAILURE,
  LOAD_MAIN_COMPANY_POSTS_REQUEST,
  LOAD_MAIN_COMPANY_POSTS_SUCCESS,
  SEARCH_COMPANY_FAILURE,
  SEARCH_COMPANY_REQUEST,
  SEARCH_COMPANY_SUCCESS,
  PROCESS_COMPANY_FAILURE,
  PROCESS_COMPANY_REQUEST,
  PROCESS_COMPANY_SUCCESS,
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
  processCompanyLoading: false,
  processCompanyDone: false,
  processCompanyError: null,
  processCompanyData: null,
};

export const searchRequestAction = (searchText: string) => ({
  type: SEARCH_COMPANY_REQUEST,
  data: searchText,
});

export const processCompanyAction = (company: string) => ({
  type: PROCESS_COMPANY_REQUEST,
  data: company,
});

export type CompanyAction =
  | ReturnType<typeof searchRequestAction>
  | ReturnType<typeof processCompanyAction>;

export type ICompanyReducerState = typeof initialState;

export default (state: ICompanyReducerState = initialState, action: CompanyAction) =>
  produce(state, (draft: Draft<ICompanyReducerState>) => {
    switch (action.type) {
      case SEARCH_COMPANY_REQUEST:
      case PROCESS_COMPANY_REQUEST: {
        draft.companySearchLoading = true;
        draft.companySearchDone = false;
        draft.companySearchError = null;
        break;
      }
      case SEARCH_COMPANY_SUCCESS:
      case PROCESS_COMPANY_SUCCESS: {
        draft.companySearchLoading = false;
        draft.companySearchDone = true;
        draft.companySearchData = action.data.data ? action.data.data : {};
        break;
      }
      case SEARCH_COMPANY_FAILURE:
      case PROCESS_COMPANY_FAILURE: {
        draft.companySearchLoading = false;
        draft.companySearchError = action.error;
        break;
      }
      // case PROCESS_COMPANY_REQUEST: {
      //   draft.processCompanyLoading = true;
      //   draft.processCompanyDone = false;
      //   draft.processCompanyError = null;
      //   break;
      // }
      // case PROCESS_COMPANY_SUCCESS: {
      //   draft.processCompanyLoading = false;
      //   draft.processCompanyDone = true;
      //   draft.processCompanyData = action.data.data ? action.data.data : null;
      //   break;
      // }
      // case PROCESS_COMPANY_FAILURE: {
      //   draft.processCompanyLoading = false;
      //   draft.processCompanyError = action.error;
      //   break;
      // }
      default: {
        break;
      }
    }
  });

