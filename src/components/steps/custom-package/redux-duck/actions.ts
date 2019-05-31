import * as Type from "./constants";
import { AxiosError } from "axios";
// TS type
import { Room } from "../types";

type GetRoomList = { type: string }

type GetRoomListDone = {
    type: string;
    payload: { roomList: Room[] };
}

type GetRoomListError = {
    type: string;
    payload: { error: AxiosError };
}

export type CustomPackageActions = GetRoomList & GetRoomListDone & GetRoomListError;

export const getRoomListAction = (): GetRoomList => ({ type: Type.GET_ROOM_LIST });
export const getRoomListDoneAction = (roomList: Room[]): GetRoomListDone => ({
    type: Type.GET_ROOM_LIST_DONE,
    payload: { roomList }
});
export const getRoomListErrorAction = (error: AxiosError): GetRoomListError => ({
    type: Type.GET_ROOM_LIST_ERROR,
    payload: { error }
});
