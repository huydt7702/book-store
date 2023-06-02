import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <section className={cx('footer__top')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <article className={cx('footer__top-intro', 'col-lg-5', 'col-md-4', 'col-sm-6')}>
                            <h4 className={cx('footer__top-intro-heading')}>Về chúng tôi</h4>
                            <div className={cx('footer__top-intro-content')}>
                                Edubook là cửa hàng luôn cung cấp cho các bạn tìm tòi tri thức, đam mê đọc sách trên
                                khắp cả nước.Chúng tôi sẽ liên tục cập nhật những cuốn sách hay nhất, mới nhất, chất
                                lượng nhất giúp người đọc có những cuốn sách hay nhất để đọc! <br />
                                Điện thoại: 0352 860 701 <br />
                                Email: teamed2@gmail.com <br />
                                Zalo: 039.882.3232 <br />
                            </div>
                        </article>

                        <article className={cx('footer__top-policy', 'col-lg-3', 'col-md-4', 'col-sm-6')}>
                            <h4 className={cx('footer__top-policy-heading')}>Chính sách mua hàng</h4>

                            <ul className={cx('footer__top-policy-list')}>
                                <li className={cx('footer__top-policy-item')}>
                                    <a href="/" className={cx('footer__top-policy-link')}>
                                        Hình thức đặt hàng
                                    </a>
                                </li>
                                <li className={cx('footer__top-policy-item')}>
                                    <a href="/" className={cx('footer__top-policy-link')}>
                                        Hình thức thanh toán
                                    </a>
                                </li>
                                <li className={cx('footer__top-policy-item')}>
                                    <a href="/" className={cx('footer__top-policy-link')}>
                                        Phương thức vận chuyển
                                    </a>
                                </li>
                                <li className={cx('footer__top-policy-item')}>
                                    <a href="/" className={cx('footer__top-policy-link')}>
                                        Chính sách đổi trả
                                    </a>
                                </li>
                                <li className={cx('footer__top-policy-item')}>
                                    <a href="/" className={cx('footer__top-policy-link')}>
                                        Hướng dẫn sử dụng
                                    </a>
                                </li>
                            </ul>
                        </article>

                        <article className={cx('footer__top-contact-wrap', 'col-lg-4', 'col-md-4', 'col-sm-6')}>
                            <h4 className={cx('footer__top-contact-heading')}>Hotline liên hệ</h4>

                            <div className={cx('footer__top-contact')}>
                                <div className={cx('footer__top-contact-icon')}>
                                    <img src={images.phoneTop} className={cx('footer__top-contact-img')} alt="" />
                                </div>

                                <div className={cx('footer__top-contact-phone-wrap')}>
                                    <div className={cx('footer__top-contact-phone')}>039.882.3232</div>
                                    <div className={cx('footer__top-contact-des')}>(Giải đáp thắc mắc 24/24)</div>
                                </div>
                            </div>

                            <h4 className={cx('footer__top-contact-heading')}>Kết nối với chúng tôi</h4>

                            <div className={cx('footer__top-contact-social')}>
                                <a href="/" className={cx('footer__top-contact-social-link')}>
                                    <img src={images.facebook} alt="" />
                                </a>
                                <a href="/" className={cx('footer__top-contact-social-link')}>
                                    <img src={images.youtube} alt="" />
                                </a>
                                <a href="/" className={cx('footer__top-contact-social-link')}>
                                    <img src={images.tiktok} alt="" />
                                </a>
                                <a href="/" className={cx('footer__top-contact-social-link')}>
                                    <img src={images.zalo} alt="" />
                                </a>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
            <section className={cx('footer__bottom')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <span className={cx('footer__bottom-content')}>
                            @Bản quyền thuộc về Edubook | Thiết kế bởi Nguyen Van Huy
                        </span>
                    </div>
                </div>
            </section>
        </footer>
    );
}

export default Footer;
