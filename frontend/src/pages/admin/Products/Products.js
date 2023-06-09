import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '~/createInstance';
import { logOutSuccess } from '~/redux/authSlice';
import * as categoryService from '~/services/categoryService';
import * as productService from '~/services/productService';
import styles from './Products.module.scss';

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

function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isFormUpdate, setIsFormUpdate] = useState(false);
    const [idToUpdate, setIdToUpdate] = useState();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        desc: '',
        year: 0,
        categoryId: '',
        price: 0,
        image: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.login.currentUser);
    const accessToken = user?.accessToken;
    let axiosJWT = createAxios(user, dispatch, logOutSuccess);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await productService.getAllProducts(dispatch, navigate, accessToken, axiosJWT);
            setProducts(result.data);
        };

        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalIsOpen]);

    useEffect(() => {
        (async () => {
            const res = await categoryService.getAllCategories(dispatch, navigate, accessToken, axiosJWT);
            setCategories(res.data);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getCategoryName = (categoryId) => {
        const category = categories.find((cate) => cate._id === categoryId);
        return category?.name;
    };

    const handleInputChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const openModal = (product) => {
        if (product) {
            const { title, author, desc, year, categoryId, price, image } = product;
            setFormData({ title, author, desc, year, categoryId, price, image });
            setIsFormUpdate(true);
            setIdToUpdate(product._id);
        } else {
            setFormData({
                title: '',
                author: '',
                desc: '',
                year: 0,
                categoryId: '',
                price: 0,
                image: '',
            });
        }

        setIsOpen(true);
    };

    const handleCancel = (e) => {
        e.preventDefault();

        setIsOpen(false);
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        const res = await productService.addProduct(formData, accessToken, axiosJWT);
        if (res?.status === 200) {
            toast.success('Add product successfully');
            setIsOpen(false);
        } else {
            toast.error('Something went wrong!');
        }
    };

    const handleDelete = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this product?')) {
            const res = await productService.deleteProduct(id, accessToken, axiosJWT);
            if (res?.status === 200) {
                const newProducts = products.filter((product) => product._id !== id);
                setProducts(newProducts);

                toast.success(res.data);
            } else {
                toast.error('Something went wrong!');
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const res = await productService.updateProduct(idToUpdate, formData, accessToken, axiosJWT);
        if (res?.status === 200) {
            toast.success('Update product successfully');
            setIsOpen(false);
        } else {
            toast.error('Something went wrong!');
        }
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('wrap-title')}>
                    <h1>List Products</h1>
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
                            <th>Title</th>
                            <th>Category</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product.title}</td>
                                <td>{getCategoryName(product.categoryId)}</td>
                                <td>
                                    <img className={cx('prod-image')} src={product.image} alt={product.title} />
                                </td>
                                <td>{product.price}đ</td>
                                <td>
                                    <button className={cx('update-btn')} onClick={() => openModal(product)}>
                                        Update
                                    </button>
                                    <button className={cx('delete-btn')} onClick={() => handleDelete(product._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={false} closeTimeoutMS={200}>
                <h2 className={cx('heading')}>{isFormUpdate ? 'Update Product' : 'Add Product'}</h2>
                <form>
                    <div className={cx('form-group')}>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            placeholder="Title product"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="author">Author</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            placeholder="Author product"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="desc"
                            value={formData.desc}
                            placeholder="Description product"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="category">Category</label>
                        <select name="categoryId" id="category" onChange={handleInputChange}>
                            <option value="">Select category</option>
                            {categories.map((category) => (
                                <option
                                    key={category._id}
                                    value={category._id}
                                    selected={category._id === formData.categoryId}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="year">Year</label>
                        <input
                            type="number"
                            id="year"
                            value={formData.year}
                            name="year"
                            placeholder="Year"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            placeholder="Price product"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="image">Image</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={formData.image}
                            placeholder="Link image"
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

export default Products;
