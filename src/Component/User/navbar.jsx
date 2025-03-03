import { NavLink } from "react-router-dom";
// import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { toastmessage } from "../../utils/Toast";
// let id = localStorage.getItem("id");

function Navigation() {
  const navigate = useNavigate();
  const menus = ["My Profile", "Change password", "logout"];
  const [open, setopen] = useState(false);
  const [hide, sethide] = useState(false);
  const menuref = useRef();
  
  let Token = localStorage.getItem("token");

  const handleProfile = (e) => {
    
    if(Token){
      sethide(true)
    }
    else{
      sethide(false)
    }
  }

   useEffect(()=>{
    handleProfile()
   })

  const HandleLogout = () => {
    if (Token) {
      localStorage.clear();
      toastmessage("success","User Logout Successfully");
      setTimeout(() => {
        navigate("/user/login");
        }, 1000);
      } 
      <ToastContainer></ToastContainer>
  };

  return (
    <div className="navbar">
      <h1>
        <NavLink className="navbar-link" to="/home">
          User ToDo Task
        </NavLink>
      </h1>
      {hide ? 
      < >
        <div className="navbar-link">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            onClick={()=>{setopen(!open)}}
          ></img>
        </div>
        {open && (
          <div ref={menuref} className="popup">
            <ul>
              {/* {menus.map((menu)=>(
          <li className="popli" key={menu}>{menu}</li>
          ))} */}
              <Link className="popli" to="/user/:id">
                <li className="popli">My Profile</li>
              </Link>
              <Link className="popli">
                <li>Change password</li>
              </Link>
              <Link className="popli">
                <li onClick={HandleLogout}>Logout</li>
              </Link>
            </ul>
          </div>
        ) }
      </>
       : null}
    </div>
    
  );
}
export default Navigation;
