import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Home() {
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

                <section className={cx('row', 'list-bestseller')}></section>

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
