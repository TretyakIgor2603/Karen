import http from "../../../../api/authentication";
import objectToFormData from "object-to-formdata";
import httpCustomPackage from "../../../../api/custom-package";
import convertToFormData from "object-to-formdata";
import store from "../../../../redux/store";
import { set, get, remove } from "local-storage";
import env from "../../../../env/env";
import { getAxiosError } from "../../../../utils/helpers";
import { toastr } from "react-redux-toastr";
import {
    getCategories,
    getSelectedFurniture,
    getStyles,
    getPersonalQuestions,
    getPersonalQuestionsStyles,
    getBudgetString,
    getCategorySelectedFurniture
} from "./dataCollection";
// Selectors
import { getCategoriesIds } from "../redux-duck/selectors";
// Actions
import { openPopupAction } from "../../../modal/redux-duck/actions";
import { getFurnitureListAction, calculateMiddlePriceAction } from "../redux-duck/actions";
// TS types
import { Error } from "../../../../types/axios";
import { User } from "../../../../types/authentication";
import { StyleReportData } from "../../../../types/custom-package";

export enum CustomPackage {
    CustomPackageStep1 = "CUSTOM_PACKAGE/STEP1",
    CustomPackageStep1Ids = "CUSTOM_PACKAGE/STEP1_IDS",
    CustomPackageStep2 = "CUSTOM_PACKAGE/STEP2",
    CustomPackageStep2OpenOther = "CUSTOM_PACKAGE/STEP2_OPEN_OTHER",
    CustomPackageStep3 = "CUSTOM_PACKAGE/STEP3",
    CustomPackageStep4 = "CUSTOM_PACKAGE/STEP4",
    CustomPackageStep4Styles = "CUSTOM_PACKAGE/STEP4_STYLES",
    CustomPackageStep5 = "CUSTOM_PACKAGE/STEP5"
}

export const onFormSubmitStep1 = (values: any): void => {
    const categories = getCategories(values);
    const state = store.getState();
    const categoriesIds = getCategoriesIds(state);
    set(CustomPackage.CustomPackageStep1Ids, categoriesIds);

    set(CustomPackage.CustomPackageStep1, values);
    const dataToSend = { selected_design_room_categories: categories };

    if (categoriesIds.length) {
        store.dispatch(openPopupAction());
    } else {
        store.dispatch(getFurnitureListAction(convertToFormData(dataToSend)));
    }
};

export const onFormSubmitStep2 = (values: any): void => {
    set(CustomPackage.CustomPackageStep2, values);
    remove(CustomPackage.CustomPackageStep1Ids);
};

export const onFormSubmitStep3 = (values: any): void => {
    set(CustomPackage.CustomPackageStep3, values);
};

export const onFormSubmitStep4 = (values: any): void => {
    set(CustomPackage.CustomPackageStep4, values);

    const step2Data: { [key: string]: any } = get(CustomPackage.CustomPackageStep2);
    const selectedFurniture = getCategorySelectedFurniture(step2Data);

    const flattenedFurniture = selectedFurniture.reduce((category: any, furniture: any) => {

        if (category[furniture.product_category_id]) {
            category[furniture.product_category_id] = {
                product_category_id: furniture.product_category_id,
                count: +furniture.count + +category[furniture.product_category_id].count
            };
        } else {
            category[furniture.product_category_id] = {
                product_category_id: furniture.product_category_id,
                count: furniture.count
            };
        }

        return category;
    }, {});

    const data = {
        product_categories: Object.values(flattenedFurniture)
    };

    store.dispatch(calculateMiddlePriceAction(objectToFormData(data)));
};

export const onFormSubmitStep5 = (): void => undefined;

export const onFormSubmitRegistration = (values: any): void => {
    const userData = {
        user: {
            ...values,
            receive_email: true
        }
    };

    http.registerUser(convertToFormData(userData))
        .then((response: { data: { user: User } }) => {
            set("token", `Bearer ${response.data.user.authentication_token}`);
            return response.data;
        })
        .then((data: { user: User }) => {
            const userName = data.user.first_name;
            const token = data.user.authentication_token;
            const id = data.user.id;

            createStyleReport(id, token, userName);
        })
        .then(() => clearStorage())
        .catch((error: Error) => {
            const err = getAxiosError(error);
            toastr.error("Registration error", err);
        });
};

export const onFormSubmitLogin = (values: any): void => {
    const userData = {
        user: {
            ...values,
            remember_me: 0
        },
        commit: "CONTINUE"
    };

    http.loginUser(convertToFormData(userData))
        .then((response: { data: { user: User } }) => {
            set("token", `Bearer ${response.data.user.authentication_token}`);
            return response.data;
        })
        .then((data: { user: User }) => {
            const userName = data.user.first_name;
            const token = data.user.authentication_token;
            const id = data.user.id;

            createStyleReport(id, token, userName);
        })
        .then(() => clearStorage())
        .catch((error: Error) => {
            const err = getAxiosError(error);
            toastr.error("Login error", err);
        });
};

function createStyleReport(userId: number, token: string, userName: string) {
    const categories = getCategories(get(CustomPackage.CustomPackageStep1));
    const selected_furniture = getSelectedFurniture(get(CustomPackage.CustomPackageStep2));
    const design_styles = getStyles(get(CustomPackage.CustomPackageStep3));
    const personal_question = {
        ...getPersonalQuestions(get(CustomPackage.CustomPackageStep4)),
        styles: getPersonalQuestionsStyles(get(CustomPackage.CustomPackageStep4Styles) || [])
    };
    const budget_string = getBudgetString();

    const surveysData: StyleReportData = {
        categories,
        selected_furniture,
        design_styles,
        personal_question,
        budget_string,
        user_id: userId
    };

    httpCustomPackage.createStyleReport(convertToFormData(surveysData))
        .then(() => {
            window.location.replace(`${env.domain}/style_report?auth_token=${token}`);
            toastr.success(`Welcome, ${userName}`, "");
        })
        .catch((error: Error) => {
            const err = getAxiosError(error);
            toastr.error("StyleReport error", err);
        });
}

function clearStorage(): void {
    remove(CustomPackage.CustomPackageStep1);
    remove(CustomPackage.CustomPackageStep2);
    remove(CustomPackage.CustomPackageStep3);
    remove(CustomPackage.CustomPackageStep4);
    remove(CustomPackage.CustomPackageStep4Styles);
    remove(CustomPackage.CustomPackageStep5);
}
