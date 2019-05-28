import { SagaIterator } from "@redux-saga/core";
import { all, fork } from "redux-saga/effects";
// Sagas
import registerStepsSaga from "./sagas/register-steps";
import allowNextStepSaga from "./sagas/allow-next-step";

export default function* (): SagaIterator {
    yield all([
        fork(registerStepsSaga),
        fork(allowNextStepSaga)
    ]);
}
