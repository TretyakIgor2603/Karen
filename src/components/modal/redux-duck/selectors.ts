import { MODULE_NAME } from "./constants";
// TS types
import { ReduxState } from "../../../redux/root-reducer";

export const getPopupStatus = (state: ReduxState): boolean => state[MODULE_NAME].isPopupOpen;
