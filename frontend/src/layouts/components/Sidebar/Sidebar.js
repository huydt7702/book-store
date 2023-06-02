import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { createAxios } from '~/createInstance';
import { logOutSuccess } from '~/redux/authSlice';
import * as categoryService from '~/services/categoryService';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.login.currentUser);
    const accessToken = user?.accessToken;
    let axiosJWT = createAxios(user, dispatch, logOutSuccess);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await categoryService.getAllCategories(dispatch, navigate, accessToken, axiosJWT);
            setCategories(res.data);
        };

        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <aside className={cx('wrapper')}>
            <section className={cx('menu-slide')}>
                <nav className={cx('menu__nav')}>
                    <ul className={cx('menu__list')}>
                        {categories?.map((category) => (
                            <li key={category._id}>
                                <NavLink
                                    className={({ isActive }) => cx('menu__item', { active: isActive })}
                                    to={`/category?id=${category._id}`}
                                >
                                    {category.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </section>
        </aside>
    );
}

export default Sidebar;
