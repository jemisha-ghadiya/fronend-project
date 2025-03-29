import React from "react";
import { MdOutlineMail } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./MyProfile.css";
import { User_get } from "../../api/user";
import { User_put } from "../../api/user";
import { User_Logout } from "../../api/user";
import { toastmessage } from "../../utils/Toast";
import Button from "../ReusableComponent/Button";
import Input from "../ReusableComponent/Input";
import { IoCameraOutline } from "react-icons/io5";

function Myprofile() {
  let Token = localStorage.getItem("token");
  let userref = useRef(null);
  let profileref = useRef(null);
  const navigate = useNavigate();
  const [emailerr, setemailerr] = useState(false);
  const [email, setemail] = useState("");
  const [image,setImage]=useState('')

  const useralldata = async () => {
    let response = await User_get({
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        console.log(response, "hhhhhh");
        let id = response.data.result[0].id;
        console.log(id, "hhhhhhhhhhhhhh");
        let username = response.data.result[0].username;
        console.log(username, "hhhhhhhhhhhhhh");
        setemail(response.data.result[0].username);
      })
      .catch((error) => {
        console.log(error, "catch error");
      });
  };

  useEffect(() => {
    useralldata();
  }, []);

  useEffect(() => {
    if (!Token) {
      navigate("/user/login");
    }
  }, []);

  const formsubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("username:", userref.current.value);
      // console.log("password:", passref.current.value);
      let id = localStorage.getItem("id");
      console.log(id, "token id");
      
      let response = await User_put(
        id,
        {
          email: userref.current.value,
          profile:profileref.current.value
        },
        {
          headers: {
            authorization: `${Token}`,
          },
        }
      )
        .then((response) => {
          console.log(response, "hhhhhh");
          toastmessage("success", "user data update successfully");
        })
        .catch((error) => {
          console.log(error, "catch error");
        });
    } catch (err) {
      console.log(err.message, "error");
    }
  };

  function emailHandle() {
    if (!validator.isEmail(userref.current.value)) {
      setemailerr(true);
    } else {
      setemailerr(false);
    }
  }
  const Logout = async () => {
    try {
      let id = localStorage.getItem("id");
      console.log(id, "token id");
      let response = await User_Logout(id, {
        headers: {
          authorization: `${Token}`,
        },
      })
        .then((response) => {
          console.log(response, "hhhhhh");
          toastmessage("success", "User Logout successfully");
          // setTimeout(() => {
          navigate("/user/login");

          // }, 3000);
        })
        .catch((error) => {
          console.log(error, "catch error");
          if (error.status == 500) {
            toastmessage(
              "error",
              "Todo already exists so user not delete your self"
            );
          }
        });
    } catch (err) {
      console.log(err.message, "error");
    }
  };

  const handleProfile = () => {
    profileref.current.click();
  };

  const handlechaneImage=(event)=>{
    const file=event.target.files[0].name
    console.log(file,"ggggggggggggggg");
    
    setImage(event.target.files[0])
  }

  return (
    <div className="container-profile">
      <div className="form-container-profile">
        <h2>My Profile</h2>
        <div className="form-container-profile-image" onClick={handleProfile}>
          {image?<img src={URL.createObjectURL(image)}  style={{height:'80px', width:'90px',clipPath:'circle(50%)'}}></img>:<img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' style={{height:'80px', width:'90px',clipPath:'circle(40%)'}}></img>}
          <input type="file" ref={profileref} style={{ display: "none" }}  onChange={handlechaneImage}/>
          {/* <IoCameraOutline className="cemera" /> */}
        </div>
        <form onSubmit={formsubmit}>
          {/* <div className="form-control-profile"> */}
          <Input
            className={"form-control-profile"}
            ref={userref}
            type="email"
            placeholder="enter your email"
            defaultValue={email}
            onChange={(e) => emailHandle(setemail(e.target.value))}
            errorMassage={emailerr ? <span>enter valid email format</span> : ""}
            icon={<MdOutlineMail className="icon email"></MdOutlineMail>}
          />

          <Button Name={"Update Profile"} className={"buttonstyle"}></Button>
        </form>

        <Button
          onClick={Logout}
          Name="close Account"
          className={"button-close"}
        ></Button>

        {/* <div>
        <button onClick={Logout}  className="close">  
            close Account
            </button>
          </div> */}
      </div>
      <ToastContainer />
    </div>
  );
}
export default Myprofile;
