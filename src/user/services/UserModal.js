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
                        controller: ['$scope', function ($scope) {
                            $scope.user = $stateParams;

                            $scope.close = function () {
                                $scope.$close();
                            };
                        }]
                    }).result.finally(function () {
                        $state.go("user", null, { reload: true });
                    });
                },
                create: function () {

                },
                edit: function () {

                }
            };
        }]);
});
