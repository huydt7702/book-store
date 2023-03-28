import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import * as categoryService from '~/services/categoryService';
const cx = classNames.bind(styles);

function Sidebar() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await categoryService.getAllCategories();
            setCategories(result);
        };

        fetchApi();
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
