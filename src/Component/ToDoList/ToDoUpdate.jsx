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
import { toastmessage } from "../../utils/Toast";
import Input from "../ReusableComponent/Input";
import Button from "../ReusableComponent/Button";
import TodoForm from "../ReusableComponent/TodoForm";

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
  const [validate, setvalidate] = useState(false);

  let task = useRef();
  let description = useRef();
  let duration = useRef();
  let email = useRef();
  let Token = localStorage.getItem("token");

  useEffect(() => {
    if (!Token) {
      navigate("/user/login");
    }
  });

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
    if (
      !validator.isEmail(email.current.value) ||
      description.current.value.length < 5 ||
      duration.current.value.length < 7 ||
      task.current.value.length < 5
    ) {
      setvalidate(true);
    } else {
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
            toastmessage("success", "ToDo Add successfully");
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
          toastmessage("success", "ToDo Update successfully");
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

  function remove(e) {
    e.preventDefault();
    settasks("");
    setdesc("");
    setdur("");
    setusername("");
  }

  return (
    <>
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
        hideButton={Hide}
        status={status}
        validate={validate}
        clearfeild={remove}
        formsubmit={AddTodo}
        onClick={updatetodo}
      />
      <ToastContainer />
    </>
  );
}

export default ToDoUpdate;
