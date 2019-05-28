import { ReactElement } from "react";
import * as Type from "./constants";
// TS types
import { Step } from "../types";

export type RegisterStepsAction = {
    type: string;
    payload: { componentChildren: ReactElement[] };
}

type RegisterStepsActionDone = {
    type: string;
    payload: { steps: Step[] };
}

export type AllowNextStep = {
    type: string;
    payload: { indexStep: number };
}

type AllowNextStepDone = {
    type: string;
    payload: { steps: Step[] };
}

export type StepperActions = RegisterStepsAction & RegisterStepsActionDone & AllowNextStep & AllowNextStepDone;

export const registerStepsAction = (componentChildren: ReactElement[]): RegisterStepsAction => ({
    type: Type.REGISTER_STEPS,
    payload: { componentChildren }
});

export const registerStepsActionDone = (steps: Step[]): RegisterStepsActionDone => ({
    type: Type.REGISTER_STEPS_DONE,
    payload: { steps }
});

export const allowNextStepAction = (indexStep: number): AllowNextStep => ({
    type: Type.ALLOW_NEXT_STEP,
    payload: { indexStep }
});

export const allowNextStepActionDone = (steps: Step[]): AllowNextStepDone => ({
    type: Type.ALLOW_NEXT_STEP_DONE,
    payload: { steps }
});
