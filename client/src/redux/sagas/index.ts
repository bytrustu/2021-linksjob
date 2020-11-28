import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import userSaga from './userSaga';
import comapnySaga from './companySaga';
import config from '../../config'

const { SERVER_URL, LOCAL_URL } = config;
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? `${SERVER_URL}/api` : `${LOCAL_URL}/api`;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(comapnySaga),
  ]);
}