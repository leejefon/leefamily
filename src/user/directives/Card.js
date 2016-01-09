/**
 * Card Directive
 *
 * @author  :: Jeff Lee
 * @created :: 2016/01/08
 */

define(['user/directives'], function (UserDirectives) {
    'use strict';

    return UserDirectives

        .directive('card', [function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {},
                templateUrl: '/templates/user/partials/card.html',
                controller: ['$scope', function ($scope) {

                }],
                link: function (scope, elem, attrs) {

                }
            };
        }]);
});
