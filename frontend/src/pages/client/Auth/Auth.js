import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom/dist';
import { toast } from 'react-toastify';

import { FacebookIcon, GooglePlusIcon, LinkedInIcon } from '~/components/Icons';
import { loginUser, registerUser } from '~/redux/apiRequest';
import styles from './Auth.module.scss';

const cx = classNames.bind(styles);

function Auth() {
    const [changeLayout, setChangeLayout] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const newUser = {
            username,
            password,
        };

        const res = await loginUser(newUser, dispatch, navigate);
        if (res?.status === 200) {
            toast.success('Logged successfully');
        } else {
            toast.error('Something went wrong!');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const newUser = {
            username,
            email,
            password,
        };

        const res = await registerUser(newUser, dispatch, navigate);
        if (res?.status === 200) {
            toast.success('Registered successfully');
        } else {
            toast.error('Something went wrong!');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', changeLayout ? 'right-panel-active' : '')}>
                <div className={cx('form-container', 'sign-up-container')}>
                    <form onSubmit={handleRegister}>
                        <h1>Create Account</h1>
                        <div className={cx('social-container')}>
                            <a href="/" className={cx('social')}>
                                <FacebookIcon />
                            </a>
                            <a href="/" className={cx('social')}>
                                <GooglePlusIcon />
                            </a>
                            <a href="/" className={cx('social')}>
                                <LinkedInIcon />
                            </a>
                        </div>
                        <span>or use your email for registration</span>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className={cx('form-container', 'sign-in-container')}>
                    <form onSubmit={handleLogin}>
                        <h1>Sign in</h1>
                        <div className={cx('social-container')}>
                            <a href="/" className={cx('social')}>
                                <FacebookIcon />
                            </a>
                            <a href="/" className={cx('social')}>
                                <GooglePlusIcon />
                            </a>
                            <a href="/" className={cx('social')}>
                                <LinkedInIcon />
                            </a>
                        </div>
                        <span>or use your account</span>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <a href="/">Forgot your password?</a>
                        <button>Sign In</button>
                    </form>
                </div>
                <div className={cx('overlay-container')}>
                    <div className={cx('overlay')}>
                        <div className={cx('overlay-panel', 'overlay-left')}>
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className={cx('ghost')} onClick={() => setChangeLayout(false)}>
                                Sign In
                            </button>
                        </div>
                        <div className={cx('overlay-panel', 'overlay-right')}>
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className={cx('ghost')} onClick={() => setChangeLayout(true)}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
