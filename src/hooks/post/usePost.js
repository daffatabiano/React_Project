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

    const followPost = async (body) => {
        try {
            const res = await axios.post(`${BASE_URL}/follow`, body, {
                headers: Headers,
            });
            return res;
        } catch (err) {
            return err;
        }
    };

    const unfollowPost = async (id) => {
        try {
            const res = await axios.delete(`${BASE_URL}/unfollow/${id}`, {
                headers: Headers,
            });
            return res;
        } catch (err) {
            return err;
        }
    };

    const createPost = async (body) => {
        try {
            const res = await axios.post(`${BASE_URL}/create-post`, body, {
                headers: Headers,
            });
            return res;
        } catch (err) {
            return err;
        }
    };

    const updatePost = async (id, body) => {
        try {
            const res = await axios.post(
                `${BASE_URL}/update-post/${id}`,
                body,
                {
                    headers: Headers,
                }
            );
            return res;
        } catch (err) {
            return err;
        }
    };

    const deletePost = async (id) => {
        try {
            const res = await axios.delete(`${BASE_URL}/delete-post/${id}`, {
                headers: Headers,
            });
            return res;
        } catch (error) {
            return error;
        }
    };

    return {
        commentPost,
        commentDelete,
        likePost,
        unlikePost,
        followPost,
        unfollowPost,
        createPost,
        updatePost,
        deletePost,
    };
};

export default usePost;
