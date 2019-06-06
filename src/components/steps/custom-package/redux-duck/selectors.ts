import { MODULE_NAME } from "./constants";
import { createSelector } from "reselect";
// TS types
import { ReduxState } from "../../../../redux/root-reducer";
import { Room, Furniture, FilterFurniture, FurnitureItem, DesignStyleRequest } from "../types";

export const getRoomListSelector = (state: ReduxState): Room[] => state[MODULE_NAME].roomList;
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
            essentials: filterFurnitureList(item.style_design_categories_with_parent, "essential"),
            others: filterFurnitureList(item.style_design_categories_with_parent, "other")
        };
    });
};

export const makeGetFurnitureListSelector = () => createSelector<ReduxState, FilterFurniture[], FilterFurniture[]>(
    [getFurnitureList],
    (furnitureList) => furnitureList
);
