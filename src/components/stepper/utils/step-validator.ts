import _get from "lodash/fp/get";

export const disableNextButton = (data: any): boolean => {
    const dataFromForm = Object.values(data);
    const values = _get("values", dataFromForm[0]);

    if (!values) return true;

    return !Object.values(values).includes(true);
};
