/**
 * Header Directive
 *
 * @author      :: Jeff Lee
 * @created     :: 2016/01/08
 */

define(['home/directives'], function (HomeDirectives) {
    'use strict';

    return HomeDirectives

        .directive('header', [function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/templates/home/partials/header.html',
                controller: ['$rootScope', function ($rootScope) {

                }],
                link: function (scope, elem, attrs) {

                }
            };
        }]);
});
