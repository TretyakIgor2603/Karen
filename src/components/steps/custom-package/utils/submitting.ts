import http from "../../../../api/authentication";
import httpCustomPackage from "../../../../api/custom-package";
import convertToFormData from "object-to-formdata";
import store from "../../../../redux/store";
import { set, get } from "local-storage";
import env from "../../../../env/env";
import { getAxiosError } from "../../../../utils/helpers";
import { toastr } from "react-redux-toastr";
import { getCategories, getSelectedFurniture, getStyles, getPersonalQuestions } from "./dataCollection";
// Actions
import { getFurnitureListAction } from "../redux-duck/actions";
import { AxiosError } from "axios";

export enum CustomPackage {
    CustomPackageStep1 = "CUSTOM_PACKAGE/STEP1",
    CustomPackageStep2 = "CUSTOM_PACKAGE/STEP2",
    CustomPackageStep2OpenOther = "CUSTOM_PACKAGE/STEP2_OPEN_OTHER",
    CustomPackageStep3 = "CUSTOM_PACKAGE/STEP3",
    CustomPackageStep4 = "CUSTOM_PACKAGE/STEP4",
    CustomPackageStep5 = "CUSTOM_PACKAGE/STEP5",
}

export const onFormSubmitStep1 = (values: any): void => {
    const categories = getCategories(values);

    set(CustomPackage.CustomPackageStep1, values);
    const dataToSend = { selected_design_room_categories: categories };

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

export const onFormSubmitRegistration = (values: any): void => {
    const userData = {
        user: {
            ...values,
            receive_email: true
        }
    };

    http.registerUser(convertToFormData(userData))
        .then((response: any) => {
            set("token", `Bearer ${response.data.user.authentication_token}`);
            return response.data;
        })
        .then((data: any) => {
            const userName = data.user.first_name;
            const token = data.user.authentication_token;
            const id = data.user.id;

            createStyleReport(id, token, userName);
        })
        .catch((error: AxiosError) => {
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
        .then((response: any) => {
            set("token", `Bearer ${response.data.user.authentication_token}`);
            return response.data;
        })
        .then((data: any) => {
            const userName = data.user.first_name;
            const token = data.user.authentication_token;
            const id = data.user.id;

            createStyleReport(id, token, userName);
        })
        .catch((error: AxiosError) => {
            const err = getAxiosError(error);
            toastr.error("Login error", err);
        });
};

function createStyleReport(userId: number, token: string, userName: string) {
    const categories = getCategories(get(CustomPackage.CustomPackageStep1));
    const selected_furniture = getSelectedFurniture(get(CustomPackage.CustomPackageStep2));
    const design_styles = getStyles(get(CustomPackage.CustomPackageStep3));
    const personal_question = getPersonalQuestions(get(CustomPackage.CustomPackageStep4));

    const surveysData: any = {
        categories,
        selected_furniture,
        design_styles,
        personal_question,
        budget_string: "$1500 to $3500",
        user_id: userId
    };

    httpCustomPackage.createStyleReport(convertToFormData(surveysData))
        .then((data: any) => {
            console.log("--create user data--", data);
            window.location.replace(`${env.domain}/style_report?auth_token=${token}`);
            toastr.success(`Welcome, ${userName}`, "");
        })
        .catch((error: AxiosError) => {
            const err = getAxiosError(error);
            toastr.error("StyleReport error", err);
        });
}
