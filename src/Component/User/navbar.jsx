import { NavLink } from "react-router-dom";
// import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
let Token = localStorage.getItem("token");
// let id = localStorage.getItem("id");
function Navigation() {
  const navigate = useNavigate();
  const menus = ["My Profile", "Change password", "logout"];
  const [open, setopen] = useState(false);
  // const[hide,sethide]=useState(false)
  const menuref = useRef();

  // const Logout = async () => {
  //   try {
  //     let id = localStorage.getItem("id");
  //     console.log(id, "token id");
  //     let response = await axios
  //       .delete(`http://localhost:3000/user/user/${id}`, {
  //         headers: {
  //           authorization: `${Token}`,
  //         },
  //       })
  //       .then((response) => {
  //         console.log(response, "hhhhhh");
  //         alert("User Logout successfully");
  //         navigate("/home");
  //       })
  //       .catch((error) => {
  //         console.log(error, "catch error");
  //       });
  //   } catch (err) {
  //     console.log(err.message, "error");
  //   }
  // };

  const HideProfile = () => {
    if (Token) {
      toast.success("Go to the profile");
      setTimeout(() => {
        navigate("/user/:id");
      }, 3000);
      // sethide(true)
    } else {
      toast.error("Try to Login");
      setTimeout(() => {
        navigate("/user/login");
      }, 3000);
    }
  };

  const HandleLogout = () => {
    localStorage.clear();
    if (Token) {
      toast.success("User Logout Successfully");
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } else {
      toast.error("User Alreay Logout");
    }
    <ToastContainer />;
  };

  return (
    <div className="navbar">
      <h1>
        <NavLink className="navbar-link" to="/home">
          User ToDo Task
        </NavLink>
      </h1>
      <div className="navbar-link">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          onClick={() => setopen(!open)}
        ></img>
      </div>
      {open && (
        <div ref={menuref} className="popup">
          <ul>
            {/* {menus.map((menu)=>(
          <li className="popli" key={menu}>{menu}</li>
        ))} */}
            {/* <Link className="popli" to="/user/:id"> */}
            <li className="popli" onClick={HideProfile}>
              My Profile
            </li>
            {/* </Link> */}
            <Link className="popli">
              <li>Change password</li>
            </Link>
            <Link className="popli">
              <li onClick={HandleLogout}>Logout</li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
}
export default Navigation;
