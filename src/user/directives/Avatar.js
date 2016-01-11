/**
 * Avatar Directive
 *
 * @author  :: Jeff Lee
 * @created :: 2016/01/11
 */

define(['user/directives'], function (UserDirectives) {

    return UserDirectives

        .directive('avatar', [function () {
            return {
                restrict: 'E',
                replace: true,
                scope: true,
                templateUrl: '/templates/user/partials/avatar.html',
                controller: ['$scope', '$stateParams', 'User', function ($scope, $stateParams, User) {
                    User.getByName($stateParams.name).then(function (response) {
                        $scope.user = response.data;

                        var defaultAvatar = '/img/profile.jpg';
                        if (!$scope.user || !$scope.user.avatar) {
                            $scope.avatar = defaultAvatar;
                        } else {
                            $scope.avatar = 'data:' + $scope.user.avatar.split('@')[0] + ';base64,' + $scope.user.avatar.split('@')[1];
                        }
                    });

                    $scope.updateAvatar = function () {
                        var formData = new FormData();
                        formData.append('avatar', $('#newAvatar')[0].files[0]);

                        // TODO: change to use $http
                        $.ajax({
                            url: '/user/' + $scope.user.id + '/avatar',
                            method: 'POST',
                            data: formData,
                            cache: false,
                            contentType: false,
                            processData: false,
                            success: function (response) {
                                var src = 'data:' + response.type + ';base64,' + response.avatar;
                                $('#avatar').attr("src", src);
                                $('#newAvatar').val('');
                            }
                        });
                    };
                }],
                link: function (scope, elem, attrs) {

                }
            };
        }]);
});
