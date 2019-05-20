import { SagaIterator } from "@redux-saga/core";
import { all, fork } from "redux-saga/effects";
// Sagas
import incrementSaga from "./sagas/increment";
import decrementSaga from "./sagas/decrement";

export default function* (): SagaIterator {
    yield all([
        fork(incrementSaga),
        fork(decrementSaga)
    ]);
}
