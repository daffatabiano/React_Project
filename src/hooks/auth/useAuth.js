import axios from 'axios';
import { apiKey, BASE_URL } from '../service/services';

function useAuth() {
    const authLogin = async (body) => {
        try {
            const res = await axios.post(`${BASE_URL}/login`, body, {
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

    const authRegister = async (body) => {
        try {
            const res = await axios.post(`${BASE_URL}/register`, body, {
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

    const authLogout = async (token) => {
        try {
            const res = await axios.get(`${BASE_URL}/logout`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    apiKey: apiKey,
                    Authorization: `Bearer ${token}`,
                },
            });
            return res;
        } catch (err) {
            return err;
        }
    };

    return { authLogin, authRegister, authLogout };
}

export default useAuth;
