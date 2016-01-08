/**
 * Home Controller
 *
 * @author   :: Jeff Lee
 * @created  :: 2016/01/08
 */

module.exports = (function () {

    function index (req, res) {
        return res.view();
    }

    return {
        index: index
    };
})();
