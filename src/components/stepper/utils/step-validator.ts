import { FormName } from "../../../app-constants";
import _get from "lodash/fp/get";
import _isEmpty from "lodash/fp/isEmpty";
import { getFormSyncErrors } from "redux-form";
import store from "../../../redux/store";

export const disableNextButton = (data: any): boolean => {
    const formName = Object.keys(data)[0];
    const dataFromForm = Object.values(data);
    const values = _get("values", dataFromForm[0]);

    if (!values) return true;

    const userAnswers = Object.values(values);

    switch (formName) {
        case(FormName.CustomPackageStep3):
            const answers = userAnswers.filter((answer) => answer === true);
            return answers.length !== 3;

        case(FormName.CustomPackageStep4):
            const getError = getFormSyncErrors(FormName.CustomPackageStep4);
            const errors: null | { [key: string]: string } = getError(store.getState());
            return !_isEmpty(errors);

        case(FormName.CustomPackageStep5):
            return false;

        default:
            return !userAnswers.includes(true);
    }
};
