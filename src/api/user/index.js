import instance from "../../utils/ApiInstance";

const SIGNUP = "user/signup";
const lOGIN = "user/login";
const USER_GET_URL = "user/users";
const USER_PUT_URL = "user/user";
const USER_DELETE_URL = "user/user";

const signupRoute = (data) => {
    console.log(data,)
  return instance.post(SIGNUP,data);
};

const LoginRoute = () => {
  return instance.post(lOGIN);
};

const User_get = () => {
  return instance.get(USER_GET_URL);
};

const User_put = (data) => {
  return instance.put(USER_PUT_URL, data);
};

const User_Logout = (data) => {
  return instance.delete(USER_DELETE_URL,data);
};

export default { signupRoute, LoginRoute, User_get, User_put, User_Logout };
