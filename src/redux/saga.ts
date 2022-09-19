import type { Action } from "redux";
import { all, fork, put, take } from "redux-saga/effects";

import { watchLoading } from "../components/TodoList/saga";
import { actions } from "./actions";
import { appendEffect } from "./actionsSlice";

function* storeActionWorker() {
    while (true) {
        const action: Action = yield take(Object.values(actions));
        yield put(appendEffect(action.type));
    }
}

function* rootSaga() {
    yield all([fork(storeActionWorker), fork(watchLoading)]);
}

export default rootSaga;
