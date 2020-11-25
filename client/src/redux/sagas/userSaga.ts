import { all, fork, takeLatest, put, throttle, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_MAIN_COMPANY_POSTS_REQUEST,
  LOAD_MAIN_COMPANY_POSTS_SUCCESS,
  LOAD_MAIN_COMPANY_POSTS_FAILURE,
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

export default function* companySaga() {
  yield all([
    fork(watchLoadMainComapanyPost),
  ]);
}