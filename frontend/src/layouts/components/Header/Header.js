import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'tippy.js/dist/tippy.css';

import images from '~/assets/images';
import { BarsIcon, CartIcon, SearchIcon } from '~/components/Icons';
import config from '~/config';
import { createAxios } from '~/createInstance';
import { useDebounce } from '~/hooks';
import { logOut } from '~/redux/apiRequest';
import { logOutSuccess } from '~/redux/authSlice';
import * as productService from '~/services/productService';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.login.currentUser);
    const id = user?._id;
    const accessToken = user?.accessToken;
    let axiosJWT = createAxios(user, dispatch, logOutSuccess);

    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!user) {
            navigate(config.routes.auth);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            const res = await productService.getAllProducts(dispatch, navigate, accessToken, axiosJWT);
            const result = res.data.filter((product) => {
                const value = product.title.toLowerCase();

                return value.includes(debouncedValue.toLowerCase());
            });

            setSearchResult(result);
        };

        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue]);

    const handleLogout = async () => {
        const data = await logOut(dispatch, id, navigate, accessToken, axiosJWT);
        if (data?.status === 200) {
            toast.success('Logout successfully');
        } else {
            toast.error('Something went wrong!');
        }
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
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
                                <Link to="/" className={cx('header__logo-link')}>
                                    <img src={images.logo} alt="Logo" className={cx('header__logo-img')} />
                                </Link>
                            </h1>
                        </div>

                        <div className={cx('col-lg-6', 'col-md-7', 'col-sm-0', 'header__search')}>
                            <HeadlessTippy
                                interactive
                                visible={showResult && searchResult.length > 0}
                                placement="top-start"
                                render={(attrs) => (
                                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                                        <div className={cx('search-result')}>
                                            {searchResult.map((item) => (
                                                <Link
                                                    key={item._id}
                                                    to={`/product/${item.slug}`}
                                                    className={cx('search-item')}
                                                >
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className={cx('search-img')}
                                                    />
                                                    <h3 className={cx('search-title')}>{item.title}</h3>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                onClickOutside={handleHideResult}
                            >
                                <input
                                    type="text"
                                    className={cx('header__search-input')}
                                    placeholder="Tìm kiếm tại đây..."
                                    onChange={handleChange}
                                    onFocus={() => setShowResult(true)}
                                />
                            </HeadlessTippy>
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
                                    <Link to={config.routes.home} className={cx('header__nav-link')}>
                                        Trang chủ
                                    </Link>
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
