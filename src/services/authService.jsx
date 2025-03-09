import { get, post } from "../utils/request";

export const getUser = async (key, value) => {
  const result = await get("users?" + key + "=" + value);
  return result;
}

export const register = async (options) => {
  const result = await post("users", options);
  return result;
}