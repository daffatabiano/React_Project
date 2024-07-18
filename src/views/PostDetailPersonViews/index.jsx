import { useLocation, useNavigate } from 'react-router-dom';
import Postcard from '../../components/Fragments/Cards';
import { useEffect, useState } from 'react';
import useGetPost from '../../hooks/post/useGet';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export default function PostDetailPersonViews() {
    const location = useLocation();
    const p = location?.pathname;
    const isId = p?.split('/')[2];
    console.log(isId);
    const { getDetailPosts } = useGetPost();
    const [isPosts, setIsPosts] = useState([]);
    const navigate = useNavigate();

    const getDetail = async () => {
        const res = await getDetailPosts(isId);
        setIsPosts(res?.data?.data);
    };

    useEffect(() => {
        getDetail();
    }, [isId]);

    const { md } = useBreakpoint();
    return <>{!md ? <Postcard {...isPosts} /> : navigate('/')}</>;
}
