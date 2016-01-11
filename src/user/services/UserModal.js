/**
 * User Modal Service
 *
 * @author  :: Jeff Lee
 * @created :: 2016/01/09
 */

define(['user/services', 'user/services/User', 'bootstrapDatetimePicker'], function (UserServices) {

    return UserServices

        .service('UserModal', ['$uibModal', '$timeout', '$location', function ($modal, $timeout, $location) {
            return {
                create: function ($state) {
                    var modalInstance = $modal.open({
                        size: 'lg',
                        templateUrl: "/templates/user/partials/user-create.html",
                        controller: ['$scope', 'User', function ($scope, User) {
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
                                User.create($scope.newUser).then(function (response) {
                                    $scope.close();
                                    toastr.success(response.data.name + ' is added successfully!');
                                }, function (response) {
                                    toastr.error('Something went wrong');
                                });
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
                            }).on("dp.change", function() {
                                // HACK: datetime input isn't binded to ng-model
                                $("#birthdayInput input").change();
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
                            User.getByName($stateParams.name).then(function (response) {
                                $scope.user = response.data;
                            });

                            $scope.save = function () {
                                User.edit($scope.user.id, $scope.user).then(function (response) {
                                    $scope.close();
                                    toastr.success($scope.user.name + ' is updated successfully!');
                                }, function (response) {
                                    toastr.error('Something went wrong');
                                });
                            };

                            $scope.close = function () {
                                $scope.$close();
                            };
                        }]
                    });

                    modalInstance.opened.then(function () {
                        // TODO: need to find a bettery way to resolve dom ready
                        $timeout(function () {
                            $('#birthdayInput').datetimepicker({
                                allowInputToggle: true,
                                format: 'YYYY/MM/DD',
                                viewMode: 'decades'
                            }).on("dp.change", function() {
                                // HACK: datetime input isn't binded to ng-model
                                $("#birthdayInput input").change();
                            });
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
                        controller: ['$scope', 'User', function ($scope, User) {
                            User.getByName($stateParams.name).then(function (response) {
                                if (!response.data) {
                                    toastr.error('User ' + $stateParams.name + ' is not found');
                                    $scope.$close();
                                }
                                $scope.user = response.data;
                            });

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
