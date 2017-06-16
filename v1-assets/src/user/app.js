/**
 * User App
 *
 * @author  :: Jeff Lee
 * @created :: 2016/01/08
 */

define([
	'angular',
	'angularLoadingBar',
	'user/Controller',
    'user/Routes',
	'user/HtmlFilter',
	'user/directives/Card',
	'user/directives/Avatar',
	'home/directives/Header'
], function (angular) {

	return angular.module('User', [
		'chieffancypants.loadingBar',
		'User.controllers',
        'User.routes',
		'User.filters',
		'User.directives',
		'Home.directives'
	]);
});