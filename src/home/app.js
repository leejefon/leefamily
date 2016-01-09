/**
 * Home App
 *
 * @author      :: Jeff Lee
 * @created     :: 2016/01/08
 */

define([
	'angular',
	'angularLoadingBar',
	'home/Controller',
    'home/Routes',
	'home/directives/Header',
	'user/directives/Card'
], function (angular) {

	return angular.module('Home', [
		'chieffancypants.loadingBar',
		'Home.controllers',
        'Home.routes',
		'Home.directives',
		'User.directives'
	]);
});
