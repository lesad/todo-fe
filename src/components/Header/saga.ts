import { call, takeEvery } from "redux-saga/effects";

import { sagaActions } from "../../redux/sagaActions";

function* addTodoWorker() {
    yield call(console.log, "Todo was added");
}

export function* addTodoWatcher() {
    yield takeEvery(sagaActions.ADD_TODO, addTodoWorker);
}

function* filterTodoWorker() {
    yield call(console.log, "Todo was filtered");
}

export function* filterTodoWatcher() {
    yield takeEvery(sagaActions.FILTER_TODO, filterTodoWorker);
}
