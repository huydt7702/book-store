import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createAxios } from '~/createInstance';
import { logOutSuccess } from '~/redux/authSlice';
import { deleteComment, getAllComments } from '~/services/commentService';
import styles from './Comments.module.scss';

const cx = classNames.bind(styles);

function Comments() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);

    const me = useSelector((state) => state.auth.login.currentUser);
    const accessToken = me?.accessToken;
    let axiosJWT = createAxios(me, dispatch, logOutSuccess);

    useEffect(() => {
        (async () => {
            const res = await getAllComments(dispatch, navigate, accessToken, axiosJWT);
            if (res?.status === 200) {
                setComments(res.data.reverse());
            } else {
                toast.error('Get all comments failed!');
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const StarRating = ({ averageScore, maxRating }) => {
        const fullStars = Math.round(averageScore);
        const halfStar = averageScore - fullStars >= 0.5;
        const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0);

        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FontAwesomeIcon icon={faStar} key={`star-${i}`} />);
        }
        if (halfStar) {
            stars.push(<FontAwesomeIcon icon={faStarHalfAlt} key="half-star" />);
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FontAwesomeIcon icon={faStar} key={`empty-star-${i}`} opacity="0.3" />);
        }

        return <div className={cx('stars')}>{stars}</div>;
    };

    const handleDelete = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this comment?')) {
            const res = await deleteComment(id, accessToken, axiosJWT);
            if (res?.status === 200) {
                const newComment = comments.filter((comment) => comment._id !== id);
                setComments(newComment);

                toast.success(res.data);
            } else {
                toast.error('Delete comment failed!');
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h1>List Comments</h1>
            <table className={cx('customers')}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Content</th>
                        <th>Rating</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map((comment) => (
                        <tr key={comment._id}>
                            <td>{comment.username}</td>
                            <td>{comment.review}</td>
                            <td>
                                <StarRating averageScore={comment.rating} maxRating={5} />
                            </td>
                            <td>
                                <button className={cx('delete-btn')} onClick={() => handleDelete(comment._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Comments;
