import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';

function HeaderOnly({ children }) {
    return (
        <div className="wrapper">
            <Header />
            <div className="container">{children}</div>
            <Footer />
        </div>
    );
}

export default HeaderOnly;
