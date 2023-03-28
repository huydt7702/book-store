import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import * as productService from '~/services/productService';
import styles from './Category.module.scss';

const cx = classNames.bind(styles);

function Category() {
    const [productsByCategoryId, setProductsByCategoryId] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryId = searchParams.get('id');

    useEffect(() => {
        const fetchApi = async () => {
            // setLoading(true);
            const allProducts = await productService.getAllProducts();
            const result = allProducts.filter((product) => product.categoryId === categoryId);

            setProductsByCategoryId(result);
            // setLoading(false);
        };

        fetchApi();
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
                                    <a href="/" className={cx('product__panel-link')}>
                                        {product.title}
                                    </a>
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
