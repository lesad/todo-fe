import { all, call } from "redux-saga/effects";

import { addTodoWatcher, filterTodoWatcher } from "../components/Header/saga";
import { completeTodoWatcher, removeTodoWatcher, renameTodoWatcher } from "../components/TodoList/saga";

const watchers = [addTodoWatcher, filterTodoWatcher, removeTodoWatcher, completeTodoWatcher, renameTodoWatcher];

function* rootSaga() {
    yield all(watchers.map((watcher) => call(watcher)));
}

export default rootSaga;
