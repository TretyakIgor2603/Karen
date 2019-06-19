import http from "../../../../api/authentication";
import httpCustomPackage from "../../../../api/custom-package";
import convertToFormData from "object-to-formdata";
import store from "../../../../redux/store";
import { set, get, remove } from "local-storage";
import env from "../../../../env/env";
import { getAxiosError } from "../../../../utils/helpers";
import { toastr } from "react-redux-toastr";
import _get from "lodash/fp/get";
import { getCategories, getSelectedFurniture, getStyles, getPersonalQuestions } from "./dataCollection";
// Actions
import { getFurnitureListAction } from "../redux-duck/actions";
// TS types
import { Error } from "../../../../types/axios";
import { User } from "../../../../types/authentication";
import { StyleReportData, PostFiles, CustomPackageStep4File } from "../../../../types/custom-package";

export enum CustomPackage {
    CustomPackageStep1 = "CUSTOM_PACKAGE/STEP1",
    CustomPackageStep2 = "CUSTOM_PACKAGE/STEP2",
    CustomPackageStep2OpenOther = "CUSTOM_PACKAGE/STEP2_OPEN_OTHER",
    CustomPackageStep3 = "CUSTOM_PACKAGE/STEP3",
    CustomPackageStep4 = "CUSTOM_PACKAGE/STEP4",
    CustomPackageStep4Styles = "CUSTOM_PACKAGE/STEP4_STYLES",
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

    const files = _get("styles", values);

    if (files && files.length) {
        const images = files.map((file: File) => ({
            aws_path: file,
            name: file.name
        }));

        const data = { survey: { images } };
        httpCustomPackage.postFiles(convertToFormData(data))
            .then((response: PostFiles) => {
                const alreadySelect: CustomPackageStep4File[] = get(CustomPackage.CustomPackageStep4Styles);

                if (alreadySelect && alreadySelect.length) {
                    set(CustomPackage.CustomPackageStep4Styles, alreadySelect.concat(response.data));
                } else {
                    set(CustomPackage.CustomPackageStep4Styles, response.data);
                }

            })
            .catch((error: Error) => {
                const err = getAxiosError(error);
                toastr.error("Save files error", err);
            });
    }
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
        styles: [
            "https://dkarpj7eykpeb.cloudfront.net/photos/survey_image/aws_path/1417/download.jpeg",
            "https://dkarpj7eykpeb.cloudfront.net/photos/survey_image/aws_path/1418/download.jpg",
            "https://dkarpj7eykpeb.cloudfront.net/photos/survey_image/aws_path/1419/error_F.jpg"
        ]
    };

    const surveysData: StyleReportData = {
        categories,
        selected_furniture,
        design_styles,
        personal_question,
        budget_string: "$1500 to $3500",
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
    remove(CustomPackage.CustomPackageStep5);
}
