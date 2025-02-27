import instance from "../../utils/ApiInstance";

const SIGNUP = "user/signup";
const lOGIN = "user/login";
const USER_GET_URL = "user/users";
const USER_PUT_URL = "user/user";
const USER_DELETE_URL = "user/user";

export const signupRoute = (data) => {
    console.log(data,)
  return instance.post(SIGNUP,data);
};

export const LoginRoute = (data) => {
  return instance.post(lOGIN,data);
};

export const User_get = () => {
  return instance.get(USER_GET_URL);
};

export const User_put = (id,data) => {
  return instance.put(`${USER_PUT_URL}/${id}`, data);
};

export const User_Logout = (id) => {
  return instance.delete(`${USER_DELETE_URL}/${id}`);
};

export default {  User_Logout };
