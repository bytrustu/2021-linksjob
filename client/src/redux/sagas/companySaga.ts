import { all, fork, takeLatest, put, throttle, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_MAIN_COMPANY_POSTS_REQUEST,
  LOAD_MAIN_COMPANY_POSTS_SUCCESS,
  LOAD_MAIN_COMPANY_POSTS_FAILURE,
  SEARCH_COMPANY_REQUEST,
  SEARCH_COMPANY_SUCCESS,
  SEARCH_COMPANY_FAILURE,
} from '../types';

function loadMainComapanyPostAPI() {
  return axios.get(`/company`);
}

function* loadMainComapanyPost() {
  try {
    const result = yield call(loadMainComapanyPostAPI);
    yield put({
      type: LOAD_MAIN_COMPANY_POSTS_SUCCESS,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_MAIN_COMPANY_POSTS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadMainComapanyPost() {
  yield takeLatest(LOAD_MAIN_COMPANY_POSTS_REQUEST, loadMainComapanyPost);
}

function searchCompanyAPI(action) {
  return axios.get(`/company/search/${encodeURI(action.data)}`);
}

function* searchCompany(action) {
  try {
    const result = yield call(searchCompanyAPI, action);
    yield put({
      type: SEARCH_COMPANY_SUCCESS,
      data: result
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SEARCH_COMPANY_FAILURE,
      error: e,
    });
  }
}

function* watchcompanySearch() {
  yield takeLatest(SEARCH_COMPANY_REQUEST, searchCompany);
}

export default function* companySaga() {
  yield all([
    fork(watchLoadMainComapanyPost),
    fork(watchcompanySearch),
  ]);
}