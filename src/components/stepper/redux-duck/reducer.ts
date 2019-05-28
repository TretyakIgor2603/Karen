import * as Type from "./constants";
// TS types
import { Step } from "../types";
import { StepperActions } from "./actions";

export type StepperState = {
    loading: boolean;
    error: null | string;
    steps: Step[];
}

const INITIAL_STATE = Object.freeze({
    loading: false,
    error: null,
    steps: []
});

export default (state: StepperState = INITIAL_STATE, action: StepperActions): StepperState => {
    const { type, payload } = action;

    switch (type) {
        case (Type.REGISTER_STEPS_DONE):
        case (Type.ALLOW_NEXT_STEP_DONE):
            return {
                ...state,
                steps: payload.steps
            };

        default:
            return state;
    }
};
