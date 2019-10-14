import axios from "axios";
// import { SERVICE_URL, MOCK_URL } from "./Constants";

const headerConfig = {
  "Content-Type": "application/json"
};

// const URL = SERVICE_URL;
// const URL2 = MOCK_URL;
const apiBaseUrl = "http://localhost:3000/api/users";

export const signUp = async signupData => {
  return await axios.post(apiBaseUrl + `apiBaseUrl/sign_up`, signupData, headerConfig);
};

export const login = async loginData => {
  return await axios.post(apiBaseUrl + `/sign_in`, loginData);
};

// export const logout = async () => {
//   await cookie.remove("accessToken", { path: "/" });
// };

// export const post = async (data, basePath) => {
//   return await axios.post(`/${basePath}`, data, headerConfig);
// };

// export const mockPost = async (data, basePath) => {
//   return await axios.post(`${URL2}/${basePath}`, data, headerConfig);
// };

// export const get = async basePath => {
//   return await axios.get(`/${basePath}`);
// };
