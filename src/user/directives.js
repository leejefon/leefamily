/**
 * User Directives
 *
 * @author      :: Jeff Lee
 * @created     :: 2016/01/08
 */

define([
    'angular',
    'angularSanitize'
], function (angular) {
    return angular.module('User.directives', ['ngSanitize']);
});
