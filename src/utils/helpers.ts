import { AxiosError } from "axios";

export const noop = (): void => undefined;

export const getAxiosError = (error: AxiosError): any => {
    if (error.response) return error.response.data.error || error.response.data.message;
    return error.message;
};
