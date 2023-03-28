import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import images from '~/assets/images';
import * as productService from '~/services/productService';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            // setLoading(true);
            const result = await productService.getAllProducts();

            setProducts(result);
            // setLoading(false);
        };

        fetchApi();
    }, []);

    return (
        <section className={cx('bestselling')}>
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('bestselling__heading-wrap')}>
                        <img
                            src={images.logoBestSeller}
                            alt="Sản phẩm bán chạy"
                            className={cx('bestselling__heading-img')}
                        />
                        <div className={cx('bestselling__heading')}>Top bán chạy nhất tuần</div>
                    </div>
                </div>

                <div className={cx('row', 'product__panel')}>
                    {products.map((product) => (
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

                <div className={cx('row', 'bestselling__banner')}>
                    <div className={cx('bestselling__banner-left', 'col-lg-6')}>
                        <img
                            src={images.banner1}
                            alt="Banner quảng cáo"
                            className={cx('bestselling__banner-left-img')}
                        />
                    </div>
                    <div className={cx('bestselling__banner-right', 'col-lg-6')}>
                        <img
                            src={images.banner2}
                            alt="Banner quảng cáo"
                            className={cx('bestselling__banner-right-img')}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;
