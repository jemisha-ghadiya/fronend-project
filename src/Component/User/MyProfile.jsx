import React from "react";
import { MdOutlineMail } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import "./MyProfile.css";
import { User_get } from "../../api/user";
import { User_put } from "../../api/user";
import { User_Logout } from "../../api/user";

let Token = localStorage.getItem("token");
// console.log("Token----------", Token);

function Myprofile() {
  let userref = useRef(null);
  const navigate = useNavigate();
  const [emailerr, setemailerr] = useState(false);
  const[email,setemail]=useState("")


  const useralldata =async()=>{
    let response = await User_get( {
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
      setemail(response.data.result[0].username)
      // navigate("/home");
    })
    .catch((error) => {
      console.log(error, "catch error");
    });
   }

useEffect(()=>{
useralldata()
},[])

  const formsubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("username:", userref.current.value);
      // console.log("password:", passref.current.value);
      let id = localStorage.getItem("id");
      console.log(id, "token id");
      let response = await User_put(id,
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
          toast.success("user data update successfully")
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
          toast.success("User Logout successfully",{
            autoClose : 2000
          })
          setTimeout(() => {
            navigate("/user/login");
            
          }, 3000);
        })
        .catch((error) => {
          console.log(error, "catch error");
          if(error.status==500){
            toast.error("Todo already exists so user not delete your self");
          }
        });
    } catch (err) {
      console.log(err.message, "error");
    }
  };
 
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
              defaultValue={email}
              onChange={(e)=>emailHandle(setemail(e.target.value))}
              required
            ></input>
            {emailerr ? <span>enter valid email format</span> : ""}
            <MdOutlineMail className="icon email"></MdOutlineMail>
          </div>

          <div className="buttonstyle">
            <button >Update Profile</button>
            
          </div>
          {/* onClick={()=>navigate('/login')} */}
        </form>
        <div >
            <button onClick={Logout} className="close">close Account</button>
            
          </div>
      </div>
      <ToastContainer/>
      
    </div>
  );
}
export default Myprofile;
