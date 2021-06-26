const routes = require('next-routes')();

routes
    .add('/new', '/new')
    .add('/list', '/list')
    .add('/participate', '/participate')
    .add('/verify', '/verify')
    .add('/setwinner', '/setwinner')
    .add('/show/:address', '/show');

/*
routes
    .add('/campaigns/new', '/campaigns/new')
    .add('/campaigns/:address', '/campaigns/show')
    .add('/campaigns/:address/requests', '/campaigns/requests/index')
    .add('/campaigns/:address/requests/new', '/campaigns/requests/new');
*/

module.exports = routes;

/**
 * Wildcard in a route starts with :
 * Whenever you add a new route, you need to restart the server
 */
