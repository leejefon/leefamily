/**
 * User Service
 *
 * @author   :: Jeff Lee
 * @created  :: 2016/01/08
 */

var algoliasearch = require('algoliasearch');
var client = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_ADMIN_API_KEY);

module.exports = (function () {

    var index = client.initIndex('leefamily');

    function save (cb) {

    }

    function update () {

    }

    function _saveToAlgolia () {

    }

    function _updateToAlgolia () {

    }

    return {
        save: save,
        update: update
    };
})();
