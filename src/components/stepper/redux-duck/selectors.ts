import { MODULE_NAME } from "./constants";
// TS types
import { Step } from "../types";
import { ReduxState } from "../../../redux/root-reducer";

export const getStepsSelector = (state: ReduxState): Step[] => state[MODULE_NAME].steps;