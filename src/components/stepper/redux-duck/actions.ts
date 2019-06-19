import * as Type from "./constants";
// TS types
import { Step } from "../../../types/stepper";
import { ReactElement } from "react";

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

type DisabledButton = {
    type: string;
    payload: { disabled: boolean };
}

export type StepperActions =
    RegisterStepsAction
    & RegisterStepsActionDone
    & AllowNextStep
    & AllowNextStepDone
    & DisabledButton;

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

export const disabledButtonAction = (disabled: boolean): DisabledButton => ({
    type: Type.DISABLED_NEXT_BUTTON,
    payload: { disabled }
});
