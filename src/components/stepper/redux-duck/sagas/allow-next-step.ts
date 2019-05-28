import { SagaIterator } from "@redux-saga/core";
import { put, takeLatest, select } from "redux-saga/effects";
import { ALLOW_NEXT_STEP } from "../constants";
import { AllowNextStep, allowNextStepActionDone } from "../actions";
import { getStepsSelector } from "../selectors";
import { Step } from "../../types";

function* allowNextStepSaga({ payload }: AllowNextStep): SagaIterator {
    const { indexStep } = payload;

    const steps: Step[] = yield select(getStepsSelector);
    const newSteps: Step[] = steps.map((item, index) => {
        if ((indexStep - index) > 0) {
            return { pass: true, disabled: false };
        } else if (index === indexStep) {
            return { pass: false, disabled: false };
        }
        return item;
    });

    yield put(allowNextStepActionDone(newSteps));
}

export default function* (): SagaIterator {
    yield takeLatest(ALLOW_NEXT_STEP, allowNextStepSaga);
}
