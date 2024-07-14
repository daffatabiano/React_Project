import Slider from 'react-slick';
import './storyUpdated.css';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint.js';
import { SUB_IMAGE } from '../../../hooks/service/services.js';

export default function StoryUpdated(prop) {
    const storyProfile = prop;
    console.log(storyProfile[0].length);
    const { xxl, xl } = useBreakpoint();
    return (
        <div className="slide-container">
            <Slider
                lazyLoad={true}
                dots={false}
                slidesToShow={xxl ? 10 : xl ? 8 : 6}
                slidesToScroll={8}
            >
                {storyProfile[0].length <= 1 &&
                    storyProfile[0].length === 0 && (
                        <div className="story">
                            <img
                                src={
                                    prop[0]?.user?.profilePictureUrl ||
                                    SUB_IMAGE
                                }
                                alt={`profile of ${
                                    prop[0]?.user?.username || 'unknown'
                                }`}
                            />
                            <p>{prop[0]?.user?.username || 'unknown'}</p>
                        </div>
                    )}
                {storyProfile[0]?.map((item) => (
                    <div className="story" key={item.id}>
                        <img
                            src={item?.user?.profilePictureUrl || SUB_IMAGE}
                            alt={`profile of ${item.username || 'unknown'}`}
                        />
                        <p>{item?.user?.username || 'unknown'}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
