import { Collapse, Table } from 'antd';
import './FriendsViews.css';
import { CaretRightOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

const text = `A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.`;

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        width: 150,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        width: 150,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        width: 200,
    },
];

const getItems = (panelStyle) => [
    {
        key: '1',
        label: <p style={{ color: 'white' }}>Close friends</p>,
        children: (
            <Table
                columns={columns}
                dataSource={data}
                scroll={{
                    y: 240,
                }}
                style={panelStyle}
                pagination={{
                    defaultPageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20', '50'],
                    className: 'pagination',
                }}
            />
        ),
        style: panelStyle,
    },
    {
        key: '2',
        label: <p style={{ color: 'white' }}>My Following</p>,
        children: (
            <Table
                columns={columns}
                dataSource={data}
                scroll={{
                    y: 240,
                }}
                style={panelStyle}
                pagination={{
                    defaultPageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20', '50'],
                    className: 'pagination',
                }}
            />
        ),
        style: panelStyle,
    },
    {
        key: '3',
        label: <p style={{ color: 'white' }}>My Followers</p>,
        children: (
            <Table
                columns={columns}
                dataSource={data}
                scroll={{
                    y: 240,
                }}
                style={panelStyle}
                pagination={{
                    defaultPageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20', '50'],
                    className: 'pagination',
                }}
            />
        ),
        style: panelStyle,
    },
];

export default function FriendsViews() {
    const panelStyle = {
        marginBottom: 24,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 20,
        border: 'none',
        color: 'white',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
    };

    return (
        <div className="friends">
            <div className="contain">
                <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => (
                        <CaretRightOutlined
                            style={{ color: 'white' }}
                            rotate={isActive ? 90 : 0}
                        />
                    )}
                    style={{ width: '100%' }}
                    items={getItems(panelStyle)}
                />
            </div>
        </div>
    );
}
