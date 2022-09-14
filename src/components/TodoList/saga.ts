import { call, takeEvery } from "redux-saga/effects";

import { sagaActions } from "../../redux/sagaActions";

function* completeTodoWorker() {
    yield call(console.log, "Todo was toggled");
}

export function* completeTodoWatcher() {
    yield takeEvery(sagaActions.TOGGLE_TODO, completeTodoWorker);
}

function* renameTodoWorker() {
    yield call(console.log, "Todo was renamed");
}

export function* renameTodoWatcher() {
    yield takeEvery(sagaActions.UPDATE_TODO, renameTodoWorker);
}

function* removeTodoWorker() {
    yield call(alert, "Todo was removed");
}

export function* removeTodoWatcher() {
    yield takeEvery(sagaActions.DELETE_TODO, removeTodoWorker);
}
