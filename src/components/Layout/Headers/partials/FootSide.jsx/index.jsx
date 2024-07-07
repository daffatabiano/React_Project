import { Link } from 'react-router-dom';
import './Footside.css';

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

export default function FootSide() {
    const yearsUpdated = new Date().getFullYear();
    return (
        <div className="footer-side">
            <div className="profile">
                <CardProfileSuggestions
                    img="https://reqres.in/img/faces/9-image.jpg"
                    name="John Doe"
                    username="@johndoe"
                />
                <button>
                    <i className="bi bi-three-dots" />
                </button>
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
    );
}
