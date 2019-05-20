import { SagaIterator } from "@redux-saga/core";
import { all, spawn } from "redux-saga/effects";
// All sagas
import { default as counter } from "../components/counter/redux-duck/saga";

export function* rootSaga(): SagaIterator {
    yield all([spawn(counter)]);
}
