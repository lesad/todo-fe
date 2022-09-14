import {call} from "redux-saga/effects"

function* rootSaga() {
    yield call(console.log, "Hello from saga")
}

export default rootSaga;
