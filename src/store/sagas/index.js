// WATCHER SAGA
import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga} from './order';

export function* watchAuth() {
  // yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  // yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  // yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  // yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
  /// all permet de les executer concurrently
  yield all ([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
  ]);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
  // yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  /// takelatest will cancel any ongoing execution of burger saga to execute the latest one (in case of multiple click on a button for instance) Thus only 1 of this process is going on at any time
  yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga)
}