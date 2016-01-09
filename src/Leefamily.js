/**
 * Leefamily Home
 *
 * @author      :: Jeff Lee
 * @created     :: 2016/01/08
 */

require.config({
    paths: {
        jquery: '../assets/vendor/jquery/dist/jquery',
        toastr: '../assets/vendor/toastr/toastr',

        angular: '../assets/vendor/angular/angular',
        angularUIRouter: '../assets/vendor/angular-ui-router/release/angular-ui-router.min',
        angularUIBootstrap: '../assets/vendor/angular-bootstrap/ui-bootstrap.min',
        angularLoadingBar: '../assets/vendor/angular-loading-bar/build/loading-bar',
        algoliasearch: 'https://cdn.jsdelivr.net/algoliasearch/3/algoliasearch.angular.min'
    },
    shim: {
        jquery: { exports: '$' },
        toastr: ['jquery'],

        angular: { exports: 'angular', deps: ['jquery'] },
        angularUIRouter: ['angular'],
        angularLoadingBar: ['angular'],
        algoliasearch: ['angular']
    },
    priority: ['jquery', 'angular']
});

require([
    'angular',
    'toastr',
    'home/app',
    'user/app'
], function (angular, toastr, homeApp, userApp) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, [
            homeApp.name,
            userApp.name
        ]);
    });

    toastr.options.positionClass = 'toast-bottom-right';
});
