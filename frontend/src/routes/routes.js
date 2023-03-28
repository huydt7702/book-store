import config from '~/config';

// Pages
import Home from '~/pages/client/Home';
import Auth from '~/pages/client/Auth';
import Category from '~/pages/client/Category';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.category, component: Category },
    { path: config.routes.auth, component: Auth, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
