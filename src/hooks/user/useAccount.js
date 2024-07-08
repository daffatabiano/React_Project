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
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    apiKey: apiKey,
                    Authorization: `${token}`,
                    'Accept-Encoding': 'gzip, deflate, br',
                },
            });
            return res;
        } catch (err) {
            return err;
        }
    };

    const uploadImage = async (body) => {
        try {
            const res = await axios.post(`${BASE_URL}/upload-image`, body, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Accept: 'application/json',
                    apiKey: apiKey,
                    Authorization: `${token}`,
                },
            });
            return res;
        } catch (err) {
            return err;
        }
    };

    return { getLogUser, editUser, uploadImage };
}

export default useAccount;
