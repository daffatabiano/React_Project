import axios from 'axios';
import { Headers } from '../user/useAccount';
import { BASE_URL } from '../service/services';

const usePost = () => {
    const commentPost = async (body) => {
        try {
            const res = await axios.post(`${BASE_URL}/comment`, body, {
                headers: Headers,
            });
            return res;
        } catch (err) {
            return err;
        }
    };
    return { commentPost };
};

export default usePost;
