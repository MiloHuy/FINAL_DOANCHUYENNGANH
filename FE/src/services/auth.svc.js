import DoanInstance from "./doan-instance.svc";
export const API_AUTH_ENDPOINT = {
  GET: {
    userInfo: "auth/userinfo",
    logout: "/api/v1/auth/logout",
    getUserInfo: "/api/v1/auth/me"
  },
  POST: {
    login: "/api/v1/auth/login",
    register: "auth/register",
    refresh_token: "/api/v1/auth/refresh-token",
  },
};

export const login = async (payload) => {
  const res = await DoanInstance.post(API_AUTH_ENDPOINT.POST.login, payload);
  return res.data;
};

export const refresh_token = async () => {
  const res = await DoanInstance.post(API_AUTH_ENDPOINT.POST.refresh_token);
  return res;
};

export const get_user = async() => {
  const res = await DoanInstance.get(API_AUTH_ENDPOINT.GET.getUserInfo);
  return res.data;
}

