import classNames from 'classnames/bind';
import AdminHeader from './AdminHeader';
import styles from './AdminDashboard.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <AdminHeader />
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default DefaultLayout;
