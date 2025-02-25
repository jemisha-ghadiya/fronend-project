import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import validator from "validator";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import "./ToDo.css";
import { RiDeleteBin5Fill } from "react-icons/ri";

import { SlOptionsVertical } from "react-icons/sl";
let Token = localStorage.getItem("token");
// console.log("Token----------", Token);
// let id = localStorage.getItem("id");

function ToDoList() {
  // const { id } = useParams();
  //   let navigate = useNavigate();
  const [emailerr, setemailerr] = useState(false);
  const [descErr, setDes] = useState(false);
  const [taskErr, settask] = useState(false);
  const [durErr, setDuration] = useState(false);
  const [data, setdata] = useState([]);
  const [tasks, settasks] = useState("");
  const [desc, setdesc] = useState("");
  const [dur, setdur] = useState("");
  const [username, setusername] = useState("");
  const [status, setstatus] = useState(false);
  const [Todoid, setid] = useState(null);

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
  useEffect(() => {
    todo();
  }, []);
  const todo = async () => {
    try {
      const response = await axios
        .get("http://localhost:3000/task/todopages", {
          headers: {
            authorization: `${Token}`,
          },
        })
        .then((response) => {
          console.log(response, "response");
          setdata(response.data.todoAllData);
          // console.log(response.data.todoAllData, "============");
        })
        .catch((error) => {
          console.log(error, "catch error");
        });
    } catch (err) {
      console.log(err.message);
    }
  };
  const formsubmit = async (e) => {
    e.preventDefault();
    try {
      //   let id = localStorage.getItem("id");
      //   console.log(id, "token id");
      //   console.log("token----------------", Token);

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
          alert("Todo Data Add successfully");
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

  const deletetodo = async (id) => {
    if (id) {
      // confirm("ToDo Data Delete successfully ");
      try {
        let response = await axios
          .delete(`http://localhost:3000/task/todopage/${id}`, {
            headers: {
              authorization: `${Token}`,
            },
          })
          .then((response) => {
            console.log(response, "hhhhhh");
            todo();
          })
          .catch((error) => {
            console.log(error, "catch error");
          });
      } catch (err) {
        console.log(err.message, "error");
      }
    }
  };

  const showTodo = async (id) => {
    try {
      const response = await axios
        .get(`http://localhost:3000/task/todo/${id}`, {
          headers: {
            authorization: `${Token}`,
          },
        })
        .then((response) => {
          console.log(response, "response");
          settasks(response.data.todoAllData[0].task);
          setdesc(response.data.todoAllData[0].description);
          setdur(response.data.todoAllData[0].duration);
          setusername(response.data.todoAllData[0].username);
          setid(response.data.todoAllData[0].id);
          setstatus(true);
          //   setdata(response.data.todoAllData);
          // console.log(response.data.todoAllData, "============");
        })
        .catch((error) => {
          console.log(error, "catch error");
        });
    } catch (err) {
      console.log(err.message);
    }
  };
    const updatetodo = async () => {
      try {
        let response = await axios
          .put(
            `http://localhost:3000/task/todo_update/${Todoid}`,
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

            // todo()
          })
          .catch((error) => {
            console.log(error, "catch error");
          });
      } catch (err) {
        console.log(err.message, "error");
      }
    };
  //   function clearfeild(e){
  //     e.preventDefault();
  //     setDes("")
  //     setDuration("")
  //     settask("")
  //     setemailerr("")

  //   }

  return (
    <>
      <div className="container-todo">
        <div className="form-container-todo">
          <h2>To Do List</h2>
          <form>
            <div className="form-control-todo">
              <div>
                <input
                  ref={task}
                  type="text"
                  placeholder="enter task"
                  defaultValue={tasks}
                  onChange={(e) => settasks(e.target.value)}
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
                  defaultValue={desc}
                  onChange={(e) => setdesc(e.target.value)}
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
                  defaultValue={dur}
                  onChange={(e) => setdur(e.target.value)}
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
                  defaultValue={username}
                  onChange={(e) => setusername(e.target.value)}
                  required
                ></input>
                {emailerr ? <span>enter valid email format</span> : ""}
              </div>
            </div>
            <div className="buttonstyle">
              {status ? (
                <button onClick={updatetodo}>Edit</button>
              ) : (
                <button onClick={formsubmit}>Add</button>
              )}
              <button>clear</button>
              {/* <button onClick={updatetodo}>Update</button> */}
            </div>
            {/* <div> <select name="">
                            <option>Update</option>
                            <option>Another update</option>
                        </select></div> */}
          </form>
        </div>
        {/* <button onClick={deletetodo}>delete</button> */}
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
                      <button
                        className="danger"
                        onClick={() => {
                          if (window.confirm("ToDo Data Delete successfully")) {
                            deletetodo(todo.id);
                          }
                        }}
                      >
                        <RiDeleteBin5Fill />
                      </button>
                    </td>
                    <td>
                      <button
                        style={{ borderRadius: "20px", padding: "5px" }}
                        onClick={() => {
                          showTodo(todo.id);
                        }}
                      >
                        Edit
                      </button>
                      {/* <SlOptionsVertical></SlOptionsVertical> */}
                      <Link to={`/task/todo_update/${todo.id}`}>
                        {" "}
                        <button className="edit"> Update</button>
                      </Link>
                    </td>
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
