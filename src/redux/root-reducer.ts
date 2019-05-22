import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
// App reducers
import * as Reducer from "../components/all-reducers";
// All modules
import { MODULE_NAME as counter } from "../components/counter/redux-duck/constants";

export const rootReducer = combineReducers({
    form: formReducer,
    [counter]: Reducer.counter
});

export type ReduxState = ReturnType<typeof rootReducer>
