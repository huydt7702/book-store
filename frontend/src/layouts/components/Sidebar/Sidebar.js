import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <section className={cx('menu-slide')}>
                <nav className={cx('menu__nav')}>
                    <ul className={cx('menu__list')}>
                        <li>
                            <NavLink className={cx('menu__item')} to="/sach-tieng-viet">
                                Sách Tiếng Việt
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={cx('menu__item')} to="/sach-tieng-anh">
                                Sách Tiếng Anh
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={cx('menu__item')} to="/truyen-tranh-manga">
                                Truyện Tranh Manga
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </section>
        </aside>
    );
}

export default Sidebar;
