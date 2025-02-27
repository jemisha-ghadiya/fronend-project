import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Component/User/Signup';
// import Login from './Component/User/login';
import Login from './Component/User/Login';
import Navigation from './Component/User/navbar';
import ToDoList from './Component/ToDoList/ToDo';
// import TodoAdd from './Component/ToDoList/TodoAdd';
import Myprofile from './Component/User/MyProfile';
import Home from './Component/User/Home'
import ToDoUpdate from './Component/ToDoList/ToDoUpdate';
function App() {
  return (
    <>
    {/* <Navigation></Navigation> */}
    {/* <Signup MdOutlineMail={MdOutlineMail} RiLockPasswordLine={RiLockPasswordLine}></Signup> */}
    {/* <Login MdOutlineMail={MdOutlineMail} RiLockPasswordLine={RiLockPasswordLine}></Login> */}
    {/* <ToDoList></ToDoList> */}
    <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/user/signup" element={<Signup/>}></Route>
      <Route path="/user/login" element={<Login></Login>}></Route>
      <Route path="/task/todopage" element={<ToDoList/>}></Route>
      <Route path="/user/:id" element={<Myprofile/>}></Route>
      <Route path="/task/todo_update/:id" element={<ToDoUpdate/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
