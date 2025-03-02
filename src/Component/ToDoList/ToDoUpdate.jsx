// import {  } from "react";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import validator from "validator";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Todocreate } from "../../api/todo";
import { Todoputbyid } from "../../api/todo";
import { Todogetbyid } from "../../api/todo";

function ToDoUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [emailerr, setemailerr] = useState(false);
  const [descErr, setDes] = useState(false);
  const [taskErr, settask] = useState(false);
  const [durErr, setDuration] = useState(false);
  const [tasks, settasks] = useState("");
  const [desc, setdesc] = useState("");
  const [dur, setdur] = useState("");
  const [username, setusername] = useState("");
  const [status, setstatus] = useState(false);
  const [Hide, setHide] = useState(false);

  let task = useRef();
  let description = useRef();
  let duration = useRef();
  let email = useRef();
  let Token = localStorage.getItem("token");

  const showTodo = async () => {
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

  useEffect(() => {
    showTodo();
  }, []);

  function ButtonhideHandle() {
    // || desc == " " || dur == "" || username !== ""
    if (tasks || desc || dur || username) {
      setHide(true);
    } else {
      setHide(false);
    }
  }

  useEffect(() => {
    ButtonhideHandle();
  });

  const AddTodo = async (e) => {
    e.preventDefault();
    try {
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
          toast.success("ToDo Add successfully");
          // setTimeout(() => {
            navigate("/task/todopage");
          // }, 3000);
          showTodo();
        })
        .catch((error) => {
          console.log(error, "catch error");
        });
    } catch (err) {
      console.log(err.message, "error");
    }
  };

  const updatetodo = async (e) => {
    e.preventDefault();
    try {
      let response = await Todoputbyid(
        id,
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
          toast.success("ToDo Update successfully");
          // setTimeout(() => {
            navigate("/task/todopage");
          // }, 3000);
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

  function remove(e) {
    e.preventDefault();
    settasks("");
    setdesc("");
    setdur("");
    setusername("");
  }

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
                  onChange={(e) => taskHandle(settasks(e.target.value))}
                  value={tasks}
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
                  onChange={(e) => DescHandle(setdesc(e.target.value))}
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
                  onChange={(e) => DurHandle(setdur(e.target.value))}
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
                  onChange={(e) => emailHandle(setusername(e.target.value))}
                  required
                ></input>
                {emailerr ? <span>enter valid email format</span> : ""}
              </div>
            </div>

            {Hide ? (
              <div className="buttonstyle">
                {status ? (
                  <button onClick={updatetodo}>Update</button>
                ) : (
                  <button onClick={AddTodo}>Add</button>
                )}
                <button onClick={remove}>Clear</button>
              </div>
            ) : null}
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default ToDoUpdate;
