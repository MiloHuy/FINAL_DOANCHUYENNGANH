import axios from "axios";
import { ErrorCodeApi } from "constants/api.const";
import { SSOCOOKIES } from "constants/app.const";
import Cookies from "js-cookie";
import { getAccessTokenFromCookie } from "utils/auth.utils";
import { refresh_token } from "./auth.svc";

const DoanInstance = axios.create({
  // baseURL: "https://final-project-it-project.vercel.app",
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

DoanInstance.interceptors.request.use(
  (config) => {
    const token = getAccessTokenFromCookie();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

const allErrorCode = Object.values(ErrorCodeApi);

DoanInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await refresh_token();

        const { token } = response.data;

        Cookies.set(SSOCOOKIES.access, token, { expires: 1 });
        originalRequest.headers.Authorization = `Bearer ${token}`;

        return DoanInstance(originalRequest);
      } catch (refreshError) {
        Cookies.remove(SSOCOOKIES.access, { path: "/" });
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
  // async (res) => {
  //   console.log("response:" + res);
  //   const { data, config } = res;
  //   const { code } = data;

  //   if (allErrorCode.includes(code)) {
  //     const token_fail_code = [
  //       ErrorCodeApi.JwtCodeRefreshToken,
  //       ErrorCodeApi.JwtCodeRefreshTokenNotExistCookie,
  //       ErrorCodeApi.JwtCodeRefreshTokenBeUsed,
  //       ErrorCodeApi.JwtCodeRefreshTokenNotExistSystem,
  //     ];

  //     switch (true) {
  //       case token_fail_code.include(code): {
  //         return handleRefreshTokenFail(config);
  //       }
  //       default:
  //         return handleErrorMessageToken(res);
  //     }
  //   }
  //   return res;
  // },
);

const handleRefreshTokenFail = async (config) => {
  const { code, token } = await refresh_token();

  if (allErrorCode.includes(code)) {
    console.log("Refresh token failed");
  }

  Cookies.set(SSOCOOKIES.access, token, { expires: 1 });
  config.headers.Authorization = `Bearer ${token}`;

  return DoanInstance(config);
};

const handleErrorMessageToken = (res) => {
  const { config, data } = res;
  const { code } = data;

  console.log("Data error message: " + data);
};

export default DoanInstance;
