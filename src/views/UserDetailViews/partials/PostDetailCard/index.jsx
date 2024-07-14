import { Col, Row, Tabs } from 'antd';
import './PostDetailCard.css';
import { useDispatch } from 'react-redux';
import { setIsShow } from '../../../../redux/slice/postSlice';

const cardPosts = (prop) => {
    return <div id="container">hello World!</div>;
};

export default function PostDetailCard(prop) {
    // const popular = prop?.posts?.map((item) => {
    //     const popular = item?.likes?.length > 0 ? true : false;
    //     return { ...item, popular };
    // });

    const Label = ({ text }) => {
        return <p style={{ color: 'white' }}>{text}</p>;
    };
    const dispatch = useDispatch();

    const items = [
        {
            key: '1',
            label: <Label text="Popular Posts" />,
            children: (
                <Row gutter={[8, 32]}>
                    {prop?.posts
                        ?.filter((item) => item?.totalLikes > 3)
                        .map((item) => (
                            <Col span={8} key={item.id}>
                                <div
                                    className="post-image"
                                    onClick={() =>
                                        dispatch(setIsShow(item?.id))
                                    }
                                >
                                    <img src={item?.imageUrl} alt="image" />
                                </div>
                            </Col>
                        ))}
                </Row>
            ),
        },
        {
            key: '2',
            label: <Label text="All Posts" />,
            children: (
                <Row gutter={[8, 32]}>
                    {prop?.posts
                        ?.filter((item) => item?.totalLikes >= 0)
                        .map((item) => (
                            <Col span={8} key={item.id}>
                                <div
                                    className="post-image"
                                    onClick={() =>
                                        dispatch(setIsShow(item?.id))
                                    }
                                >
                                    <img src={item?.imageUrl} alt="image" />
                                </div>
                            </Col>
                        ))}
                </Row>
            ),
        },
        {
            key: '3',
            label: <Label text="Less Popular Posts" />,
            children: (
                <Row gutter={[8, 32]}>
                    {prop?.posts
                        ?.filter(
                            (item) =>
                                item?.totalLikes < 3 && item?.totalLikes > 0
                        )
                        .map((item) => (
                            <Col span={8} key={item.id}>
                                <div className="post-image">
                                    <img src={item?.imageUrl} alt="image" />
                                </div>
                            </Col>
                        ))}
                </Row>
            ),
        },
    ];

    return (
        <>
            <Tabs defaultActiveKey="1" centered items={items} />
        </>
    );
}
