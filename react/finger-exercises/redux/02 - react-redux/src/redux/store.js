import { createStore, compose, combineReducers } from 'redux';

import bookReducer from './book/reducer';
import playsReducer from './plays/reducer';

const reducers = {
  books: bookReducer,
  plays: playsReducer
};
const reducer = combineReducers(reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle
export default createStore(reducer, composeEnhancers());
