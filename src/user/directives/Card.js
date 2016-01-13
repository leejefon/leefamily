/**
 * Card Directive
 *
 * @author  :: Jeff Lee
 * @created :: 2016/01/08
 */

define(['user/directives'], function (UserDirectives) {

    return UserDirectives

        .directive('card', [function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    user: '='
                },
                templateUrl: '/templates/user/partials/card.html',
                controller: ['$scope', '$state', function ($scope, $state) {
                    var defaultAvatar = '/img/profile.jpg';
                    if (!$scope.user.avatar) {
                        $scope.avatar = defaultAvatar;
                    } else {
                        $scope.avatar = 'data:' + $scope.user.avatar.split('@')[0] + ';base64,' + $scope.user.avatar.split('@')[1];
                    }
                }],
                link: function (scope, elem, attrs) {

                }
            };
        }]);
});
