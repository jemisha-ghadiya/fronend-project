import axios from "axios";


// let Token = localStorage.getItem("token");

export const getRequestHeader = () => {
  let Token = localStorage.getItem("token");
 
   return {
 authorization: Token ?`${Token}`:""
   };
 };

const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    // headers: {authorization: Token ?`${Token}`:""}
  });

  instance.interceptors.request.use(
    async(config)=>{
      const headers=getRequestHeader();
      config.headers={...headers,...config.headers};
      return config;
    },
    (error)=>{
      return Promise.reject(error);
    }
  )

  export default instance;