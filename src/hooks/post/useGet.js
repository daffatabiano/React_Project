import axios from 'axios';
import { BASE_URL } from '../service/services';
import { Headers } from '../user/useAccount';
import { useState } from 'react';

const useGetPost = () => {
    const getPost = async (end) => {
        try {
            const res = await axios.get(`${BASE_URL}/explore-post?${end}`, {
                headers: Headers,
            });
            return res;
        } catch (err) {
            return err;
        }
    };
    return { getPost };
};

export default useGetPost;
