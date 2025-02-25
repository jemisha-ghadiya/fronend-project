// import {  } from "react";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import validator from "validator";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ToDoUpdate() {
  const { id } = useParams();
  const navigate=useNavigate()
  const [emailerr, setemailerr] = useState(false);
  const [descErr, setDes] = useState(false);
  const [taskErr, settask] = useState(false);
  const [durErr, setDuration] = useState(false);
  const [tasks, settasks] = useState("");
  const [desc, setdesc] = useState("");
  const [dur, setdur] = useState("");
  const [username, setusername] = useState("");
 
  let task = useRef();
  let description = useRef();
  let duration = useRef();
  let email = useRef();

  let Token = localStorage.getItem("token");

  const showTodo = async () => {
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
          setusername(response.data.todoAllData[0].username)

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

const updatetodo = async () => {
      try {
        let response = await axios
          .put(
            `http://localhost:3000/task/todo_update/${id}`,
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
           
          })
          .catch((error) => {
            console.log(error, "catch error");
          });
      } catch (err) {
        console.log(err.message, "error");
      }
    };




  //   function emailHandle() {
  //     if (!validator.isEmail(email.current.value)) {
  //       setemailerr(true);
  //     } else {
  //       setemailerr(false);
  //     }
  //   }
  //   function taskHandle() {
  //     var letters = /^[A-Za-z]+$/;
  //     if (task.current.value.length < 5 && task.current.value.match(letters)) {
  //       settask(true);
  //     } else {
  //       settask(false);
  //     }
  //   }
  //   function DescHandle() {
  //     var letters = /^[A-Za-z]+$/;
  //     if (
  //       description.current.value.length < 5 &&
  //       description.current.value.match(letters)
  //     ) {
  //       setDes(true);
  //     } else {
  //       setDes(false);
  //     }
  //   }
  //   function DurHandle() {
  //     var letters = /^[A-Za-z]+$/;
  //     if (
  //       duration.current.value.length < 7 &&
  //       duration.current.value.match(letters)
  //     ) {
  //       setDuration(true);
  //     } else {
  //       setDuration(false);
  //     }
  //   }

  return (
    <>
      <div className="container-todo">
        <div className="form-container-todo">
          <h2>To Do List</h2>
          <form onClick={updatetodo}>
            <div className="form-control-todo">
              <div>
                <input
                  ref={task}
                  type="text"
                  placeholder="enter task"
                  onChange={(e) => settasks(e.target.value)}
                  defaultValue={tasks}
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
                  onChange={(e)=>setdesc(e.target.value)}
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
                  onChange={(e)=>setdur(e.target.value)}
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
  <button onClick={()=>{
    if (window.confirm("ToDo Data upadte successfully")) {
        updatetodo();
      }
  }}><Link to="/task/todopage">Update</Link></button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ToDoUpdate;
