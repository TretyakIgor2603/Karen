import { all, fork } from "redux-saga/effects";
// TS types
import { SagaIterator } from "@redux-saga/core";
// Sagas
import registerStepsSaga from "./sagas/register-steps";
import allowNextStepSaga from "./sagas/allow-next-step";

export default function* (): SagaIterator {
    yield all([
        fork(registerStepsSaga),
        fork(allowNextStepSaga)
    ]);
}
