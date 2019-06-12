import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import { get } from "local-storage";
import Env from "../env/env";
import { RequestMethod } from "./types";

const config: AxiosRequestConfig = {
    baseURL: Env.apiUrl,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "withCredentials": true
    }
};

const axiosInstance: AxiosInstance = axios.create(config);

export const http = (method: RequestMethod, url: string, data?: any): any => {
    return axiosInstance({ method, url, data });
};

const token = get("token");

if (token) {
    axios.defaults.headers.common["Authorization"] = token;
} else {
    delete axios.defaults.headers.common["Authorization"];
}
