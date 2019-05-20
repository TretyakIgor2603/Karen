import { Postfix } from "../../../app-constants";
import { DECREMENT, INCREMENT } from "./constants";
// TS types
import { CounterActions } from "./actions";

export type CounterState = {
    loading: boolean;
    error: null | string;
    counter: number;
}

const INITIAL_STATE = Object.freeze({
    loading: false,
    error: null,
    counter: 0
});

const step = 1;

export default (state: CounterState = INITIAL_STATE, action: CounterActions): CounterState => {
    const { type } = action;

    switch (type) {
        case (INCREMENT + Postfix.Done):
            return { ...state, counter: state.counter + step };

        case (DECREMENT + Postfix.Done):
            return { ...state, counter: state.counter - step };

        default:
            return state;
    }
};
