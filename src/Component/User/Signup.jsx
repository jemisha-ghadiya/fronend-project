import React, { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import validator from "validator";
import { Link } from "react-router-dom";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import { signupRoute } from "../../api/user";
import { toastmessage } from "../../utils/Toast";
import Navigation from "./navbar";
import { useRef } from "react";
import "./Signup.css";
import Input from "../ReusableComponent/Input";
import Button from "../ReusableComponent/Button";

function Signup() {
  const [Icon, setIcon] = useState(false);
  const [show, setshow] = useState(false);
  const [cshow, setcshow] = useState(false);
  const [passerr, setpasserr] = useState(false);
  const [emailerr, setemailerr] = useState(false);
  const [cpass, setcpass] = useState(false);
  const navigate = useNavigate();

  const formsubmit = async (e) => {
    e.preventDefault();
    if (passref.current.value !== cpassref.current.value) {
      toastmessage("error", "password and confirm password not match");
    } else {
      try {
        console.log("username:", userref.current.value);
        console.log("password:", passref.current.value);
        let response = await signupRoute({
          email: userref.current.value,
          password: passref.current.value,
        })
          .then((response) => {
            console.log(response, "hhhhhh");
            toastmessage("success", "signup successfully");
            // setTimeout(() => {
            navigate("/user/login");
            // }, 6000);
          })
          .catch((error) => {
            console.log(error, "catch error");
            if (error.status == 400) {
              toastmessage("error", "User Already Exists!");
            }
          });
        console.log("..........", response);
      } catch (err) {
        console.log(err.message, "error");
      }
    }
  };
  function emailHandle() {
    if (!validator.isEmail(userref.current.value)) {
      setemailerr(true);
    } else {
      setemailerr(false);
    }
  }
  function passHandle() {
    if (passref.current.value.length < 6) {
      setpasserr(true);
    } else {
      setpasserr(false);
    }
  }
  function cpassHandle() {
    if (passref.current.value !== cpassref.current.value) {
      setcpass(true);
    } else {
      setcpass(false);
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

  function cshowpassword() {
    if (Icon == true) {
      setcshow(!cshow);
      setIcon(false);
    } else {
      setIcon(true);
    }
  }

  let userref = useRef(null);
  let passref = useRef(null);
  let cpassref = useRef(null);

  return (
    <div className="container">
      <div className="form-container">
        <h2>SignUp</h2>
        <form onSubmit={formsubmit}>
          {/* <div className="form-control"> */}
          <Input
            className={"form-control"}
            ref={userref}
            type="email"
            placeholder="enter your email"
            onChange={emailHandle}
            errorMassage={emailerr ? <span>enter valid email format</span> : ""}
            icon={<MdOutlineMail className="icon email"></MdOutlineMail>}
          />
          {/* </div> */}
          {/* <div className="form-control"> */}
          <Input
            className={"form-control"}
            ref={passref}
            type={show ? "text" : "password"}
            placeholder="enter your password"
            onChange={passHandle}
            icon={
              show ? (
                <BiShow className="icon1 hide" onClick={showpassword}></BiShow>
              ) : (
                <BiHide className="icon1 hide" onClick={showpassword}></BiHide>
              )
            }
            errorMassage={
              passerr ? <span>please enter the 6 character password</span> : ""
            }
            fieldicon={
              <RiLockPasswordLine className="icon password"></RiLockPasswordLine>
            }
          />
          {/* </div> */}
          {/* <div className="form-control"> */}
          <Input
            className={"form-control"}
            type={cshow ? "text" : "password"}
            ref={cpassref}
            placeholder="confirm  password"
            onChange={cpassHandle}
            icon={
              cshow ? (
                <BiShow className="icon1 hide" onClick={cshowpassword}></BiShow>
              ) : (
                <BiHide className="icon1 hide" onClick={cshowpassword}></BiHide>
              )
            }
            fieldicon={
              cpass ? (
                <span>Password and Confirm password is not match</span>
              ) : (
                ""
              )
            }
            errorMassage={
              <RiLockPasswordLine className="icon password"></RiLockPasswordLine>
            }
          />
          {/* </div> */}

          {/* <div className="buttonstyle"> */}
          <Button Name={"SignUp"} className={"buttonstyle"}></Button>
          {/* </div> */}
        </form>
        <p>
          <Link to="/user/login">Already have an account?</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
