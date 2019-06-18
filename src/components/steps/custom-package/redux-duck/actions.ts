import * as Type from "./constants";
// TS type
import { Room, Furniture, DesignStyle } from "../../../../types/custom-package";
import { Error } from "../../../../types/axios";

type WatchAction = { type: string }
type ActionError = {
    type: string;
    payload: { error: Error };
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

export type GetDesignStylesListDone = {
    type: string;
    payload: { designStyleList: DesignStyle[] };
}

export type Loading = {
    type: string;
    payload: { loading: boolean }
}

export type CustomPackageActions =
    WatchAction
    & GetRoomListDone
    & ActionError
    & GetFurnitureList
    & GetFurnitureListDone
    & GetDesignStylesListDone
    & Loading;

export const getRoomListAction = (): WatchAction => ({ type: Type.GET_ROOM_LIST });
export const getRoomListDoneAction = (roomList: Room[]): GetRoomListDone => ({
    type: Type.GET_ROOM_LIST_DONE,
    payload: { roomList }
});
export const getRoomListErrorAction = (error: Error): ActionError => ({
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
export const getFurnitureListErrorAction = (error: Error): ActionError => ({
    type: Type.GET_FURNITURE_LIST_ERROR,
    payload: { error }
});

export const getDesignStylesListAction = (): WatchAction => ({ type: Type.GET_DESIGN_STYLES_LIST });
export const getDesignStylesListDoneAction = (designStyleList: DesignStyle[]): GetDesignStylesListDone => ({
    type: Type.GET_DESIGN_STYLES_LIST_DONE,
    payload: { designStyleList }
});
export const getDesignStylesListErrorAction = (error: Error): ActionError => ({
    type: Type.GET_DESIGN_STYLES_LIST_ERROR,
    payload: { error }
});

export const loadingAction = (loading: boolean): Loading => ({
    type: Type.LOADING,
    payload: { loading }
});
