import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { createAxios } from '~/createInstance';
import { getAllUsers } from '~/redux/apiRequest';
import { getUsersSuccess } from '~/redux/userSlice';
import styles from './Users.module.scss';

const cx = classNames.bind(styles);

function Users() {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);

    const me = useSelector((state) => state.auth.login.currentUser);
    const accessToken = me?.accessToken;
    let axiosJWT = createAxios(me, dispatch, getUsersSuccess);

    useEffect(() => {
        (async () => {
            const res = await getAllUsers(accessToken, dispatch, axiosJWT);
            if (res.status === 200) {
                setUsers(res.data);
            } else {
                toast.error('Get all users failed!');
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h1>List Users</h1>
            <table className={cx('customers')}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                            <td>{user.isAdmin || <button className={cx('delete-btn')}>Delete</button>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;
