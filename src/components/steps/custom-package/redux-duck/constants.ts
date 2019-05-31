import { APP_NAME } from "../../../../app-constants";

export const MODULE_NAME = "CUSTOM_PACKAGE";
const PREFIX = `${APP_NAME}/${MODULE_NAME}`;

export const GET_ROOM_LIST = `${PREFIX}/GET_ROOM_LIST`;
export const GET_ROOM_LIST_DONE = `${PREFIX}/GET_ROOM_LIST_DONE`;
export const GET_ROOM_LIST_ERROR = `${PREFIX}/GET_ROOM_LIST_ERROR`;
