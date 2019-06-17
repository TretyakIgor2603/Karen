import { FormName } from "../../../app-constants";
import _get from "lodash/fp/get";
import _isEmpty from "lodash/fp/isEmpty";
import _includes from "lodash/fp/includes";
import { getFormSyncErrors } from "redux-form";
import store from "../../../redux/store";

type Validate = (values?: any) => boolean

const validateStep2: Validate = (values) => {
    const allValues = Object.values(values);
    const isExists = allValues.map((item: any) => {
        return _includes(true, item);
    });

    return !isExists.includes(true);
};

const validateStep3: Validate = (values) => {
    const answers = values.filter((item: any) => item === true);
    return answers.length !== 3;
};

const validateStep4: Validate = () => {
    const getError = getFormSyncErrors(FormName.CustomPackageStep4);
    const errors: null | { [key: string]: string } = getError(store.getState());
    return !_isEmpty(errors);
};

const validateStep5: Validate = () => {
    return false;
};

export const disableNextButton = (data: any): boolean => {
    const formName = Object.keys(data)[0];
    const dataFromForm = Object.values(data);
    const values = _get("values", dataFromForm[0]);

    if (!values) return true;

    const userAnswers = Object.values(values);

    switch (formName) {
        case(FormName.CustomPackageStep2):
            return validateStep2(values);

        case(FormName.CustomPackageStep3):
            return validateStep3(userAnswers);

        case(FormName.CustomPackageStep4):
            return validateStep4();

        case(FormName.CustomPackageStep5):
            return validateStep5();

        default:
            return !userAnswers.includes(true);
    }
};
