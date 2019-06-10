import { FormName } from "../../../app-constants";
import _get from "lodash/fp/get";

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
            return false;

        case(FormName.CustomPackageStep5):
            return false;

        default:
            return !userAnswers.includes(true);
    }
};
