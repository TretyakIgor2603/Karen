import { ReactElement } from "react";
import { Postfix } from "../../../app-constants";
import { REGISTER_STEPS } from "./constants";
// TS types
import { Step } from "../types";

export type RegisterStepsAction = {
    type: typeof REGISTER_STEPS;
    payload: { componentChildren: ReactElement[] };
}

type RegisterStepsActionDone = {
    type: string;
    payload: { steps: Step[] };
}

export type StepperActions = RegisterStepsAction & RegisterStepsActionDone;

export const registerStepsAction = (componentChildren: ReactElement[]): RegisterStepsAction => ({
    type: REGISTER_STEPS,
    payload: { componentChildren }
});

export const registerStepsActionDone = (steps: Step[]): RegisterStepsActionDone => ({
    type: REGISTER_STEPS + Postfix.Done,
    payload: { steps }
});
