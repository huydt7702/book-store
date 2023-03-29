import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import images from '~/assets/images';
import config from '~/config';
import styles from './AdminDashboard.module.scss';

const cx = classNames.bind(styles);

function AdminHeader() {
    return (
        <div className={cx('header')}>
            <Link to={config.routes.home}>
                <img className={cx('logo')} src={images.logo} alt="Admin logo" />
            </Link>
        </div>
    );
}

export default AdminHeader;
