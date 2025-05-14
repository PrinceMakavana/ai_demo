import type { BaseQueryFn } from "@reduxjs/toolkit/query"
import type { AxiosRequestConfig, AxiosError, Method, AxiosResponse } from "axios"

import axios from "axios";
interface APIPARAMETER {
    url: string;
    method: Method;
    params?: AxiosRequestConfig["params"],
    data?: any;
    headers?: any;
    file?: any;
    contentType?: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/";
const API_VERSION = import.meta.env.VITE_API_VERSION;
export const axiosBaseQuery =
    (): BaseQueryFn<
        APIPARAMETER,
        unknown,
        unknown
    > =>
        async ({ url, method, data, params, headers, file, contentType = "application/json" }) => {
            try {
                const result: AxiosResponse<any> = await axios({
                    url: `${API_URL}${'api/'}${API_VERSION ? `${API_VERSION}` : ''}${url}`,
                    method: method,
                    headers: {
                        ...headers,
                        "Content-Type": contentType,
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                    data: data,
                    timeout: 120000,
                });
                console.log("result", result);
                
                if (result?.data) {
                    return { data: result.data };
                }
                return { data: "" };
            } catch (error) {
                const err = error as AxiosError
                console.log("error", err.response?.data);
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data,
                    },
                }
            }
        }
