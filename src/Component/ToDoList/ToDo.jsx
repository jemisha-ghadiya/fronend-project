import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import validator from "validator";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import "./ToDo.css";
import { RiDeleteBin5Fill } from "react-icons/ri";

import { Todocreate } from "../../api/todo";
import { Todoget } from "../../api/todo";
import { TodoDelete } from "../../api/todo";
import { Todoput } from "../../api/todo";
import { Todogetbyid } from "../../api/todo";

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
  const [hideButton, setHidebutton] = useState(false);

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
      const response = await Todoget({
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

  function ButtonHide() {
    if (tasks || desc || dur || username) {
      setHidebutton(true);
    } else {
      setHidebutton(false);
    }
  }

  useEffect(() => {
    ButtonHide();
  });

  const formsubmit = async (e) => {
    e.preventDefault();
    try {
      //   let id = localStorage.getItem("id");
      //   console.log(id, "token id");
      //   console.log("token----------------", Token);

      const response = await Todocreate(
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
          toast.success("Todo Data Add successfully");
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
        let response = await TodoDelete(id, {
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
      const response = await Todogetbyid(id, {
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
      let response = await Todoput(
        Todoid,
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
  function clearfeild(e) {
    e.preventDefault();
    setusername("");
    setdur("");
    setdesc("");
    settasks("");
  }

  return (
    <>
      <Link to="/task/todo_update/:id">
        {" "}
        <button className="another">Add</button>
      </Link>
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
                  value={tasks}
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
                  value={desc}
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
                  value={dur}
                  onChange={(e) => setdur(e.target.value)}
                  required
                ></input>
                {durErr ? (
                  <span>
                    enter duration only alphabet and more than 7 length
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
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  required
                ></input>
                {emailerr ? <span>enter valid email format</span> : ""}
              </div>
            </div>
            {hideButton ? (
              <div className="buttonstyle">
                {status ? (
                  <button
                    onClick={() => {
                      if (window.confirm("ToDo Data upadte successfully")) {
                        updatetodo();
                      }
                    }}
                  >
                    Edit
                  </button>
                ) : (
                  <button >Add</button>
                )}
                <button onClick={clearfeild}>clear</button>
              </div>
            ) : null}
            
          </form>
        </div>
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
                    <td>{todo.id}</td>
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
        <ToastContainer />
      </div>
    </>
  );
}
export default ToDoList;
