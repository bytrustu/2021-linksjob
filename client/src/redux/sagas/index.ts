import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import comapnySaga from './companySaga';
import { SERVER_URL } from '../../config';

axios.defaults.baseURL = `${SERVER_URL}/api`;

export default function* rootSaga() {
  yield all([
    fork(comapnySaga),
  ]);
}