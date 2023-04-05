import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';
import { logOutSuccess } from '~/redux/authSlice';
import * as productService from '~/services/productService';
import styles from './Category.module.scss';

const cx = classNames.bind(styles);

function Category() {
    const [productsByCategoryId, setProductsByCategoryId] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryId = searchParams.get('id');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.login.currentUser);
    const accessToken = user?.accessToken;
    let axiosJWT = createAxios(user, dispatch, logOutSuccess);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await productService.getAllProducts(dispatch, navigate, accessToken, axiosJWT);
            const result = res.data.filter((product) => product.categoryId === categoryId);

            setProductsByCategoryId(result);
        };

        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('bestselling__heading-wrap')}>
                        <div className={cx('bestselling__heading')}>Danh sách sản phẩm theo danh mục</div>
                    </div>
                </div>

                <div className={cx('row', 'product__panel')}>
                    {productsByCategoryId.length === 0 && (
                        <p style={{ width: '100%', textAlign: 'center' }}>Hiện chưa có sản phẩm nào ở danh mục này.</p>
                    )}
                    {productsByCategoryId.map((product) => (
                        <div
                            key={product._id}
                            className={cx('product__panel-item', 'col-lg-3', 'col-md-4', 'col-sm-6')}
                        >
                            <div className={cx('product__panel-item-wrap')}>
                                <div className={cx('product__panel-img-wrap')}>
                                    <img
                                        height="100%"
                                        src={product.image}
                                        alt={product.title}
                                        className={cx('product__panel-img')}
                                    />
                                </div>
                                <h3 className={cx('product__panel-heading')}>
                                    <Link to={`/product/${product.slug}`} className={cx('product__panel-link')}>
                                        {product.title}
                                    </Link>
                                </h3>
                                <div className={cx('product__panel-price')}>
                                    <span className={cx('product__panel-price-current')}>{product.price}đ</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Category;
