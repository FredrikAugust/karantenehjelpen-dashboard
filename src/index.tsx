import React from 'react';
import ReactDOM from 'react-dom';

// Firebase
import firebase from 'firebase/app';
import 'firebase/auth';

// Stylesheet/reset imports
import './index.scss';
import CssBaseline from '@material-ui/core/CssBaseline';

// Component imports
import Router from './components/organisms/Router';

// Router imports
import { BrowserRouter } from 'react-router-dom';

// Redux imports
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

// Import slices
import auth from './reducers/auth';
import requests from './reducers/requests';

// Import sagas
import requestsSaga from './sagas/requests';

// Setup middlewares
const sagaMiddleware = createSagaMiddleware();

// Import slices here to generate root reducer
const reducerMapObject = {
  // We can't use [authSlice.name] as TS isn't smart enough to understand that that is a constand and not a string
  auth: auth.reducer,
  requests: requests.reducer,
};

const rootReducer = combineReducers(reducerMapObject);

export type Store = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// Run sagas
sagaMiddleware.run(requestsSaga);

// Set up firebase
firebase.initializeApp(
  JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG ?? '{}')
);

// Listen for login/sign out
firebase.auth().onAuthStateChanged(user => {
  store.dispatch(auth.actions.setUser(user));
});

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <Provider store={store}>
        <Router />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
