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
    },

    minLength8(value: string) {
        return minLength(8, value);
    }
};

export const validate = (values: any): FormErrors<{}> => {
    const errors: { [key: string]: string } = {};
    const { password, password_confirmation } = values;

    if ((password && password_confirmation) && (password !== password_confirmation)) {
        errors.password_confirmation = "Passwords do not match";
    }

    return errors;
};

function minLength(min: number, value: string): string | void {
    if (value && value.length < min) {
        return `Must be ${min} characters or more`;
    }
}
