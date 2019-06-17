import { put, takeLatest } from "redux-saga/effects";
import { REGISTER_STEPS } from "../constants";
import { registerStepsActionDone, RegisterStepsAction } from "../actions";
// TS types
import { SagaIterator } from "@redux-saga/core";

function* registerStepsSaga({ payload }: RegisterStepsAction): SagaIterator {
    const { componentChildren } = payload;
    const steps = componentChildren.map((child, index) => ({
        pass: false,
        disabled: !(index === 0)
    }));

    yield put(registerStepsActionDone(steps));
}

export default function* (): SagaIterator {
    yield takeLatest(REGISTER_STEPS, registerStepsSaga);
}
