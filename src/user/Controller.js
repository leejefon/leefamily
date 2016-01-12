/**
 * User Controller
 *
 * @author  :: Jeff Lee
 * @created :: 2016/01/08
 */

define(['angular', 'user/services/User'], function (angular) {

	return angular.module('User.controllers', ['User.services'])

		.controller('UserController', ['$scope', '$state', '$stateParams', 'User', function ($scope, $state, $stateParams, User) {

			$scope.index = function () {
				User.list().then(function (response) {
					$scope.users = response.data;
				});
			};

			$scope.search = function () {
				// TODO: add search state
				User.search($scope.q).then(function (data) {
					$scope.$apply(function () {
						$scope.users = data.hits.map(function (user) {
							var temp = $.grep($scope.users, function (u) {
								return 'leefamily-' + u.id === user.objectID;
							})[0];

							return $.extend({}, temp, {
								name: user._highlightResult.name.value,
								email: user._highlightResult.email.value,
								home_phone: user._highlightResult.home_phone.value,
								mobile_phone: user._highlightResult.mobile_phone.value,
								city: user._highlightResult.city.value,
								address: user._highlightResult.address.value,
								birthday: user._highlightResult.birthday.value,
								facebook: user._highlightResult.facebook.value,
								line: user._highlightResult.line.value
							});
						});
					});
				});
			};

			$scope.init = function () {
				if ($state.current.action) {
					$scope[$state.current.action]();
				}
			};

			$scope.init();

		}]);
});
