import { Button, Col, Empty, Row, Tabs, Typography } from 'antd';
import './PostDetailCard.css';
import { useDispatch } from 'react-redux';
import { setIsShow } from '../../../../redux/slice/postSlice';
import { SUB_POST_IMAGE } from '../../../../hooks/service/services';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { useNavigate } from 'react-router-dom';
import { CommentOutlined, HeartOutlined } from '@ant-design/icons';

export default function PostDetailCard(prop) {
    const dispatch = useDispatch();
    const { md } = useBreakpoint();
    const navigate = useNavigate();
    const Label = ({ text }) => {
        return (
            <p
                style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: md ? '16px' : '12px',
                }}
            >
                {text}
            </p>
        );
    };
    console.log(prop?.posts?.filter((item) => item?.totalLikes > 3));

    const items = [
        {
            key: '1',
            label: <Label text="Popular Posts" />,
            children: (
                <Row gutter={[8, 32]}>
                    {!prop?.totalItems ||
                        (prop?.posts?.filter((item) => item?.totalLikes > 3) <=
                            0 && (
                            <Col span={24}>
                                <Empty
                                    description={
                                        <Typography.Text
                                            style={{ color: 'white' }}
                                        >
                                            You don&apos;t have any fams post
                                        </Typography.Text>
                                    }
                                />
                            </Col>
                        ))}
                    {prop?.posts
                        ?.filter((item) => item?.totalLikes > 3)
                        .map((item) => (
                            <Col span={8} key={item.id}>
                                <div
                                    className="post-image"
                                    onClick={() =>
                                        md
                                            ? dispatch(setIsShow(item?.id))
                                            : navigate(
                                                  `/personal-post-detail/${item?.id}`
                                              )
                                    }
                                >
                                    <img
                                        src={
                                            item?.imageUrl?.includes(
                                                'fakepath'
                                            ) || item?.imageUrl?.length < 15
                                                ? SUB_POST_IMAGE
                                                : item?.imageUrl
                                        }
                                        alt="image"
                                    />
                                    <div className="explore-layout">
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                gap: '5px',
                                            }}
                                        >
                                            <HeartOutlined
                                                style={{
                                                    cursor: 'pointer',
                                                    color: 'white',
                                                }}
                                                onClick={() => alert('like')}
                                            />
                                            <span
                                                style={{
                                                    fontSize: '25px',
                                                    color: 'white',
                                                }}
                                            >
                                                {item?.totalLikes}
                                            </span>
                                        </div>
                                        <div>
                                            <CommentOutlined
                                                style={{
                                                    cursor: 'pointer',
                                                    color: 'white',
                                                }}
                                            />
                                        </div>
                                    </div>
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
                    {!prop?.totalItems && (
                        <Col span={24}>
                            <Empty
                                description={
                                    <Typography.Text style={{ color: 'white' }}>
                                        You don&apos;t have any post yet
                                    </Typography.Text>
                                }
                            >
                                <Button onClick={() => navigate('/post')}>
                                    Post Now
                                </Button>
                            </Empty>
                        </Col>
                    )}
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
                                    <img
                                        src={
                                            item?.imageUrl?.includes(
                                                'fakepath'
                                            ) || item?.imageUrl?.length < 15
                                                ? SUB_POST_IMAGE
                                                : item?.imageUrl
                                        }
                                        alt="image"
                                    />
                                    <div
                                        style={{ display: 'flex' }}
                                        className="explore-layout"
                                        onClick={() =>
                                            dispatch(setIsShow(item?.id))
                                        }
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                gap: '5px',
                                            }}
                                        >
                                            <HeartOutlined
                                                style={{
                                                    cursor: 'pointer',
                                                    color: 'white',
                                                    fontSize: md
                                                        ? '30px'
                                                        : '20px',
                                                }}
                                                onClick={() => alert('like')}
                                            />
                                            <span
                                                style={{
                                                    fontSize: md
                                                        ? '25px'
                                                        : '15px',
                                                    color: 'white',
                                                }}
                                            >
                                                {item?.totalLikes}
                                            </span>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                gap: '5px',
                                            }}
                                        >
                                            <CommentOutlined
                                                style={{
                                                    cursor: 'pointer',
                                                    color: 'white',
                                                    fontSize: md
                                                        ? '30px'
                                                        : '20px',
                                                }}
                                            />
                                        </div>
                                    </div>
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
                    {!prop?.totalItems && (
                        <Col span={24}>
                            <Empty
                                description={
                                    <Typography.Text style={{ color: 'white' }}>
                                        You don&apos;t have any post yet
                                    </Typography.Text>
                                }
                            >
                                <Button onClick={() => navigate('/post')}>
                                    Post Now
                                </Button>
                            </Empty>
                        </Col>
                    )}
                    {prop?.posts
                        ?.filter(
                            (item) =>
                                item?.totalLikes <= 3 && item?.totalLikes >= 0
                        )
                        .map((item) => (
                            <Col span={8} key={item.id}>
                                <div className="post-image">
                                    <img
                                        src={
                                            item?.imageUrl?.includes(
                                                'fakepath'
                                            ) || item?.imageUrl?.length < 15
                                                ? SUB_POST_IMAGE
                                                : item?.imageUrl
                                        }
                                        alt="image"
                                    />
                                    <div className="explore-layout">
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                gap: '5px',
                                            }}
                                        >
                                            <HeartOutlined
                                                style={{
                                                    cursor: 'pointer',
                                                    color: 'white',
                                                }}
                                                onClick={() => alert('like')}
                                            />
                                            <span
                                                style={{
                                                    fontSize: '25px',
                                                    color: 'white',
                                                }}
                                            >
                                                {item?.totalLikes}
                                            </span>
                                        </div>
                                        <div>
                                            <CommentOutlined
                                                style={{
                                                    cursor: 'pointer',
                                                    color: 'white',
                                                }}
                                            />
                                        </div>
                                    </div>
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
