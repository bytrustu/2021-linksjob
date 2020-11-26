import produce, { Draft } from 'immer';
import {
  SEARCH_COMPANY_FAILURE,
  SEARCH_COMPANY_REQUEST,
  SEARCH_COMPANY_SUCCESS,
  PROCESS_COMPANY_FAILURE,
  PROCESS_COMPANY_REQUEST,
  PROCESS_COMPANY_SUCCESS,
  LOAD_RANK_FAILURE,
  LOAD_RANK_REQUEST,
  LOAD_RANK_SUCCESS,
  LOAD_REALTIME_SEARCH_REQUEST,
  LOAD_REALTIME_SEARCH_SUCCESS,
  LOAD_REALTIME_SEARCH_FAILURE,
} from '../types';

export const initialState = {
  companySearchData: null,
  companySearchLoading: false,
  companySearchDone: false,
  companySearchError: null,
  loadRankData: null,
  loadRankLoading: false,
  loadRankDone: false,
  loadRankError: null,
  loadRealtimeSearchData: null,
  loadRealtimeSearchLoading: false,
  loadRealtimeSearchDone: false,
  loadRealtimeSearchError: null,
};

export const searchRequestAction = (searchText: string) => ({
  type: SEARCH_COMPANY_REQUEST,
  data: searchText,
});

export const processCompanyAction = (company: string) => ({
  type: PROCESS_COMPANY_REQUEST,
  data: company,
});

export const loadRankAction = () => ({
  type: LOAD_RANK_REQUEST,
});

export const loadRealtimeSearchAction = () => ({
  type: LOAD_REALTIME_SEARCH_REQUEST,
});

export type CompanyAction =
  | ReturnType<typeof searchRequestAction>
  | ReturnType<typeof processCompanyAction>
  | ReturnType<typeof loadRankAction>
  | ReturnType<typeof loadRealtimeSearchAction>;

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
      case LOAD_RANK_REQUEST: {
        draft.loadRankLoading = true;
        draft.loadRankDone = false;
        draft.loadRankError = null;
        break;
      }
      case LOAD_RANK_SUCCESS: {
        draft.loadRankLoading = false;
        draft.loadRankDone = true;
        draft.loadRankData = action.data.data ? action.data.data : [];
        break;
      }
      case LOAD_RANK_FAILURE: {
        draft.loadRankLoading = false;
        draft.loadRankError = action.error;
        break;
      }
      case LOAD_REALTIME_SEARCH_REQUEST: {
        draft.loadRealtimeSearchLoading = true;
        draft.loadRealtimeSearchDone = false;
        draft.loadRealtimeSearchError = null;
        break;
      }
      case LOAD_REALTIME_SEARCH_SUCCESS: {
        draft.loadRealtimeSearchLoading = false;
        draft.loadRealtimeSearchDone = true;
        draft.loadRealtimeSearchData = action.data.data ? action.data.data : [];
        break;
      }
      case LOAD_REALTIME_SEARCH_FAILURE: {
        draft.loadRealtimeSearchLoading = false;
        draft.loadRealtimeSearchError = action.error;
        break;
      }
      default: {
        break;
      }
    }
  });

