import { all, fork, takeLatest, put, throttle, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from '../types';

function sleep(sec) {
  return new Promise(resolve => setTimeout(resolve, sec * 1000));
}

function loadLoginUserAPI() {
  return axios.get(`/user`);
}

function* loadLoginUser() {
  try {

    console.log(`>>>>>>>`);
    // const result = yield call(loadLoginUserAPI);
    yield sleep(2);
    yield put({
      type: LOGIN_USER_SUCCESS,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOGIN_USER_FAILURE,
      error: e,
    });
  }
}

function* watchLoginUser() {
  yield takeLatest(LOGIN_USER_REQUEST, loadLoginUser);
}

export default function* companySaga() {
  yield all([
    fork(watchLoginUser),
  ]);
}