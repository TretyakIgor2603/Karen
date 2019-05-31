import { CounterActions } from "../components/counter/redux-duck/actions";
import { StepperActions } from "../components/stepper/redux-duck/actions";
import { CustomPackageActions } from "../components/steps/custom-package/redux-duck/actions";

export type ReduxActions = CounterActions | StepperActions | CustomPackageActions;
