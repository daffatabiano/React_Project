import { SUB_IMAGE, SUB_POST_IMAGE } from '../../../../hooks/service/services';
import './ModalComment.css';

export default function ModalComment(prop) {
    console.log(prop?.comments);
    return (
        <div className="modal-comment">
            <div className="modal-picture">
                <img
                    src={
                        prop.imageUrl?.length < 15 ||
                        prop?.imageUrl?.includes('fakepath')
                            ? SUB_POST_IMAGE
                            : prop.imageUrl
                    }
                    alt={`posted by ${prop.username || 'unknown'}`}
                />
            </div>
            <div className="modal-content">
                <div className="content">
                    <div className="uploaded">
                        <img
                            src={
                                prop?.user?.profilePictureUrl?.length < 20 ||
                                prop?.user?.profilePictureUrl === undefined
                                    ? SUB_IMAGE
                                    : prop?.user?.profilePictureUrl
                            }
                            alt={`profile of ${
                                prop?.user?.username || 'unknown'
                            }`}
                        />
                        <p>
                            <span>{prop?.user?.username || 'unknown'}</span>
                            {prop.caption}
                        </p>
                    </div>
                    <hr />
                    <div className="comments">
                        {prop?.comments?.map((item) => (
                            <div key={item.id} className="profile">
                                <img
                                    src={
                                        item?.user?.profilePictureUrl?.length <
                                        20
                                            ? SUB_IMAGE
                                            : item?.user?.profilePictureUrl
                                    }
                                    alt={`profile of ${
                                        item?.user?.username || 'unknown'
                                    }`}
                                />
                                <p>
                                    <span>{item?.user?.username}</span>
                                    {item?.comment}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
