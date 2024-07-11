import Slider from 'react-slick';
import './storyUpdated.css';
import { friendList } from '../../Layout/Headers/partials/FootSide.jsx';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint.js';

export default function StoryUpdated() {
    const { xxl, xl } = useBreakpoint();
    return (
        <div className="slide-container">
            <Slider
                lazyLoad={true}
                dots={false}
                slidesToShow={xxl ? 10 : xl ? 8 : 6}
                slidesToScroll={8}
            >
                {friendList.map((item, index) => (
                    <div className="story" key={index}>
                        <img src={item.img} alt={`profile of ${item.name}`} />
                        <p>{item.username.slice(0, 8)}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
