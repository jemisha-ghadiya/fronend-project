import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import validator from "validator";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./ToDo.css";
import { RiDeleteBin5Fill } from "react-icons/ri";

import { Todocreate } from "../../api/todo";
import { Todoget } from "../../api/todo";
import { TodoDelete } from "../../api/todo";
import { Todoput } from "../../api/todo";
import { Todogetbyid } from "../../api/todo";
import { toastmessage } from "../../utils/Toast";
import Input from "../ReusableComponent/Input";
import { SlOptionsVertical } from "react-icons/sl";
import Button from "../ReusableComponent/Button";
import TodoForm from "../ReusableComponent/TodoForm";

function ToDoList() {
  let Token = localStorage.getItem("token");
  let navigate = useNavigate();
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
  const [validate, setvalidate] = useState(false);

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
    if (!Token) {
      navigate("/user/login");
    }
  }, []);

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
    if (
      !validator.isEmail(email.current.value) ||
      description.current.value.length < 5 ||
      duration.current.value.length < 7 ||
      task.current.value.length < 5
    ) {
      setvalidate(true);
    } else {
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
            toastmessage("success", "Todo Data Add successfully");
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
    }
  };

  function emailHandle() {
    if (!validator.isEmail(email.current.value)) {
      setemailerr(true);
      setvalidate(false);
    } else {
      setemailerr(false);
      setvalidate(false);
    }
  }
  function taskHandle() {
    var letters = /^[A-Za-z]+$/;
    if (task.current.value.length < 5 && task.current.value.match(letters)) {
      settask(true);
      setvalidate(false);
    } else {
      settask(false);
      setvalidate(false);
    }
  }
  function DescHandle() {
    var letters = /^[A-Za-z]+$/;
    if (
      description.current.value.length < 5 &&
      description.current.value.match(letters)
    ) {
      setDes(true);
      setvalidate(false);
    } else {
      setDes(false);
      setvalidate(false);
    }
  }
  function DurHandle() {
    var letters = /^[A-Za-z]+$/;
    if (
      duration.current.value.length < 7 &&
      duration.current.value.match(letters)
    ) {
      setDuration(true);
      setvalidate(false);
    } else {
      setDuration(false);
      setvalidate(false);
    }
  }

  const deletetodo = async (id) => {
    if (id) {
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
        <div className="AddTodoButton">
          <Button className="another" Name={"Add"} />
        </div>
      </Link>
      <TodoForm
        task={task}
        tasks={tasks}
        taskHandle={taskHandle}
        settasks={settasks}
        taskErr={taskErr}
        
        description={description}
        desc={desc}
        DescHandle={DescHandle}
        setdesc={setdesc}
        descErr={descErr}
        duration={duration}
        dur={dur}
        DurHandle={DurHandle}
        setdur={setdur}
        durErr={durErr}
        email={email}
        username={username}
        emailHandle={emailHandle}
        setusername={setusername}
        emailerr={emailerr}
        status={status}
        validate={validate}
        hideButton={hideButton}
        clearfeild={clearfeild}
        formsubmit={formsubmit}
        onClick={() => {
          if (window.confirm("ToDo Data upadte successfully")) {
            updatetodo();
          }
        }}
      />
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
                      <div>
                        <Button
                          className="danger"
                          onClick={() => {
                            if (
                              window.confirm("ToDo Data Delete successfully")
                            ) {
                              deletetodo(todo.id);
                            }
                          }}
                          Name={<RiDeleteBin5Fill />}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="editbutton">
                        <Button
                          className="edit"
                          onClick={() => {
                            showTodo(todo.id);
                          }}
                          Name={"Edit"}
                        />
                        <Link to={`/task/todo_update/${todo.id}`}>
                          {" "}
                          <Button className="edit" Name={"Update"} />
                        </Link>
                      </div>
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
