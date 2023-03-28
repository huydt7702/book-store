import config from '~/config';

// Layouts
import AdminDashboard from '~/layouts/AdminDashboard';

// Pages
import Home from '~/pages/client/Home';
import Auth from '~/pages/client/Auth';
import Category from '~/pages/client/Category';
import Users from '~/pages/admin/Users';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.category, component: Category },
    { path: config.routes.users, component: Users, layout: AdminDashboard },
    { path: config.routes.auth, component: Auth, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
