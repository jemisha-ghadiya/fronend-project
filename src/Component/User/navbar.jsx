import { NavLink } from "react-router-dom";
// import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navigation() {
  const menus = ["My Profile", "Change password", "logout"];
  const [open, setopen] = useState(false);
  const menuref = useRef();

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
            <Link className="popli" to="/user/:id">
              <li>My Profile</li>
            </Link>
            <Link className="popli">
              <li>Change password</li>
            </Link>
            <Link className="popli">
              <li>Logout</li>
            </Link>
          </ul>
        </div>
      )}

      {/* <div className="navbar-inside">
        <ul>
          <li>
            <NavLink className="navbar-link" to="/user/signup">
              SignUp
            </NavLink>
          </li>
          <li>
            <NavLink className="navbar-link" to="/user/login">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink className="navbar-link" to="/todolist">
              To-Do List
            </NavLink>
          </li>
        </ul>
      </div> */}
    </div>
  );
}
export default Navigation;
