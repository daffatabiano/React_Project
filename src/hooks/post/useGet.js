import axios from 'axios';
import { BASE_URL } from '../service/services';
import { Headers } from '../user/useAccount';

const useGetPost = () => {
    const getPost = async () => {
        try {
            const res = await axios.get(
                `${BASE_URL}/explore-post?size=10&page=2`,
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
        getPost,
    };
};

export default useGetPost;
