import { FormName } from "../../../app-constants";
import _get from "lodash/fp/get";

export const disableNextButton = (data: any): boolean => {
    const formName = Object.keys(data)[0];
    const dataFromForm = Object.values(data);
    const values = _get("values", dataFromForm[0]);

    if (!values) return true;

    const userAnswers = Object.values(values);

    if (formName === FormName.CustomPackageStep3) {
        const answers = userAnswers.filter((answer) => answer === true);
        return answers.length !== 3;
    }

    return !userAnswers.includes(true);
};
