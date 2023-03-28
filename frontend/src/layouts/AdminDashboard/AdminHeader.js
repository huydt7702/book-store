import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './AdminDashboard.module.scss';

const cx = classNames.bind(styles);

function AdminHeader() {
    return (
        <div className={cx('header')}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/" style={{ fontSize: '2rem', color: 'red' }}>
                    EduBook
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/users">
                                Users
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">
                                Products
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/categories">
                                Categories
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/comments">
                                Comments
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default AdminHeader;
