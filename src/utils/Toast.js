import { toast } from "react-toastify";


export const handlesucess=(msg)=>{
toast.success(msg,{autoClose:true});
}


export const handleerror=(msg)=>{
    toast.error(msg,{autoClose:true})
}


export const toastmessage=(restype,msg)=>{
  toast(msg,{
    type:restype,
    autoClose:true
  })
}