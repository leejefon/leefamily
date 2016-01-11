
module.exports.routes = {

    'GET /'                    : 'HomeController.index',

    // General
    'GET /login'               : 'HomeController.index',
    'GET /reset_password'      : 'HomeController.index',
    'GET /reset_password/:key' : 'HomeController.index',

    // General API
    'POST /login'              : 'HomeController.login',
    'GET  /logout'             : 'HomeController.logout',
    'POST /reset_password'     : 'HomeController.reset_password',
    'POST /reset_password/:key': 'HomeController.reset_password',

    // Admin Only
    'GET    /create'    : 'HomeController.index',
    'GET    /:name/edit': 'HomeController.index',

    // Admin API
    'PUT    /user'      : 'UserController.add',
    'POST   /user/:id'  : 'UserController.update',
    'DELETE /user/:id'  : 'UserController.remove',

    // User
    'GET /:name'        : 'HomeController.index',

    // User API
    'GET  /user/:name'  : 'UserController.get',
};
