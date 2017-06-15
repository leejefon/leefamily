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
    'home/Routes'
], function (angular) {

	return angular.module('Home', [
		'chieffancypants.loadingBar',
		'Home.controllers',
        'Home.routes'
	]);
});
