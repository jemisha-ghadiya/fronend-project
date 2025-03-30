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
import { FaUser, FaEnvelope, FaCamera } from "react-icons/fa";

function Myprofile() {
  let Token = localStorage.getItem("token");
  let userref = useRef(null);
  let profileref = useRef(null);
  const navigate = useNavigate();
  const [emailerr, setemailerr] = useState(false);
  const [email, setemail] = useState("");
  const [image, setImage] = useState("");
  const [profile, setProfileFile] = useState(null);

  useEffect(() => {
    const profilePath = localStorage.getItem("Profile");
    if (profilePath) {
      const fullPath = `http://localhost:3000${profilePath}`;
      setImage(fullPath); // Set the image URL for display
    }
  }, []);  
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
        // let uoload_image = response.data.result[0].upload_image;
        // console.log(uoload_image, "dfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdf");
        // setImage(response.data.result[0].upload_image)
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

  // const formsubmit = async (e) => {
  //   e.preventDefault();
  //   // console.log(file, "----------------------");
  //   const formData = new FormData();
  //   formData.append("profile", profile);
  //   try {
  //     console.log("username:", userref.current.value);
  //     // console.log("password:", passref.current.value);
  //     let id = localStorage.getItem("id");
  //     console.log(id, "token id");

  //     let response = await User_put(
  //       id,
  //       {
  //         email: userref.current.value,
  //         profile: profileref.current.value,
  //       },
  //       {
  //         headers: {
  //           authorization: `${Token}`,
  //         },
  //       }
  //     )
  //       .then((response) => {
  //         console.log(response, "hhhhhh");
  //         toastmessage("success", "user data update successfully");
  //         if (response.data.updatedUser.uoload_image) {
  //           localStorage.setItem(
  //             "Profile",
  //             response.data.updatedUser.uoload_image
  //           );
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error, "catch error");
  //       });
  //   } catch (err) {
  //     console.log(err.message, "error");
  //   }
  // };

  const formsubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profile", profile);
    formData.append("email", userref.current.value);

    try {
      console.log("username:", userref.current.value);
      let id = localStorage.getItem("id");
      console.log(id, "token id");

      const response = await User_put(id, formData, {
        headers: {
          authorization: `${Token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response, "response from server");
      toastmessage("success", "User data updated successfully");

      if (response.data.updatedUser.upload_image) {
        const fullPath = `http://localhost:3000${response.data.updatedUser.upload_image}`;
        localStorage.setItem("Profile", response.data.updatedUser.upload_image);
        setImage(fullPath); // Update the displayed image
      }
    } catch (error) {
      console.error(error, "Error during profile update");
      toastmessage("error", "Failed to update user data. Please try again.");
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

  // const handleProfile = () => {
  //   profileref.current.click();
  // };

  const handleImg = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container-profile">
      <div className="form-container-profile">
        <h2>My Profile</h2>
        <div className="form-container-profile-image">
          {image ? (
            <img
              src={image}
              htmlfor="fileInput"
              style={{ height: "80px", width: "90px", clipPath: "circle(50%)" }}
            ></img>
          ) : null}
          <label htmlFor="fileInput" className="edit-icon">
            <FaCamera />
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleImg}
            style={{ display: "none" }}
          />
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
