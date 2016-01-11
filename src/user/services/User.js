/**
 * User Service
 *
 * @author  :: Jeff Lee
 * @created :: 2016/01/08
 */

define(['user/services', 'algoliasearch'], function (UserServices, algoliasearch) {

    var client = algoliasearch('CDX0AX1KAW', '7599d91d17cd9b319bd39cedb2f19740');
    var index = client.initIndex('leefamily');

    return UserServices

        .factory('User', ['$http', function ($http) {
            return {
                list: function () {
                    return $http.get('/users');
                },
                getByName: function (name) {
                    return $http.get('/user/' + name);
                },
                search: function (q) {
                    return index.search(q);
                },
                create: function (newUser) {
                    return $http.put('/user', newUser);
                },
                edit: function (id, newData) {
                    return $http.post('/user/' + id, newData);
                },
                remove: function (id) {
                    return $http.delete('/user/' + id);
                }
            };
        }]);
});
