import instance from "../../utils/ApiInstance";

const TODO_POST_URL='task/todopage'
const TODO_GET_URL='task/todopages'
const TODO_PUT_URL='task/todo_update'
const TODO_PUT_ID_URL='task/todo_update'
const TODO_DELETE_URL='task/todopage'
const TODO_GET_ID_URL='task/todo'


export const Todocreate=(data)=>{
    return instance.post(TODO_POST_URL,data)
}

export const Todoget=()=>{
    return instance.get(TODO_GET_URL)
}

export const Todogetbyid=(id)=>{
    return instance.get(`${TODO_GET_ID_URL}/${id}`)
}

export const Todoput=(Todoid,data)=>{
    return instance.put(`${TODO_PUT_URL}/${Todoid}`,data)
}

export const Todoputbyid=(id,data)=>{
return instance.put(`${TODO_PUT_ID_URL}/${id}`,data)
}

export const TodoDelete=(id)=>{
    return instance.delete(`${TODO_DELETE_URL}/${id}`)
}