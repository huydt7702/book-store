import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

import * as productService from '~/services/productService';
import * as categoryService from '~/services/categoryService';
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
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        desc: '',
        year: 0,
        categoryId: '',
        price: '',
        image: '',
    });

    useEffect(() => {
        const fetchApi = async () => {
            const result = await productService.getAllProducts();
            setProducts(result);
        };

        fetchApi();
    }, [modalIsOpen]);

    useEffect(() => {
        (async () => {
            const listCategories = await categoryService.getAllCategories();
            setCategories(listCategories);
        })();
    }, []);

    const getCategoryName = (categoryId) => {
        const category = categories.find((cate) => cate._id === categoryId);
        return category?.name;
    };

    const handleInputChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        const res = await productService.addProduct(formData);
        if (res.status === 200) {
            toast.success('Add product successfully');
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
                    <button onClick={openModal}>Add</button>
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
                                    <button className={cx('update-btn')}>Update</button>{' '}
                                    <button className={cx('delete-btn')}>Delete</button>{' '}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={false} contentLabel="Add Products">
                <h2 className={cx('heading')}>Add Products</h2>
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
                                <option key={category._id} value={category._id}>
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
                            type="text"
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
                        <button className={cx('add-btn')} onClick={handleAdd}>
                            Add
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default Products;
