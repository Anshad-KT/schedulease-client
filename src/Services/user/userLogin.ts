import { api } from "../axios";

export const userLogin = async(args: {email:string,username:string}) => {
    const {data}= await api.post(`/api/user/login`, args)
    console.log(data);
    return data
} 

export const userSignup = async(args: {email:string,username:string}) => {
    const {data}= await api.post(`/api/user/signup`, args)
    console.log(data);
    return data
} 