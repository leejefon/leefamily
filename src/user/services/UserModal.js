/**
 * User Modal Service
 *
 * @author  :: Jeff Lee
 * @created :: 2016/01/09
 */

define(['user/services', 'bootstrapDatetimePicker'], function (UserServices) {

    return UserServices

        .service('UserModal', ['$uibModal', '$timeout', '$location', function ($modal, $timeout, $location) {
            return {
                create: function ($state) {
                    var modalInstance = $modal.open({
                        size: 'lg',
                        templateUrl: "/templates/user/partials/user-create.html",
                        controller: ['$scope', function ($scope) {
                            $scope.newUser = {
                                name: '',
                                email: '',
                                home_phone: '',
                                mobile_phone: '',
                                city: '',
                                address: '',
                                birthday: '',
                                password: '',
                                line: '',
                                facebook: ''
                            };

                            $scope.save = function () {

                            };

                            $scope.close = function () {
                                $scope.$close();
                            };
                        }]
                    })

                    modalInstance.opened.then(function () {
                        $('nav li.active').removeClass('active');
                        $('nav a[href^="' + $location.url() + '"]').parent('li').addClass('active');

                        // TODO: need to find a bettery way to resolve dom ready
                        $timeout(function () {
                            $('#birthdayInput').datetimepicker({
                                allowInputToggle: true,
                                format: 'YYYY/MM/DD',
                                viewMode: 'decades'
                            });
                        }, 1000);
                    });

                    modalInstance.result.finally(function () {
                        $state.go("user", null, { reload: true });
                    });
                },
                edit: function ($state, $stateParams) {
                    var modalInstance = $modal.open({
                        size: 'lg',
                        templateUrl: "/templates/user/partials/user-edit.html",
                        controller: ['$scope', 'User', function ($scope, User) {
                            $scope.user = $stateParams;
                            // User.getByName($stateParams.name).then(function (user) {
                            //     $scope.user = user;
                            // });

                            $scope.save = function () {

                            };

                            $scope.close = function () {
                                $scope.$close();
                            };
                        }]
                    });

                    modalInstance.opened.then(function () {
                        // TODO: need to find a bettery way to resolve dom ready
                        $timeout(function () {
                            $('#birthdayInput').datetimepicker();
                        }, 1000);
                    });

                    modalInstance.result.finally(function () {
                        $state.go("user", null, { reload: true });
                    });
                },
                view: function ($state, $stateParams) {
                    var modalInstance = $modal.open({
                        size: 'lg',
                        templateUrl: "/templates/user/partials/user.html",
                        controller: ['$scope', function ($scope) {
                            $scope.user = $stateParams;
                            // User.getByName($stateParams.name).then(function (user) {
                            //     $scope.user = user;
                            // });

                            $scope.close = function () {
                                $scope.$close();
                            };
                        }]
                    })

                    modalInstance.result.finally(function () {
                        $state.go("user", null, { reload: true });
                    });
                }
            };
        }]);
});
