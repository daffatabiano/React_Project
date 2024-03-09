import axios from "axios";

export const handleLogin = async (API, payload) =>{
    const res = await axios.post(API, payload)
    return res;
}