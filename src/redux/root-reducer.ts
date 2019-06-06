import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { reducer as toastrReducer } from "react-redux-toastr";
// App reducers
import * as Reducer from "../components/all-reducers";
// All modules
import { MODULE_NAME as stepper } from "../components/stepper/redux-duck/constants";
import { MODULE_NAME as customPackage } from "../components/steps/custom-package/redux-duck/constants";

export const rootReducer = combineReducers({
    form: formReducer,
    toastr: toastrReducer,
    [stepper]: Reducer.stepper,
    [customPackage]: Reducer.customPackage
});

export type ReduxState = ReturnType<typeof rootReducer>
