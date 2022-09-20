import { put, takeEvery } from "redux-saga/effects";

import { appendEffect } from "../../redux/actionsSlice";
import { actions } from "./actions";

export function* storeLoadingStarted() {
    yield put(appendEffect(actions.LOADING_STARTED));
}

export function* storeLoadingFinished() {
    yield put(appendEffect(actions.LOADING_FINISHED));
}

export function* watchLoading() {
    yield takeEvery(actions.LOADING_STARTED, storeLoadingStarted);
    yield takeEvery(actions.LOADING_FINISHED, storeLoadingFinished);
}
