import { CounterActions } from "../components/counter/redux-duck/actions";
import { StepperActions } from "../components/stepper/redux-duck/actions";

export type ReduxActions = CounterActions | StepperActions;
