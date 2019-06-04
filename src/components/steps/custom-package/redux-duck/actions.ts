import * as Type from "./constants";
import { AxiosError } from "axios";
// TS type
import { Room, Furniture } from "../types";

type WatchAction = { type: string }
type ActionError = {
    type: string;
    payload: { error: AxiosError };
}

type GetRoomListDone = {
    type: string;
    payload: { roomList: Room[] };
}



export type GetFurnitureList = {
    type: string;
    payload: any;
}
type GetFurnitureListDone = {
    type: string;
    payload: { furnitureList: Furniture[] };
}

export type CustomPackageActions =
    WatchAction
    & GetRoomListDone
    & ActionError
    & GetFurnitureList
    & GetFurnitureListDone;

export const getRoomListAction = (): WatchAction => ({ type: Type.GET_ROOM_LIST });
export const getRoomListDoneAction = (roomList: Room[]): GetRoomListDone => ({
    type: Type.GET_ROOM_LIST_DONE,
    payload: { roomList }
});
export const getRoomListErrorAction = (error: AxiosError): ActionError => ({
    type: Type.GET_ROOM_LIST_ERROR,
    payload: { error }
});

export const getFurnitureListAction = (data: any): GetFurnitureList => ({
    type: Type.GET_FURNITURE_LIST,
    payload: data
});
export const getFurnitureListDoneAction = (furnitureList: Furniture[]): GetFurnitureListDone => ({
    type: Type.GET_FURNITURE_LIST_DONE,
    payload: { furnitureList }
});
export const getFurnitureListErrorAction = (error: AxiosError): ActionError => ({
    type: Type.GET_FURNITURE_LIST_ERROR,
    payload: { error }
});
