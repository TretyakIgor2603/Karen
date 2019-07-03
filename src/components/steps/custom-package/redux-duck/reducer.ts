import * as Type from "./constants";
// TS types
import { CustomPackageActions } from "./actions";
import { Room, Furniture, DesignStyleRequest } from "../../../../types/custom-package";
import { Error } from "../../../../types/axios";

export type CustomPackageState = {
    loading: boolean;
    error: null | string | Error;
    roomList: Room[];
    furnitureList: Furniture[];
    designStyleList: DesignStyleRequest;
    middlePrice: number | null;
    categoriesIds: number[]
}

const INITIAL_STATE = Object.freeze({
    loading: false,
    error: null,
    roomList: [],
    furnitureList: [],
    designStyleList: {},
    middlePrice: null,
    categoriesIds: []
});

export default (state: CustomPackageState = INITIAL_STATE, action: CustomPackageActions): CustomPackageState => {
    const { type, payload } = action;

    switch (type) {
        case (Type.GET_ROOM_LIST):
        case (Type.GET_FURNITURE_LIST):
        case (Type.GET_DESIGN_STYLES_LIST):
        case (Type.CALCULATE_MIDDLE_PRICE):
            return {
                ...state,
                loading: true,
                error: null
            };

        case (Type.GET_ROOM_LIST_DONE):
            return {
                ...state,
                loading: false,
                roomList: payload.roomList
            };

        case (Type.GET_ROOM_LIST_ERROR):
            return {
                ...state,
                loading: false,
                error: payload.error,
                roomList: []
            };

        case (Type.GET_FURNITURE_LIST_DONE):
            return {
                ...state,
                loading: false,
                furnitureList: payload.furnitureList
            };

        case (Type.GET_FURNITURE_LIST_ERROR):
            return {
                ...state,
                loading: false,
                error: payload.error,
                furnitureList: []
            };

        case (Type.GET_DESIGN_STYLES_LIST_DONE):
            return {
                ...state,
                loading: false,
                designStyleList: payload.designStyleList
            };

        case (Type.GET_DESIGN_STYLES_LIST_ERROR):
            return {
                ...state,
                loading: false,
                error: payload.error,
                designStyleList: {}
            };

        case (Type.CALCULATE_MIDDLE_PRICE_DONE):
            return {
                ...state,
                loading: false,
                middlePrice: payload.middlePrice
            };

        case (Type.CALCULATE_MIDDLE_PRICE_ERROR):
            return {
                ...state,
                loading: false,
                error: payload.error,
                middlePrice: null
            };

        case (Type.SAVE_CATEGORIES_IDS):
            return {
                ...state,
                categoriesIds: payload.ids
            };

        default:
            return state;
    }
};
