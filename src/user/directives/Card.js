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
                    $scope.showProfile = function (name) {
                        $state.go('user.view', { name: name });
                    };
                }],
                link: function (scope, elem, attrs) {

                }
            };
        }]);
});
