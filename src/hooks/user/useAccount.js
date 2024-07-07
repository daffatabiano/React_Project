import axios from 'axios';
import { apiKey, BASE_URL } from '../service/services';

const token = localStorage.getItem('token');

export const Headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    apiKey: apiKey,
    Authorization: `${token}`,
};

function useAccount() {
    const getLogUser = async (endpoint) => {
        try {
            const res = await axios.get(`${BASE_URL}/${endpoint}`, {
                headers: Headers,
            });
            return res;
        } catch (err) {
            return err;
        }
    };

    const editUser = async (body) => {
        try {
            const res = await axios.post(`${BASE_URL}/update-profile`, body, {
                headers: Headers,
            });
            return res;
        } catch (err) {
            return err;
        }
    };

    return { getLogUser, editUser };
}

export default useAccount;
