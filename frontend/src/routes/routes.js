import config from '~/config';

// Layouts
import AdminDashboard from '~/layouts/AdminDashboard';
import { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/pages/client/Home';
import Auth from '~/pages/client/Auth';
import Category from '~/pages/client/Category';
import Users from '~/pages/admin/Users';
import Products from '~/pages/admin/Products';
import Categories from '~/pages/admin/Categories';
import ProductDetail from '~/pages/client/ProductDetail';
import Comments from '~/pages/admin/Comments/Comments';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.category, component: Category },
    { path: config.routes.users, component: Users, layout: AdminDashboard },
    { path: config.routes.products, component: Products, layout: AdminDashboard },
    { path: config.routes.categories, component: Categories, layout: AdminDashboard },
    { path: config.routes.comments, component: Comments, layout: AdminDashboard },
    { path: config.routes.product, component: ProductDetail, layout: HeaderOnly },
    { path: config.routes.auth, component: Auth, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
