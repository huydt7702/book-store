import config from '~/config';

// Pages
import Home from '~/pages/client/Home';
import Auth from '~/pages/client/Auth';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.auth, component: Auth, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
