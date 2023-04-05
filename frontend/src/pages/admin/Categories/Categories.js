import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '~/createInstance';
import { logOutSuccess } from '~/redux/authSlice';
import * as categoryService from '~/services/categoryService';
import styles from './Categories.module.scss';

const cx = classNames.bind(styles);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '800px',
        transform: 'translate(-50%, -50%)',
    },
};

function Categories() {
    const [categories, setCategories] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isFormUpdate, setIsFormUpdate] = useState(false);
    const [idToUpdate, setIdToUpdate] = useState();
    const [categoryName, setCategoryName] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.login.currentUser);
    const accessToken = user?.accessToken;
    let axiosJWT = createAxios(user, dispatch, logOutSuccess);

    useEffect(() => {
        (async () => {
            const res = await categoryService.getAllCategories(dispatch, navigate, accessToken, axiosJWT);
            setCategories(res.data);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalIsOpen]);

    const handleInputChange = (e) => {
        setCategoryName(e.target.value);
    };

    const openModal = (category) => {
        if (category) {
            setCategoryName(category.name);
            setIsFormUpdate(true);
            setIdToUpdate(category._id);
        } else {
            setCategoryName('');
        }

        setIsOpen(true);
    };

    const handleCancel = (e) => {
        e.preventDefault();

        setIsOpen(false);
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        const res = await categoryService.addCategory({ name: categoryName }, accessToken, axiosJWT);
        if (res?.status === 200) {
            toast.success('Add category successfully');
            setIsOpen(false);
        } else {
            toast.error('Something went wrong!');
        }
    };

    const handleDelete = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this category?')) {
            const res = await categoryService.deleteCategory(id, accessToken, axiosJWT);
            if (res?.status === 200) {
                const newCategories = categories.filter((category) => category._id !== id);
                setCategories(newCategories);

                toast.success(res.data);
            } else {
                toast.error('Something went wrong!');
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const res = await categoryService.updateCategory(idToUpdate, { name: categoryName }, accessToken, axiosJWT);
        if (res?.status === 200) {
            toast.success('Update category successfully');
            setIsOpen(false);
        } else {
            toast.error('Something went wrong!');
        }
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('wrap-title')}>
                    <h1>List Categories</h1>
                    <button
                        onClick={() => {
                            openModal();
                            setIsFormUpdate(false);
                        }}
                    >
                        Add
                    </button>
                </div>
                <table className={cx('customers')}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category._id}>
                                <td>{category.name}</td>
                                <td>
                                    <button className={cx('update-btn')} onClick={() => openModal(category)}>
                                        Update
                                    </button>
                                    <button className={cx('delete-btn')} onClick={() => handleDelete(category._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={false} closeTimeoutMS={200}>
                <h2 className={cx('heading')}>{isFormUpdate ? 'Update Category' : 'Add Category'}</h2>
                <form>
                    <div className={cx('form-group')}>
                        <label htmlFor="title">Name</label>
                        <input
                            type="text"
                            id="categoryName"
                            name="categoryName"
                            value={categoryName}
                            placeholder="Category name"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className={cx('wrap-btn')}>
                        <button className={cx('cancel-btn')} onClick={handleCancel}>
                            Cancel
                        </button>
                        {isFormUpdate ? (
                            <button className={cx('add-btn')} onClick={handleUpdate}>
                                Update
                            </button>
                        ) : (
                            <button className={cx('add-btn')} onClick={handleAdd}>
                                Add
                            </button>
                        )}
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default Categories;
