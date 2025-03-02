import React from "react";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import validator from "validator";
import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginRoute } from "../../api/user";

// import Signup from "./Signup";
// import { useNavigate } from "react-router-dom";
import "./Signup.css";
function Login() {
  const [Icon, setIcon] = useState(false);
  const [show, setshow] = useState(false);
  const navigate = useNavigate();
  const emailref = useRef(null);
  const passwordref = useRef(null);
  const [passErr, setPassErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const formsubmit = async (e) => {
    e.preventDefault();
    console.log("username", emailref.current.value);
    console.log("password", passwordref.current.value);
    try {
      let response = await LoginRoute({
        email: emailref.current.value,
        password: passwordref.current.value,
      })
        .then((response) => {
          console.log(response, "hhhhhh");
          const token = response.data.token;
          console.log(token);
          const id = response.data.user.id;
          console.log(id, "token id ");
          localStorage.setItem("token", token);
          localStorage.setItem("id", id);
          toast.success("Login successfully");
          // setTimeout(() => {
            navigate("/task/todopage");
          // }, 6000);
        })
        .catch((error) => {
          console.log(error, "catch error");
          if (error.status == 400) {
            toast.error("User Not Found");
          }
        });
      // console.log("..........", response);
    } catch (err) {
      console.log(err.message, "error");
    }
  };
  function emailHandle() {
    if (!validator.isEmail(emailref.current.value)) {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }
  }
  function passwordHandle() {
    if (passwordref.current.value.length < 6) {
      setPassErr(true);
    } else {
      setPassErr(false);
    }
  }
  function showpassword() {
    if (Icon == true) {
      setshow(!show);
      setIcon(false);
    } else {
      setIcon(true);
    }
  }
  return (
    <div className="container">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={formsubmit}>
          <div className="form-control">
            <input
              ref={emailref}
              type="email"
              placeholder="enter your email"
              onChange={emailHandle}
              required
            />
            {emailErr ? <span>enter valid email format</span> : ""}

            <MdOutlineMail className="icon email"></MdOutlineMail>
          </div>
          <div className="form-control">
            <input
              ref={passwordref}
              type={show ? "text" : "password"}
              placeholder="enter your password"
              onChange={passwordHandle}
              required
            />
            {show ? (
              <BiShow className="icon1 hide" onClick={showpassword}></BiShow>
            ) : (
              <BiHide className="icon1 hide" onClick={showpassword}></BiHide>
            )}
            {passErr ? <span>please enter the 6 character password</span> : ""}
            <RiLockPasswordLine className="icon password"></RiLockPasswordLine>
          </div>
          <div className="buttonstyle">
            {" "}
            <button>Login</button>
          </div>
        </form>
        <p>
          {" "}
          <Link to={"/user/signup"}>Don't have account please signup</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
