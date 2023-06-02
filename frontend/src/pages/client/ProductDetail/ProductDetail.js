import { faEllipsisVertical, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import images from '~/assets/images';
import { createAxios } from '~/createInstance';
import { logOutSuccess } from '~/redux/authSlice';
import * as commentService from '~/services/commentService';
import * as productService from '~/services/productService';
import styles from './ProductDetail.module.scss';

const cx = classNames.bind(styles);

const stars = [
    {
        id: 1,
        title: '1 Sao',
    },
    {
        id: 2,
        title: '2 Sao',
    },
    {
        id: 3,
        title: '3 Sao',
    },
    {
        id: 4,
        title: '4 Sao',
    },
    {
        id: 5,
        title: '5 Sao',
    },
];

function ProductDetail() {
    const location = useLocation();
    const [product, setProduct] = useState({});
    const [comments, setComments] = useState([]);
    const [starCount, setStarCount] = useState(5);
    const [commentContent, setCommentContent] = useState('');
    const [renderPage, setRenderPage] = useState(false);

    const user = useSelector((state) => state.auth.login.currentUser);
    const path = location.pathname;
    const slug = path.split('/').pop();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const accessToken = user?.accessToken;
    let axiosJWT = createAxios(user, dispatch, logOutSuccess);

    useEffect(() => {
        (async () => {
            const res = await productService.getProductBySlug(slug, dispatch, navigate, accessToken, axiosJWT);
            setProduct(res.data.data);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [renderPage, slug]);

    useEffect(() => {
        (async () => {
            const res = await commentService.getAllCommentOfProductId(
                product._id,
                dispatch,
                navigate,
                accessToken,
                axiosJWT,
            );
            setComments(res.data.data);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product._id, renderPage]);

    const handleSelectStar = (star) => {
        setStarCount(star);
    };

    const handleAddComment = async (e) => {
        e.preventDefault();

        const formData = {
            rating: starCount,
            review: commentContent,
            username: user.username,
            userImage: images.noImage,
            productId: product._id,
        };

        const res = await commentService.addComment(formData, accessToken, axiosJWT);
        if (res?.status === 200) {
            toast.success('Comment successfully');
            setRenderPage(!renderPage);
        } else {
            toast.error('Something went wrong!');
        }
    };

    const formatNumber = (price) => {
        return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

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

    const renderDate = (data) => {
        const date = new Date(data);
        const formattedDate = `${date.getUTCDate()}/${
            date.getUTCMonth() + 1
        }/${date.getUTCFullYear()} - Lúc ${date.getHours()} giờ ${date.getMinutes()} phút`;

        return formattedDate;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('product')}>
                <div className={cx('col-lg-5')}>
                    <img className={cx('product-image')} src={product.image} alt={product.title} />
                </div>
                <div className={cx('col-lg-7')}>
                    <h3 className={cx('product-title')}>{product.title}</h3>
                    <div className={cx('product-info')}>
                        <span>Tác giả: {product.author}</span>
                        <span>Năm xuất bản: {product.year}</span>
                        <div className={cx('wrap-rating')}>
                            <StarRating averageScore={product.average_score} maxRating={5} />
                            <span className={cx('review-count')}>({product.review_count} đánh giá)</span>
                        </div>
                        <span>
                            Giá: <span className={cx('price')}>{formatNumber(product.price)}đ</span>
                        </span>
                        <span className={cx('quantity')}>
                            Số lượng:
                            <div className={cx('quantity-wrapper')}>
                                <button className={cx('quantity-btn')}>-</button>
                                <span className={cx('quantity-value')}>1</span>
                                <button className={cx('quantity-btn')}>+</button>
                            </div>
                        </span>
                    </div>
                    <div>
                        <button className={cx('add-to-cart-btn')}>Thêm Vào Giỏ Hàng</button>
                    </div>
                </div>
            </div>
            <div className={cx('wrap-desc', 'col-lg-12')}>
                <h3 className={cx('heading')}>Mô tả sản phẩm</h3>
                <p className={cx('desc')}>{product.desc}</p>
            </div>
            <div className={cx('wrap-reviews', 'col-lg-12')}>
                <h3 className={cx('heading')}>Đánh giá sản phẩm</h3>
                {comments.length === 0 && <p>Chưa có đánh giá nào cho sản phẩm này.</p>}
                {comments.map((comment) => (
                    <div key={comment._id} className={cx('reviews')}>
                        <div className={cx('wrap-user')}>
                            <img className={cx('user-image')} src={comment.userImage} alt={comment.username} />
                            <div className={cx('name')}>
                                <span>{comment.username}</span>
                                <div className={cx('wrap-rating')}>
                                    <div className={cx('ratings')}>
                                        <StarRating averageScore={comment.rating} maxRating={5} />
                                    </div>
                                    <span>{renderDate(comment.updatedAt)}</span>
                                </div>
                            </div>
                        </div>
                        <p className={cx('review')}>{comment.review}</p>
                        <span className={cx('menu-icon')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </span>
                    </div>
                ))}
                <form action="" className={cx('comment')} onSubmit={handleAddComment}>
                    <h4 className={cx('title')}>Để lại đánh giá cho sản phẩm này</h4>
                    <h3>Đánh giá sao *</h3>
                    <div className={cx('stars')}>
                        {stars.map((star) => (
                            <div
                                className={cx('star-btn', { active: starCount === star.id })}
                                key={star.id}
                                onClick={() => handleSelectStar(star.id)}
                            >
                                {star.title}
                            </div>
                        ))}
                    </div>
                    <h3>Viết đánh giá cho sản phẩm này *</h3>
                    <textarea rows="6" onChange={(e) => setCommentContent(e.target.value)}></textarea>
                    <button className={cx('comment-btn')}>Bình luận</button>
                </form>
            </div>
        </div>
    );
}

export default ProductDetail;
