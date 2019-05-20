import { Postfix } from "../../../app-constants";
import { DECREMENT, INCREMENT } from "./constants";

type IncrementActionCreator = { type: typeof INCREMENT }
type DecrementActionCreator = { type: typeof DECREMENT }
export type CounterActions = IncrementActionCreator | DecrementActionCreator;

export const incrementAction = (): CounterActions => ({ type: INCREMENT });
export const incrementActionDone = (): CounterActions => ({ type: INCREMENT + Postfix.Done });

export const decrementAction = (): CounterActions => ({ type: DECREMENT });
export const decrementActionDone = (): CounterActions => ({ type: DECREMENT + Postfix.Done });
