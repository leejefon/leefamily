
module.exports.routes = {

    'GET /'                    : 'HomeController.index',

    'GET /login'               : 'HomeController.index',
    'GET /reset_password'      : 'HomeController.index',
    'GET /reset_password/:key' : 'HomeController.index',

    'POST /login'              : 'HomeController.login',
    'GET  /logout'             : 'HomeController.logout',
    'POST /reset_password'     : 'HomeController.reset_password',
    'POST /reset_password/:key': 'HomeController.reset_password',

    // Admin Only
    'PUT    /user'    : 'UserController.add',
    'POST   /user/:id': 'UserController.update',
    'DELETE /user/:id': 'UserController.remove',

    'GET /:name'      : 'HomeController.index'
};
