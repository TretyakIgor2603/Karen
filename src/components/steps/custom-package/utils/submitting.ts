import http from "../../../../api/authentication";
import convertToFormData from "object-to-formdata";
import store from "../../../../redux/store";
import { set } from "local-storage";
import env from "../../../../env/env";
import { getAxiosError } from "../../../../utils/helpers";
import { toastr } from "react-redux-toastr";
// Actions
import { getFurnitureListAction } from "../redux-duck/actions";
import { getRoomListSelector } from "../redux-duck/selectors";
// TS types
import { ReduxState } from "../../../../redux/root-reducer";
import { Room } from "../types";

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

export const onFormSubmitRegistration = async (values: any): Promise<void> => {
    const userData = {
        user: {
            ...values,
            receive_email: true
        }
    };

    // Step 1 - categories: [{id: 12, count: 2},{}]
    // Step 2 - selected_furniture: [{product_category_id: 12, count: 4}, {}]
    // Step 3 - design_styles[]: 1, design_styles[]: 2, design_styles[]: 3
    // Step 4 - (reason_id: 1, preferred_delivery_date: 2, deliver_city: 'Toronto', people_counter: 3, "styles":[]
    // Step 5 -     {"BudgetString":"$1500 to $3500"}

    const surveysData = {

    };

    try {
        // const response = await http.registerUser(convertToFormData(userData));
        // await set("token", `Bearer ${response.data.user.authentication_token}`);
        // window.location.replace(`${env.domain}/style_report`);
        // toastr.success(`Welcome, ${response.data.user.first_name} ${response.data.user.last_name}`, "");
    } catch (error) {
        const err = getAxiosError(error);
        toastr.error("Register error", err);
    }
};

export const onFormSubmitLogin = (values: any): void => {
    console.log(
        "🍆 Utils.ts, string: 60",
        "---login form", values
    );
};
