/**
 * Home Controller
 *
 * @author      :: Jeff Lee
 * @created     :: 2016/01/08
 */

define(['angular', 'algoliasearch'], function (angular) {

	return angular.module('Home.controllers', ['algoliasearch'])

		.controller('HomeController', ['$scope', '$state', '$stateParams', '$http', 'algolia', function ($scope, $state, $stateParams, $http, algolia) {

			$scope.home = function () {

			};

			$scope.init = function () {
				if ($state.current.action) {
					$scope[$state.current.action]();
				}
			};

			$scope.init();

		}]);
});
