import { all, takeLeading, put } from 'redux-saga/effects';

import requests from './../reducers/requests';

import firebase from 'firebase/app';
import 'firebase/firestore';

function* fetchAllRequests() {
  const snapshot: firebase.firestore.QuerySnapshot = yield firebase
    .firestore()
    .collectionGroup('requests')
    .get();

  yield put(
    requests.actions.setRequests(
      snapshot.docs.map(e => ({
        ...(e.data() as import('../declarations/Request').Request),
        id: e.id,
      }))
    )
  );
}

function* watchFetchAllRequests() {
  yield takeLeading(requests.actions.fetchAllRequests().type, fetchAllRequests);
}

export default function* requestsSaga() {
  yield all([watchFetchAllRequests()]);
}
