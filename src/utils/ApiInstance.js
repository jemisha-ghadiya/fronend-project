import axios from "axios";


let Token = localStorage.getItem("token");
const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {authorization: Token ?`${Token}`:""}
  });

  export default instance;