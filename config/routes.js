
module.exports.routes = {

    'GET /'             : 'HomeController.index',

    'GET /login'              : 'HomeController.index',
    'GET /reset_password'     : 'HomeController.index',
    'GET /reset_password/:key': 'HomeController.index',

    'POST /user/login'              : 'UserController.login',
    'GET  /user/logout'             : 'UserController.logout',
    'POST /user/reset_password'     : 'UserController.reset_password',
    'POST /user/reset_password/:key': 'UserController.reset_password',

    // Admin Only
    'PUT    /user'              : 'UserController.add',
    'POST   /user/:id'          : 'UserController.update',
    'DELETE /user/:id'          : 'UserController.remove',

    'GET /:user_or_organization': 'HomeController.index',
};
