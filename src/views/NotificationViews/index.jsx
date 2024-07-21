import { Avatar, List, message } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useEffect, useState } from 'react';
import './NotificationsViews.css';

const fakeDataUrl =
    'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';

export default function NotificationsViews() {
    const [data, setData] = useState([]);
    const appendData = () => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((body) => {
                setData(data.concat(body.results));
                message.success(`${body.results.length} more items loaded!`);
            });
    };
    useEffect(() => {
        appendData();
    }, []);
    const onScroll = (e) => {
        // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
        if (
            Math.abs(
                e.currentTarget.scrollHeight - e.currentTarget.scrollTop - 600
            ) <= 1
        ) {
            appendData();
        }
    };

    return (
        <div className="notif">
            <List
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    padding: '25px 10px',
                    borderRadius: '20px',
                }}
            >
                <VirtualList
                    data={data}
                    height={600}
                    itemHeight={47}
                    itemKey="email"
                    onScroll={onScroll}
                    styles={{ border: '11px solid #f0f0f0' }}
                >
                    {(item) => (
                        <List.Item style={{ color: 'white' }} key={item.email}>
                            <List.Item.Meta
                                avatar={<Avatar src={item.picture.large} />}
                                title={
                                    <a
                                        style={{ color: 'white' }}
                                        href="https://ant.design"
                                    >
                                        {item.name.last}
                                    </a>
                                }
                                description={
                                    <p style={{ color: 'white' }}>
                                        {item.email}
                                    </p>
                                }
                                style={{ color: 'white' }}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '10px',
                                    flexDirection: 'column',
                                }}
                            >
                                <button
                                    style={{
                                        borderRadius: '20px',
                                        padding: '10px 20px',
                                    }}
                                >
                                    Mark as read
                                </button>
                                <button
                                    style={{
                                        borderRadius: '20px',
                                        padding: '10px 20px',
                                        color: 'red',
                                    }}
                                >
                                    Delete
                                </button>
                                <button
                                    style={{
                                        borderRadius: '20px',
                                        padding: '10px 20px',
                                        color: '#1890ff',
                                    }}
                                >
                                    Views
                                </button>
                            </div>
                        </List.Item>
                    )}
                </VirtualList>
            </List>
        </div>
    );
}
