import { SagaIterator } from "@redux-saga/core";
import { all, spawn } from "redux-saga/effects";
// All sagas
import { default as stepper } from "../components/stepper/redux-duck/saga";
import { default as customPackage } from "../components/steps/custom-package/redux-duck/saga";

export function* rootSaga(): SagaIterator {
    yield all([
        spawn(stepper),
        spawn(customPackage)
    ]);
}
