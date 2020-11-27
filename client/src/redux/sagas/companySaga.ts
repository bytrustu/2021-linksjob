import { all, fork, takeLatest, put, throttle, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  SEARCH_COMPANY_REQUEST,
  SEARCH_COMPANY_SUCCESS,
  SEARCH_COMPANY_FAILURE,
  PROCESS_COMPANY_REQUEST,
  PROCESS_COMPANY_SUCCESS,
  PROCESS_COMPANY_FAILURE,
  LOAD_RANK_REQUEST,
  LOAD_RANK_SUCCESS,
  LOAD_RANK_FAILURE,
  LOAD_REALTIME_SEARCH_REQUEST,
  LOAD_REALTIME_SEARCH_SUCCESS,
  LOAD_REALTIME_SEARCH_FAILURE,
  LOAD_FAVORITE_COMPANY_REQUEST,
  LOAD_FAVORITE_COMPANY_SUCCESS,
  LOAD_FAVORITE_COMPANY_FAILURE,
  ADD_FAVORITE_COMPANY_REQUEST,
  ADD_FAVORITE_COMPANY_SUCCESS,
  ADD_FAVORITE_COMPANY_FAILURE,
  REMOVE_FAVORITE_COMPANY_REQUEST,
  REMOVE_FAVORITE_COMPANY_SUCCESS,
  REMOVE_FAVORITE_COMPANY_FAILURE,
} from '../types';
import { IFavorite } from '../../type/Interfaces';


// SEARCH

function searchCompanyAPI(action) {
  return axios.get(`/company/search/${encodeURI(action.data)}`);
}

function* searchCompany(action) {
  try {
    const result = yield call(searchCompanyAPI, action);
    yield put({
      type: SEARCH_COMPANY_SUCCESS,
      data: result,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SEARCH_COMPANY_FAILURE,
      error: e,
    });
  }
}

function* watchCompanySearch() {
  yield takeLatest(SEARCH_COMPANY_REQUEST, searchCompany);
}


// PROCESS

function processCompanyAPI(action) {
  return axios.get(`/process/${encodeURI(action.data)}`);
}

function* processCompany(action) {
  try {
    const result = yield call(processCompanyAPI, action);
    yield put({
      type: PROCESS_COMPANY_SUCCESS,
      data: result,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: PROCESS_COMPANY_FAILURE,
      error: e,
    });
  }
}

function* watchProcessCompany() {
  yield takeLatest(PROCESS_COMPANY_REQUEST, processCompany);
}

// Rank

function loadRankAPI() {
  return axios.get(`/company/rank`);
}

function* loadRank() {
  try {
    const result = yield call(loadRankAPI);
    yield put({
      type: LOAD_RANK_SUCCESS,
      data: result,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_RANK_FAILURE,
      error: e,
    });
  }
}

function* watchLoadRank() {
  yield takeLatest(LOAD_RANK_REQUEST, loadRank);
}

// RealtimeSearch

function loadRealtimeSearchAPI() {
  return axios.get(`/company/realtime/keyword`);
}

function* loadRealtimeSearch() {
  try {
    const result = yield call(loadRealtimeSearchAPI);
    yield put({
      type: LOAD_REALTIME_SEARCH_SUCCESS,
      data: result,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_REALTIME_SEARCH_FAILURE,
      error: e,
    });
  }
}

function* watchLoadRealtimeSearch() {
  yield takeLatest(LOAD_REALTIME_SEARCH_REQUEST, loadRealtimeSearch);
}

// Load Favorite

function loadFavoriteCompanyAPI() {
  return axios.get(`/company/favorite`);
}

function* loadFavoriteCompany() {
  try {
    const result = yield call(loadFavoriteCompanyAPI);
    yield put({
      type: LOAD_FAVORITE_COMPANY_SUCCESS,
      data: result,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_FAVORITE_COMPANY_FAILURE,
      error: e,
    });
  }
}

function* watchLoadFavoriteCompany() {
  yield takeLatest(LOAD_FAVORITE_COMPANY_REQUEST, loadFavoriteCompany);
}

// Add Favorite
function addFavoriteCompanyAPI(data: string) {
  return axios.post(`/company/favorite/${data}`);
}

function* addFavoriteCompany(action) {
  try {
    const result = yield call(addFavoriteCompanyAPI, action.data);
    yield put({
      type: ADD_FAVORITE_COMPANY_SUCCESS,
      data: result,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: ADD_FAVORITE_COMPANY_FAILURE,
      error: e,
    });
  }
}

function* watchAddFavoriteCompany() {
  yield takeLatest(ADD_FAVORITE_COMPANY_REQUEST, addFavoriteCompany);
}

// Remove Favorite

function removeFavoriteCompanyAPI(data:string) {
  return axios.delete(`/company/favorite/${data}`, );
}

function* removeFavoriteCompany(action) {
  try {
    const result = yield call(removeFavoriteCompanyAPI, action.data);
    yield put({
      type: REMOVE_FAVORITE_COMPANY_SUCCESS,
      data: result,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: REMOVE_FAVORITE_COMPANY_FAILURE,
      error: e,
    });
  }
}

function* watchRemoveFavoriteCompany() {
  yield takeLatest(REMOVE_FAVORITE_COMPANY_REQUEST, removeFavoriteCompany);
}

export default function* companySaga() {
  yield all([
    fork(watchCompanySearch),
    fork(watchProcessCompany),
    fork(watchLoadRank),
    fork(watchLoadRealtimeSearch),
    fork(watchLoadFavoriteCompany),
    fork(watchAddFavoriteCompany),
    fork(watchRemoveFavoriteCompany),
  ]);
}