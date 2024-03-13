import axios from "axios";
import {
    API_LIST
} from "../utils/const";

export const handleLogin = async (payload) => {
    try{
        const response = await axios.post(API_LIST.LOGIN, payload);
        return response.data;
    }catch(err){
        console.log(err);
        throw err;
    }
}

export const handleRegister = async (payload) => {
    try{
        const response = await axios.post(API_LIST.REGISTER, payload);
        return response.data;
    }catch(err){
        console.log(err);
        throw err;
    }
}

export const handleUsers = async () => {
    try{
        const response = await axios.get(API_LIST.USERS);
        return response.data;
    }catch(err){
        console.log(err);
        throw err;
    }
}