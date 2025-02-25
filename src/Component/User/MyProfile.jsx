import React from "react";
import { MdOutlineMail } from "react-icons/md";
import { useState } from "react";
import { useRef } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MyProfile.css";

let Token = localStorage.getItem("token");
// console.log("Token----------", Token);

function Myprofile() {
  let userref = useRef(null);
  const navigate = useNavigate();
  const [emailerr, setemailerr] = useState(false);
  const formsubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("username:", userref.current.value);
      // console.log("password:", passref.current.value);
      let id = localStorage.getItem("id");
      console.log(id, "token id");
      let response = await axios
        .put(
          `http://localhost:3000/user/user/${id}`,
          {
            email: userref.current.value,
          },
          {
            headers: {
              authorization: `${Token}`,
            },
          }
        )
        .then((response) => {
          console.log(response, "hhhhhh");
          // alert("user data update successfully")
        //   navigate("/home");
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
  function getalldata() {
    let response = axios
      .get("http://localhost:3000/user/users", {
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
        navigate("/home");
      })
      .catch((error) => {
        console.log(error, "catch error");
      });
  }
  return (
    <div className="container-profile">
      <div className="form-container-profile">
        <h2>My Profile</h2>
        <form onSubmit={formsubmit}>
          <div className="form-control-profile">
            <input
              ref={userref}
              type="email"
              placeholder="enter your email"
              onChange={emailHandle}
              required
            ></input>
            {emailerr ? <span>enter valid email format</span> : ""}
            <MdOutlineMail className="icon email"></MdOutlineMail>
          </div>

          <div className="buttonstyle">
            <button>Update Profile</button>
            {/* <button>Delete</button> */}
          </div>
          {/* onClick={()=>navigate('/login')} */}
        </form>
      </div>
      <button onClick={getalldata}>get data</button>
    </div>
  );
}
export default Myprofile;
