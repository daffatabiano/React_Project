import BaseLayout from '../../components/Layout/Headers/BaseLayout';
import StoryUpdated from '../../components/Fragments/StoryUpdated';
import Postcard from '../../components/Fragments/Cards';
import { useEffect, useState } from 'react';
import './HomeViews.css';
import useGetPost from '../../hooks/post/useGet';

export default function HomeViews() {
    const [isData, setIsData] = useState([]);
    const { getPost } = useGetPost();
    const getDataExplore = async () => {
        await getPost().then((res) => console.log(res));
    };

    useEffect(() => {
        getDataExplore();
    }, []);
    return (
        <BaseLayout>
            <div className="home">
                <StoryUpdated />
                <Postcard />
            </div>
        </BaseLayout>
    );
}
