import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './AdminDashboard.module.scss';

const cx = classNames.bind(styles);

const listSidebar = [
    {
        id: 1,
        title: 'Users',
        to: '/users',
    },
    {
        id: 2,
        title: 'Products',
        to: '/products',
    },
    {
        id: 3,
        title: 'Categories',
        to: '/categories',
    },
    {
        id: 4,
        title: 'Comments',
        to: '/comments',
    },
    {
        id: 5,
        title: 'Statistical',
        to: '/statistical',
    },
];

function AdminSidebar() {
    return (
        <aside className={cx('sidebar')}>
            <ul className={cx('list-sidebar')}>
                {listSidebar.map((item) => (
                    <li key={item.id}>
                        <NavLink to={item.to} className={({ isActive }) => cx({ active: isActive })}>
                            {item.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default AdminSidebar;
