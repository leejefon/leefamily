/**
 * Routes
 *
 * @author  :: Jeff Lee
 * @created :: 2016/01/08
 */

module.exports.routes = {

    'GET /'                    : 'HomeController.index',

    // General
    'GET /login'               : 'HomeController.index',
    'GET /logout'              : 'HomeController.index',
    'GET /reset_password'      : 'HomeController.index',
    'GET /reset_password/:key' : 'HomeController.index',

    // General API
    'POST /login'              : 'HomeController.login',
    'POST /logout'             : 'HomeController.logout',
    'POST /reset_password'     : 'HomeController.reset_password',
    'POST /reset_password/:key': 'HomeController.reset_password',

    // Admin API
    'PUT    /user'             : 'UserController.add',
    'POST   /user/:id'         : 'UserController.update',
    'POST   /user/:id/avatar'  : 'UserController.updateAvatar',
    'DELETE /user/:id'         : 'UserController.remove',

    // Admin Only
    'GET    /create'           : 'HomeController.index',
    'GET    /:name/edit'       : 'HomeController.index',

    // User API
    'GET    /users'            : 'UserController.list',
    'GET    /user/:name'       : 'UserController.getByName',

    // User
    'GET    /:name'            : 'HomeController.index'
};
