import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { createAxios } from '~/createInstance';
import { getAllUsers, deleteUser } from '~/redux/apiRequest';
import { getUsersSuccess, deleteUsersSuccess } from '~/redux/userSlice';
import styles from './Users.module.scss';

const cx = classNames.bind(styles);

function Users() {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);

    const me = useSelector((state) => state.auth.login.currentUser);
    const accessToken = me?.accessToken;
    let axiosJWTGetAllUsers = createAxios(me, dispatch, getUsersSuccess);
    let axiosJWTDeleteUser = createAxios(me, dispatch, deleteUsersSuccess);

    useEffect(() => {
        (async () => {
            const res = await getAllUsers(accessToken, dispatch, axiosJWTGetAllUsers);
            if (res.status === 200) {
                setUsers(res.data);
            } else {
                toast.error('Get all users failed!');
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this user?')) {
            const res = await deleteUser(accessToken, dispatch, id, axiosJWTDeleteUser);
            if (res.status === 200) {
                const newUsers = users.filter((user) => user._id !== id);
                setUsers(newUsers);

                toast.success(res.data);
            } else {
                toast.error('Delete user failed!');
            }
        }
    };

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
                            <td>
                                {user.isAdmin || (
                                    <button className={cx('delete-btn')} onClick={() => handleDelete(user._id)}>
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;
