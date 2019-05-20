import { MODULE_NAME } from "./constants";
// TS types
import { ReduxState } from "../../../redux/root-reducer";

export const getCounterSelector = (state: ReduxState): number => state[MODULE_NAME].counter;
