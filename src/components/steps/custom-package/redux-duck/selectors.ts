import { MODULE_NAME } from "./constants";
import { createSelector } from "reselect";
// Utils
import { roundUp } from "../../../../utils/helpers";
// TS types
import { ReduxState } from "../../../../redux/root-reducer";
import {
    Room,
    Furniture,
    FilterFurniture,
    FurnitureItem,
    DesignStyleRequest,
    MiddlePrice
} from "../../../../types/custom-package";

export const getRoomListSelector = (state: ReduxState): Room[] => state[MODULE_NAME].roomList;
export const getOriginFurnitureList = (state: ReduxState): Furniture[] => state[MODULE_NAME].furnitureList;
export const getLoadingSelector = (state: ReduxState): boolean => state[MODULE_NAME].loading;
export const getDesignStyleListSelector = (state: ReduxState): DesignStyleRequest => state[MODULE_NAME].designStyleList;

const filterFurnitureList = (array: FurnitureItem[], type: string): any => {
    return array
        .map((parent) => parent.children.filter((child) => child.variation === type))
        .flat(1);
};

const getFurnitureList = (state: ReduxState): FilterFurniture[] => {
    const furniture: Furniture[] = state[MODULE_NAME].furnitureList;

    return furniture.map((item: Furniture) => {
        return {
            label: item.label,
            category_room_id: item.value,
            essentials: filterFurnitureList(item.style_design_categories_with_parent, "essential"),
            others: filterFurnitureList(item.style_design_categories_with_parent, "other")
        };
    });
};

export const makeGetFurnitureListSelector = () => createSelector<ReduxState, FilterFurniture[], FilterFurniture[]>(
    [getFurnitureList],
    (furnitureList) => furnitureList
);

const getMiddlePrice = (state: ReduxState): number => state[MODULE_NAME].middlePrice;

export const getCategoriesIds = (state: ReduxState): number[] => state[MODULE_NAME].categoriesIds;

const getPriceData = (state: ReduxState): MiddlePrice => {
    const middlePrice: number = getMiddlePrice(state);

    const thirtyPercent = middlePrice * 30 / 100;
    const fiftyPercent = middlePrice * 50 / 100;
    const step = roundUp(middlePrice + fiftyPercent) / 10;

    return {
        handleMax: roundUp(middlePrice + thirtyPercent),
        handleMin: roundUp(middlePrice - thirtyPercent),
        rangeMax: roundUp(middlePrice + fiftyPercent),
        rangeMin: roundUp(middlePrice - fiftyPercent),
        step,
        pushable: step
    };
};

export const makeGetPriceSelector = () => createSelector<ReduxState, MiddlePrice, MiddlePrice>(
    [getPriceData],
    (priceData) => priceData
);
