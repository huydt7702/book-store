import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import styles from './ProductDetail.module.scss';

const cx = classNames.bind(styles);

function ProductDetail() {
    const location = useLocation();
    const str = location.pathname;
    const result = str.split('/').pop();
    console.log(result);

    return <div className={cx('wrapper')}>Product Detail</div>;
}

export default ProductDetail;
