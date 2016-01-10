/**
 * User Modal Service
 *
 * @author  :: Jeff Lee
 * @created :: 2016/01/09
 */

define(['user/services'], function (UserServices) {

    return UserServices

        .service('UserModal', ['$uibModal', function ($modal) {
            return {
                view: function ($stateParams, $state) {
                    $modal.open({
                        templateUrl: "/templates/user/partials/user.html",
                        resolve: {},
                        controller: ['$scope', '$state', function ($scope, $state) {
                            // $scope.state = $state.current;
                            $scope.user = $stateParams;

                            $scope.close = function () {
                                $scope.$close();
                            };
                        }]
                    }).result.finally(function () {
                      return $state.transitionTo("user");
                    });
                },
                create: function () {

                },
                edit: function () {

                }
            };
        }]);
});
