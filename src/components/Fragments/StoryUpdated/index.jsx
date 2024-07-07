import Slider from 'react-slick';
import './storyUpdated.css';
import { friendList } from '../../Layout/Headers/partials/FootSide.jsx';

export default function StoryUpdated() {
    return (
        <div className="slide-container">
            <Slider
                lazyLoad={true}
                dots={false}
                slidesToShow={8}
                slidesToScroll={8}
            >
                {friendList.map((item, index) => (
                    <div className="story" key={index}>
                        <img src={item.img} alt={`profile of ${item.name}`} />
                        <p>{item.username}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
