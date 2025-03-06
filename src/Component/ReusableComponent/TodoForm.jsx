import Input from "./Input";
import Button from "./Button";
import "../ToDoList/ToDo.css";
const TodoForm = ({
  status,
  validate,
  hideButton,
  tasks,
  taskErr,
  task,
  taskHandle,
  settasks,
  description,
  desc,
  DescHandle,
  setdesc,
  descErr,
  duration,
  dur,
  DurHandle,
  setdur,
  durErr,
  email,
  username,
  emailHandle,
  setusername,
  emailerr,
  clearfeild,
  formsubmit,
  onClick
}) => {
  return (
    <>
      <div className="container-todo">
        <div className="form-container-todo">
          <h2>To Do List</h2>
          <form>
            <div className="form-control-todo">
              {/* <div> */}
              <Input
                ref={task}
                type="text"
                placeholder="enter task"
                value={tasks}
                onChange={(e) => taskHandle(settasks(e.target.value))}
                errorMassage={
                  taskErr ? (
                    <span>enter task only alphabet and more than 5 length</span>
                  ) : (
                    ""
                  )
                }
              />
              {/* </div> */}

              {/* <div> */}
              <Input
                ref={description}
                type="text"
                placeholder="enter description"
                value={desc}
                onChange={(e) => DescHandle(setdesc(e.target.value))}
                required
                errorMassage={
                  descErr ? (
                    <span>
                      enter description only alphabet and more than 5 length
                    </span>
                  ) : (
                    ""
                  )
                }
              />
              {/* </div> */}
              {/* <div> */}
              <Input
                ref={duration}
                type="text"
                placeholder="enter duration"
                value={dur}
                onChange={(e) => DurHandle(setdur(e.target.value))}
                required
                errorMassage={
                  durErr ? (
                    <span>
                      enter duration only alphabet and more than 7 length
                    </span>
                  ) : (
                    ""
                  )
                }
              />
              {/* </div> */}
              {/* <div> */}
              <Input
                ref={email}
                type="email"
                placeholder="enter email"
                value={username}
                onChange={(e) => emailHandle(setusername(e.target.value))}
                required
                errorMassage={
                  emailerr ? <span>enter valid email format</span> : ""
                }
              />
              {/* </div> */}
            </div>
            {validate ? <span>All fields are Required *</span> : ""}
            {hideButton ? (
              <div className="buttonstyle">
                {status ? (
                  <Button
                    onClick={onClick}
                    // className="edit"
                    Name={"Edit"}
                  />
                ) : (
                  <Button
                    onClick={formsubmit}
                    Name={"Add"}
                    className="buttonstyle"
                  />
                )}
                &nbsp;&nbsp;
                <Button
                  onClick={clearfeild}
                  Name={"clear"}
                  className="buttonstyle"
                />
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
};
export default TodoForm;
