/**
 * HTML Filter
 *
 * @author  :: Jeff Lee
 * @created :: 2016/01/12
 */

define(['angular'], function (angular) {

    return angular.module('User.filters', [])

        .filter('stripHtmlTags', function () {
            return function (input) {
                var regex = /(<([^>]+)>)/ig;
                return input.replace(regex, "");
            };
        });
});
