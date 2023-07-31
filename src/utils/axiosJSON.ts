import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { Md5 } from 'ts-md5';
import { BASEURL, TIMEOUT } from '@/config/config';

const axiosx = axios.create({
    baseURL: BASEURL,
    timeout: TIMEOUT,
    headers: { 'Content-Type': 'application/json; charset=UTF-8' }
});

axiosx.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
        const currentTime = Math.floor(new Date().getTime() / 1000);
        config.headers['time'] = currentTime;
        config.headers['token'] = Md5.hashStr(currentTime.toString() + 'siweWeb2023');

        const user_str = sessionStorage.getItem('user_state');
        if (user_str) {
            const user = JSON.parse(user_str);
            config.headers['auth_token'] = user.userState.auth_token;
        }

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

axiosx.interceptors.response.use(
    (res: AxiosResponse) => {
        const data = res.data;

        if ([200, 201, 204].includes(res.status)) {
            return data;
        }
        return res;
    },

    (error: AxiosError) => {
        if (error.response?.status === 401) {
            window.location.href = '/401';
        }

        if (error.response?.status === 403) {
            window.location.href = '/403';
        }

        if (error.response?.status === 500) {
            window.location.href = '/500';
        }

        if (error.response) {
            return Promise.reject(error.response.data);
        }

        const err = {
            code: -1,
            msg: error.message
        };
        return Promise.reject(err);
    }
);

export default axiosx;
