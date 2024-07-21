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
            <List>
                <VirtualList
                    data={data}
                    height={600}
                    itemHeight={47}
                    itemKey="email"
                    onScroll={onScroll}
                >
                    {(item) => (
                        <List.Item key={item.email}>
                            <List.Item.Meta
                                avatar={<Avatar src={item.picture.large} />}
                                title={
                                    <a href="https://ant.design">
                                        {item.name.last}
                                    </a>
                                }
                                description={item.email}
                            />
                            <div>Content</div>
                        </List.Item>
                    )}
                </VirtualList>
            </List>
        </div>
    );
}
