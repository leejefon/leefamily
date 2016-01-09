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

        .factory('User', [function () {
            return {
                list: function (cb) {
                    cb(null, [
                        { name: '李玠鋒 Jeff Lee' },
                        { name: '李宜樺 Eva Lee' },
                        { name: '李沂璉' },
                        { name: '翁慧蘭' },
                        { name: '戴路嘉 Luke Day' },
                        { name: '劉家銘' },
                        { name: 'Hello World' }
                    ]);
                },
                search: function (q, cb) {
                    index.search(q, cb);
                },
                get: function () {

                }
            };
        }]);
});