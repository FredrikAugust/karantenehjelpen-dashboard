import { all, takeLeading, put, takeEvery } from 'redux-saga/effects';

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

function* setConnectedUser(
  action: ReturnType<typeof requests.actions.updateConnectedUser>
) {
  yield firebase
    .firestore()
    .collection('users')
    .doc(action.payload.uid)
    .collection('requests')
    .doc(action.payload.id)
    .set({ connectedUser: action.payload.connectedUser });
}

function* watchFetchAllRequests() {
  yield takeLeading(requests.actions.fetchAllRequests().type, fetchAllRequests);
}

function* watchSetConnectedUser() {
  yield takeEvery(`requests/updateConnectedUser`, setConnectedUser);
}

export default function* requestsSaga() {
  yield all([watchFetchAllRequests(), watchSetConnectedUser()]);
}
