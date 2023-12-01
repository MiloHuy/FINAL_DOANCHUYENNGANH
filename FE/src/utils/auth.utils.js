import Cookies from "js-cookie";
import { SSOCOOKIES } from "../constants/app.const";

export function getAccessTokenFromCookie() {
  const access_token = Cookies.get(SSOCOOKIES.access);
  return access_token;
}

export function getRefreshTokenFromCookie() {
  const refresh_token = Cookies.get(SSOCOOKIES.refresh);
  return refresh_token;
}
