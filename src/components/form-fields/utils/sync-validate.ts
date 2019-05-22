export const syncValidate = {
    required(value: string): void | string {
        if (!value) return "Field is required";
    }
};
