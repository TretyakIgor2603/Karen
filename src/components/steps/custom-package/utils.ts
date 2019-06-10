import convertToFormData from "object-to-formdata";
import store from "../../../redux/store";
import { set } from "local-storage";
// Actions
import { getFurnitureListAction } from "./redux-duck/actions";
import { getRoomListSelector } from "./redux-duck/selectors";
// TS types
import { ReduxState } from "../../../redux/root-reducer";
import { Room } from "./types";

export enum CustomPackage {
    CustomPackageStep1 = "CUSTOM_PACKAGE/STEP1",
    CustomPackageStep2 = "CUSTOM_PACKAGE/STEP2",
    CustomPackageStep2OpenOther = "CUSTOM_PACKAGE/STEP2_OPEN_OTHER",
    CustomPackageStep3 = "CUSTOM_PACKAGE/STEP3",
    CustomPackageStep4 = "CUSTOM_PACKAGE/STEP4",
    CustomPackageStep5 = "CUSTOM_PACKAGE/STEP5",
}

export const onFormSubmitStep1 = (values: any): void => {
    const storeState: ReduxState = store.getState();
    const rooms: Room[] = getRoomListSelector(storeState);

    const categoriesIds: any = rooms.reduce((acc: any, room) => {
        if (values[room.custom_label]) {
            acc.push({
                id: room.value,
                count: Number(values[`${room.custom_label}-count`])
            });
        }

        return acc;
    }, []);

    set(CustomPackage.CustomPackageStep1, values);
    const dataToSend = { selected_design_room_categories: categoriesIds };

    store.dispatch(getFurnitureListAction(convertToFormData(dataToSend)));
};

export const onFormSubmitStep2 = (values: any): void => {
    set(CustomPackage.CustomPackageStep2, values);
};

export const onFormSubmitStep3 = (values: any): void => {
    set(CustomPackage.CustomPackageStep3, values);
};

export const onFormSubmitStep4 = (values: any): void => {
    set(CustomPackage.CustomPackageStep4, values);
};

export const onFormSubmitStep5 = (values: any): void => {
    set(CustomPackage.CustomPackageStep5, values);
};
