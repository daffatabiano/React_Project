import { Link, useNavigate } from 'react-router-dom';
import './Footside.css';
import { Dropdown, notification } from 'antd';
import useAuth from '../../../../../hooks/auth/useAuth';

export const friendList = [
    {
        name: 'Mark Zuck',
        username: '@mzuckerberg',
        img: 'https://reqres.in/img/faces/1-image.jpg',
    },
    {
        name: 'Peter Parker',
        username: '@peterparker',
        img: 'https://reqres.in/img/faces/2-image.jpg',
    },
    {
        name: 'Steve Rogers',
        username: '@stevergrs12',
        img: 'https://reqres.in/img/faces/3-image.jpg',
    },
    {
        name: 'John Doe',
        username: '@johndoe',
        img: 'https://reqres.in/img/faces/4-image.jpg',
    },
    {
        name: 'Jane Doe',
        username: '@janedoe',
        img: 'https://reqres.in/img/faces/5-image.jpg',
    },
];

const footerSideData = [
    'About',
    'Privacy Policy',
    'Contact Us',
    'FAQ',
    'Terms & Conditions',
];
const CardProfileSuggestions = (prop) => {
    const { img, name, username } = prop;
    return (
        <div className="profile-img">
            <img src={img} alt={`profile of ${name}`} />
            <p>
                {name}
                <em>{username}</em>
            </p>
        </div>
    );
};

export default function FootSide(prop) {
    const { profilePictureUrl, name, username } = prop;
    const yearsUpdated = new Date().getFullYear();
    const { authLogout } = useAuth();
    const token = localStorage.getItem('token');
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await authLogout(token).then((res) => {
            if (res?.status === 200) {
                api['success']({
                    message: 'Logout Success',
                    description: res?.data?.message,
                });
                setTimeout(() => {
                    localStorage.clear();
                    localStorage.removeItem('token');
                    navigate(0);
                }, 2000);
            } else {
                api['error']({
                    message: 'Logout Failed',
                    description: res?.response?.data?.message,
                });
            }
        });
    };
    return (
        <>
            {contextHolder}
            <div className="footer-side">
                <div className="profile">
                    <CardProfileSuggestions
                        img={
                            profilePictureUrl ||
                            'https://t4.ftcdn.net/jpg/05/09/07/49/360_F_509074967_jtbWlggeOjCGyQqAzA9uNgHoW6LWEDth.jpg'
                        }
                        name={name}
                        username={username}
                    />
                    <Dropdown
                        trigger={['click']}
                        placement="bottom"
                        menu={{
                            items: [
                                {
                                    key: '1',
                                    label: (
                                        <button
                                            style={{
                                                width: '100%',
                                                backgroundColor: 'transparent',
                                                color: 'red',
                                            }}
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    ),
                                },
                            ],
                        }}
                        arrow={{ pointAtCenter: true }}
                    >
                        <button>
                            <i className="bi bi-three-dots" />
                        </button>
                    </Dropdown>
                </div>
                <div className="friends">
                    <ul>
                        <div className="title">
                            <p>Most Friendly Contacted</p>
                            <Link to={'/'}>See All</Link>
                        </div>
                        {friendList.map((item, index) => (
                            <li className key={index}>
                                <CardProfileSuggestions {...item} />
                                <Link>View Profile</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="real-footer">
                    <ul>
                        <li>{footerSideData.map((item) => '  . ' + item)}</li>
                    </ul>
                </div>
                <p className="copyright">
                    &copy; {yearsUpdated} Daffa Tabiano. All rights reserved.
                </p>
            </div>
        </>
    );
}
