import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import validator from "validator";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ToDo.css";
let Token = localStorage.getItem("token");
import { SlOptionsVertical } from "react-icons/sl";

// console.log("Token----------", Token);
// let id = localStorage.getItem("id");

function ToDoList() {
  let navigate = useNavigate();
  const [emailerr, setemailerr] = useState(false);
  const [descErr, setDes] = useState(false);
  const [taskErr, settask] = useState(false);
  const [durErr, setDuration] = useState(false);
  const [data, setdata] = useState([]);
//   const [Task,setTask]=useState("")

  let task = useRef();
  let description = useRef();
  let duration = useRef();
  let email = useRef();
  //   function formsubmit(e) {
  //     e.preventDefault();
  //     console.log(title.current.value);
  //     console.log(description.current.value);
  //     console.log(duration.current.value);
  //     console.log(email.current.value);

  //   }
  const todo = async () => {
    try {
      const response = await axios.get("http://localhost:3000/task/todopages", {
        headers: {
          authorization: `${Token}`,
        },
      });
      console.log(response, "response");
      setdata(response.data.todoAllData);
      console.log(response.data.todoAllData, "============");
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    todo();
  }, []);
  const formsubmit = async (e) => {
    e.preventDefault();
    try {
      let id = localStorage.getItem("id");
      console.log(id, "token id");
      console.log("token----------------", Token);

      const response = await axios
        .post(
          "http://localhost:3000/task/todopage",
          {
            task: task.current.value,
            description: description.current.value,
            duration: duration.current.value,
            email: email.current.value,
          },
          {
            headers: {
              authorization: `${Token}`,
            },
          }
        )
        .then((response) => {
          console.log(response, "hhhhhh");
          alert("Todo add succsessfully");
            todo();
          //   setdata(response, { task, description, duration, email });
          //   console.log(data,"=============");
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
    if (!validator.isEmail(email.current.value)) {
      setemailerr(true);
    } else {
      setemailerr(false);
    }
  }
  function taskHandle() {
    var letters = /^[A-Za-z]+$/;
    if (task.current.value.length < 5 && task.current.value.match(letters)) {
      settask(true);
    } else {
      settask(false);
    }
  }
  function DescHandle() {
    var letters = /^[A-Za-z]+$/;
    if (
      description.current.value.length < 5 &&
      description.current.value.match(letters)
    ) {
      setDes(true);
    } else {
      setDes(false);
    }
  }
  function DurHandle() {
    var letters = /^[A-Za-z]+$/;
    if (
      duration.current.value.length < 7 &&
      duration.current.value.match(letters)
    ) {
      setDuration(true);
    } else {
      setDuration(false);
    }
  }

//   function clearFeild(){
//     setTask("")
//   }
//   function getalldata() {
//     let response = axios
//       .get("http://localhost:3000/task/todopages", {
//         headers: {
//           authorization: localStorage.getItem("token"),
//         },
//       })
//       //   console.log(response,"response")
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error, "catch error");
//       });
//   }

  return (
    <>
      <div className="container-todo">
        <div className="form-container-todo">
          <h2>To Do List</h2>
          <form onSubmit={formsubmit}>
            <div className="form-control-todo">
              <div>
                <input
                  ref={task}
                  type="text"
                  placeholder="enter task"
                  onChange={taskHandle }
                  required
                ></input>
                {taskErr ? (
                  <span>enter task only alphabet and more than 5 length</span>
                ) : (
                  ""
                )}
              </div>

              <div>
                <input
                  ref={description}
                  type="text"
                  placeholder="enter description"
                  onChange={DescHandle}
                  required
                ></input>
                {descErr ? (
                  <span>
                    enter description only alphabet and more than 5 length
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div>
                <input
                  ref={duration}
                  type="text"
                  placeholder="enter duration"
                  onChange={DurHandle}
                  required
                ></input>
                {durErr ? (
                  <span>
                    enter duration only alphabet and more than 5 length
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div>
                <input
                  ref={email}
                  type="email"
                  placeholder="enter email"
                  onChange={emailHandle}
                  required
                ></input>
                {emailerr ? <span>enter valid email format</span> : ""}
              </div>
            </div>
            <div className="buttonstyle">
              <button>Add</button>
              <button>clear</button>
              <button>Update</button>
            </div>
          </form>
        </div>

        {/* <button onClick={getalldata}>get data</button> */}
      </div>
      <div className="container-table">
        <div>
          <h2>Fetch data for API</h2>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Task</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Email</th>
                <th>Action</th>
                <th>option</th>
              </tr>
            </thead>

            <tbody>
              {data.map((todo, index) => {
                console.log(todo, "-------------------");

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{todo.task}</td>
                    <td>{todo.description}</td>
                    <td>{todo.duration}</td>
                    <td>{todo.username}</td>
                    <td>
                      <button className="danger"> Delete</button>
                    </td>
                    <td><SlOptionsVertical></SlOptionsVertical></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default ToDoList;
