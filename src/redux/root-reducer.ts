import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { reducer as toastrReducer } from "react-redux-toastr";
// App reducers
import * as Reducer from "../components/all-reducers";
// All modules
import { MODULE_NAME as counter } from "../components/counter/redux-duck/constants";
import { MODULE_NAME as stepper } from "../components/stepper/redux-duck/constants";

export const rootReducer = combineReducers({
    form: formReducer,
    toastr: toastrReducer,
    [counter]: Reducer.counter,
    [stepper]: Reducer.stepper
});

export type ReduxState = ReturnType<typeof rootReducer>
