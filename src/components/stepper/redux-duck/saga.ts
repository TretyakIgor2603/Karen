import { SagaIterator } from "@redux-saga/core";
import { all, fork } from "redux-saga/effects";
// Sagas
import registerStepsSaga from "./sagas/registerSteps";

export default function* (): SagaIterator {
    yield all([
        fork(registerStepsSaga)
    ]);
}
