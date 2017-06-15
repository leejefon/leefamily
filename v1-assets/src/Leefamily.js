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
        bootstrapDatetimePicker: '../assets/vendor/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min',
        moment: '../assets/vendor/moment/min/moment.min',
        bootstrap: '../assets/vendor/bootstrap/dist/js/bootstrap.min',

        angular: '../assets/vendor/angular/angular',
        angularCookies: '../assets/vendor/angular-cookies/angular-cookies.min',
        angularSanitize: '../assets/vendor/angular-sanitize/angular-sanitize.min',
        angularUIRouter: '../assets/vendor/angular-ui-router/release/angular-ui-router.min',
        angularUIBootstrap: '../assets/vendor/angular-bootstrap/ui-bootstrap-tpls.min',
        angularLoadingBar: '../assets/vendor/angular-loading-bar/build/loading-bar',
        algoliasearch: '../assets/vendor/algoliasearch/algoliasearch.min'
    },
    shim: {
        jquery: { exports: '$' },
        toastr: ['jquery'],
        bootstrapDatetimePicker: ['jquery', 'moment', 'bootstrap'],

        angular: { exports: 'angular', deps: ['jquery'] },
        angularCookies: ['angular'],
        angularSanitize: ['angular'],
        angularUIRouter: ['angular'],
        angularLoadingBar: ['angular'],
        algoliasearch: { exports: 'algoliasearch' }
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
