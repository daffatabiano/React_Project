import axios from 'axios';
import { apiKey, BASE_URL } from '../service/services';
import { Headers } from '../user/useAccount';

const usePostByUserId = () => {
    const getPostByUserId = async (id) => {
        try {
            const res = await axios.get(`${BASE_URL}/users-post${id}`, {
                headers: Headers,
            });
            return res;
        } catch (err) {
            return err;
        }
    };
    return {
        getPostByUserId,
    };
};

export default usePostByUserId;
