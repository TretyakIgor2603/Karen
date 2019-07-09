import { Error } from "../types/axios";

export const noop = (): void => undefined;

export const getAxiosError = (error: Error): any => {
    if (error.response) return error.response.data.error || error.response.data.message;
    return error.message;
};

export const roundUp = (value: number): number => ~~((value + 99) / 100) * 100;
