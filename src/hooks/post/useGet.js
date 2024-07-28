import axios from 'axios';
import { BASE_URL } from '../service/services';
import { Headers } from '../user/useAccount';

const useGetPost = () => {
    const getExplore = async (end) => {
        try {
            const res = await axios.get(`${BASE_URL}/explore-post?${end}`, {
                headers: Headers,
            });
            return res;
        } catch (err) {
            return err;
        }
    };
    const getDetailPosts = async (id) => {
        try {
            const res = await axios.get(`${BASE_URL}/post/${id}`, {
                headers: Headers,
            });
            return res;
        } catch (err) {
            return err;
        }
    };

    const getMyFollowing = async (end) => {
        try {
            const res = await axios.get(`${BASE_URL}/my-following?${end}`, {
                headers: Headers,
            });
            return res;
        } catch (err) {
            return err;
        }
    };
    const getMyFollowers = async (end) => {
        try {
            const res = await axios.get(`${BASE_URL}/my-followers?${end}`, {
                headers: Headers,
            });
            return res;
        } catch (err) {
            return err;
        }
    };

    const getMyFollowingPosts = async (end) => {
        try {
            const res = await axios.get(`${BASE_URL}/following-post?${end}`, {
                headers: Headers,
            });
            return res;
        } catch (err) {
            return err;
        }
    };
    const getFollowing = async (end) => {
        try {
            const res = await axios.get(
                `${BASE_URL}/following/${end}?size=9999&page=1`,
                {
                    headers: Headers,
                }
            );
            return res;
        } catch (err) {
            return err;
        }
    };
    const getFollowers = async (end) => {
        try {
            const res = await axios.get(
                `${BASE_URL}/followers/${end}?size=9999&page=1`,
                {
                    headers: Headers,
                }
            );
            return res;
        } catch (err) {
            return err;
        }
    };

    const getPostsByPerson = async (id) => {
        try {
            const res = await axios.get(
                `${BASE_URL}/users-post/${id}?size=999&page=1`,
                {
                    headers: Headers,
                }
            );
            return res;
        } catch (err) {
            return err;
        }
    };

    return {
        getExplore,
        getDetailPosts,
        getMyFollowingPosts,
        getMyFollowing,
        getMyFollowers,
        getPostsByPerson,
        getFollowing,
        getFollowers,
    };
};

export default useGetPost;
