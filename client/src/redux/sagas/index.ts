import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import comapnySaga from './companySaga';
import config from '../../config'

const { SERVER_URL } = config;
axios.defaults.baseURL = `${SERVER_URL}/api`;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(comapnySaga),
  ]);
}