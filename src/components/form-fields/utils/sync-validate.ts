import { FormErrors } from "redux-form";

export const syncValidate = {
    required(value: string): void | string {
        if (!value) return "Field is required";
    },

    email(value: string): void | string {
        const regexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!regexp.test(value)) return "Invalid email address";
    },

    phone(value: string): void | string {
        // eslint-disable-next-line
        const regexp = /^[\(\)\.\- ]{0,}[0-9]{3}[\(\)\.\- ]{0,}[0-9]{3}[\(\)\.\- ]{0,}[0-9]{4}[\(\)\.\- ]{0,}$/i;
        if (!regexp.test(value)) return "Invalid phone number";
    }
};

export const validate = (values: any): FormErrors<{}> => {
    const errors: { [key: string]: string } = {};
    const { password, confirm_password } = values;

    if ((password && confirm_password) && (password !== confirm_password)) {
        errors.confirm_password = "Passwords do not match";
    }

    return errors;
};
