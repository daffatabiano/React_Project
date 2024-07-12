import axios from 'axios';
import { Headers } from '../user/useAccount';
import { BASE_URL } from '../service/services';

const usePost = () => {
    const commentPost = async (body) => {
        try {
            const res = await axios.post(`${BASE_URL}/create-comment`, body, {
                headers: Headers,
            });
            return res;
        } catch (err) {
            return err;
        }
    };
    const commentDelete = async (id) => {
        try {
            const res = await axios.delete(`${BASE_URL}/delete-comment/${id}`, {
                headers: Headers,
            });
            return res;
        } catch (err) {
            return err;
        }
    };

    const likePost = async (body) => {
        try {
            const res = await axios.post(`${BASE_URL}/like`, body, {
                headers: Headers,
            });
            return res;
        } catch (err) {
            return err;
        }
    };

    const unlikePost = async (body) => {
        try {
            const res = await axios.post(`${BASE_URL}/unlike`, body, {
                headers: Headers,
            });
            return res;
        } catch (err) {
            return err;
        }
    };

    return { commentPost, commentDelete, likePost, unlikePost };
};

export default usePost;
