import { MODULE_NAME } from "./constants";
// TS types
import { ReduxState } from "../../../../redux/root-reducer";
import { Room } from "../types";

export const getRoomListSelector = (state: ReduxState): Room[] => state[MODULE_NAME].roomList;
export const getLoadingSelector = (state: ReduxState): boolean => state[MODULE_NAME].loading;
