import { all, fork, takeLatest, put, throttle, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
} from '../types';
import { IUserData } from '../../type/Interfaces';


// login

function loginUserAPI(userData: IUserData) {
  return axios.post(`/user/login`, userData);
}

function* loginUser(action: any) {
  try {
    const result = yield call(loginUserAPI, action.data);
    yield put({
      type: LOGIN_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOGIN_USER_FAILURE,
      error: e.response,
    });
  }
}

function* watchLoginUser() {
  yield takeLatest(LOGIN_USER_REQUEST, loginUser);
}

// register

function registerUserAPI(userData: IUserData) {
  return axios.post(`/user/register`, userData);
}

function* registerUser(action: any) {
  try {
    const result = yield call(registerUserAPI, action.data);
    yield put({
      type: REGISTER_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: REGISTER_USER_FAILURE,
      error: e.response,
    });
  }
}

function* watchRegisterUser() {
  yield takeLatest(REGISTER_USER_REQUEST, registerUser);
}

// loadUser

function loadUserAPI() {
  return axios.get(`/user/auth`);
}

function* loadUser() {
  try {
    const result = yield call(loadUserAPI);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result,
    });
  } catch (e) {
    yield put({
      type: LOAD_USER_FAILURE,
      error: e.response,
    });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

// logout

function* logoutUser() {
  try {
    yield put({
      type: LOGOUT_USER_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: LOGOUT_USER_FAILURE,
      error: e.response,
    });
  }
}

function* watchLogoutUser() {
  yield takeLatest(LOGOUT_USER_REQUEST, logoutUser);
}

export default function* companySaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchRegisterUser),
    fork(watchLoadUser),
    fork(watchLogoutUser),
  ]);
}