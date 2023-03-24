import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import images from '~/assets/images';
import { BarsIcon, CartIcon, SearchIcon } from '~/components/Icons';
import { createAxios } from '~/createInstance';
import { logOut } from '~/redux/apiRequest';
import { logOutSuccess } from '~/redux/authSlice';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.login.currentUser);
    const id = user?._id;
    const accessToken = user?.accessToken;
    let axiosJWT = createAxios(user, dispatch, logOutSuccess);

    useEffect(() => {
        if (!user) {
            navigate('/auth');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogout = async () => {
        const data = await logOut(dispatch, id, navigate, accessToken, axiosJWT);
        if (data?.status === 200) {
            toast.success('Logout successfully');
        } else {
            toast.error('Something went wrong!');
        }
    };

    return (
        <header className={cx('header')}>
            <div className={cx('header__top')}>
                <div className={cx('container')}>
                    <section className={cx('row', 'flex')}>
                        <div className={cx('col-lg-5', 'col-md-0', 'col-sm-0', 'header__top-left')}>
                            <span>EduBook - Cội nguồn của tri thức</span>
                        </div>

                        <nav className={cx('col-lg-7', 'col-md-0', 'col-sm-0', 'header__top-right')}>
                            <ul className={cx('header__top-list')}>
                                <li className={cx('header__top-item')}>
                                    <a href="/" className={cx('header__top-link')}>
                                        Hỏi đáp
                                    </a>
                                </li>
                                <li className={cx('header__top-item')}>
                                    <a href="/" className={cx('header__top-link')}>
                                        Hướng dẫn
                                    </a>
                                </li>
                                <li className={cx('header__top-item')}>
                                    <a href="/" className={cx('header__top-link')}>
                                        Hi, {user?.username}
                                    </a>
                                </li>
                                <li className={cx('header__top-item')}>
                                    <span className={cx('header__top-link')} onClick={handleLogout}>
                                        Đăng xuất
                                    </span>
                                </li>
                            </ul>
                        </nav>
                    </section>
                </div>
            </div>

            <div className={cx('header__bottom')}>
                <div className={cx('container')}>
                    <section className={cx('row')}>
                        <div className={cx('col-lg-3', 'col-md-4', 'col-sm-12', 'header__logo')}>
                            <h1 className={cx('header__heading')}>
                                <a href="/" className={cx('header__logo-link')}>
                                    <img src={images.logo} alt="Logo" className={cx('header__logo-img')} />
                                </a>
                            </h1>
                        </div>

                        <div className={cx('col-lg-6', 'col-md-7', 'col-sm-0', 'header__search')}>
                            <input
                                type="text"
                                className={cx('header__search-input')}
                                placeholder="Tìm kiếm tại đây..."
                            />
                            <button className={cx('header__search-btn')}>
                                <div className={cx('header__search-icon-wrap')}>
                                    <i className={cx('header__search-icon')}>
                                        <SearchIcon />
                                    </i>
                                </div>
                            </button>
                        </div>

                        <div className={cx('col-lg-2', 'col-md-0', 'col-sm-0', 'header__call')}>
                            <div className={cx('header__call-icon-wrap')}>
                                <i className={cx('fas', 'fa-phone-alt', 'header__call-icon')}></i>
                            </div>
                            <div className={cx('header__call-info')}>
                                <div className={cx('header__call-text')}>Gọi điện tư vấn</div>
                                <div className={cx('header__call-number')}>039.882.3232</div>
                            </div>
                        </div>

                        <a href="cart.html" className={cx('col-lg-1', 'col-md-1', 'col-sm-0', 'header__cart')}>
                            <div className={cx('header__cart-icon-wrap')}>
                                <span className={cx('header__notice')}>2</span>
                                <i className={cx('header__nav-cart-icon')}>
                                    <CartIcon />
                                </i>
                            </div>
                        </a>
                    </section>
                </div>
            </div>

            <div className={cx('header__nav')}>
                <div className={cx('container')}>
                    <section className={cx('row')}>
                        <div className={cx('header__nav-menu-wrap', 'col-lg-3', 'col-md-0', 'col-sm-0')}>
                            <i className={cx('header__nav-menu-icon')}>
                                <BarsIcon />
                            </i>
                            <div className={cx('header__nav-menu-title')}>Danh mục sản phẩm</div>
                        </div>

                        <div className={cx('header__nav col-lg-9', 'col-md-0', 'col-sm-0')}>
                            <ul className={cx('header__nav-list')}>
                                <li className={cx('header__nav-item')}>
                                    <a href="index.html" className={cx('header__nav-link')}>
                                        Trang chủ
                                    </a>
                                </li>
                                <li className={cx('header__nav-item')}>
                                    <a href="category.html" className={cx('header__nav-link')}>
                                        Danh mục sản phẩm
                                    </a>
                                </li>
                                <li className={cx('header__nav-item')}>
                                    <a href="product.html" className={cx('header__nav-link')}>
                                        Sản phẩm
                                    </a>
                                </li>
                                <li className={cx('header__nav-item')}>
                                    <a href="post.html" className={cx('header__nav-link')}>
                                        Bài viết
                                    </a>
                                </li>
                                <li className={cx('header__nav-item')}>
                                    <a href="/" className={cx('header__nav-link')}>
                                        Tuyển cộng tác viên
                                    </a>
                                </li>
                                <li className={cx('header__nav-item')}>
                                    <a href="contact.html" className={cx('header__nav-link')}>
                                        Liên hệ
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </header>
    );
}

export default Header;
