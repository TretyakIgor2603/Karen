import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import { get } from "local-storage";
import Env from "../env/env";
import { RequestMethod } from "./types";

const config: AxiosRequestConfig = {
    baseURL: Env.apiUrl,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Authorization": get("token") ? get("token") : null,
        "withCredentials": true
    }
};

const axiosInstance: AxiosInstance = axios.create(config);

export const http = (method: RequestMethod, url: string, data?: any): any => {
    return axiosInstance({ method, url, data });
};
