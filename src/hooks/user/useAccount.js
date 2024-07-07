import axios from 'axios';
import { apiKey, BASE_URL } from '../service/services';

const token = localStorage.getItem('token');

export const Headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    apiKey: apiKey,
    Authorization: `Bearer ${token}`,
};

function useAccount() {
    const getLogUser = async (option) => {
        await axios.get(`${BASE_URL}/user/${option}`, {
            headers: Headers,
        });
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
