import axios from "axios";
import { get } from "local-storage";
import Env from "../env/env";
// TS types
import { RequestMethod, Instance, RequestConfig } from "../types/axios";

const config: RequestConfig = {
    baseURL: Env.apiUrl,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "withCredentials": true
    }
};

export const http = (method: RequestMethod, url: string, data?: any): any => {
    const token = get("token");

    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }

    const axiosInstance: Instance = axios.create(config);

    return axiosInstance({ method, url, data });
};
