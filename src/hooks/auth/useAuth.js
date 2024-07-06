import axios from 'axios';
import { apiKey, url } from '../service/services';

export function useAuth() {
    const handleLogin = async (body) => {
        try {
            const res = await axios.post(`${url}/login`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    apiKey: apiKey,
                },
            });
            return res;
        } catch (err) {
            return err;
        }
    };

    const handleRegister = async (body) => {
        await axios
            .post(`${url}/register`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    apiKey: apiKey,
                },
            })
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err.response.data;
            });
    };

    return { handleLogin, handleRegister };
}

export default useAuth;
