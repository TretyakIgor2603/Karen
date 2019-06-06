import { StepperActions } from "../components/stepper/redux-duck/actions";
import { CustomPackageActions } from "../components/steps/custom-package/redux-duck/actions";

export type ReduxActions = StepperActions | CustomPackageActions;
