'use strict';

/**
 * @ngdoc overview
 * @name antloansFrontEndApp
 * @description
 * # antloansFrontEndApp
 *
 * Main module of the application.
 */
var antloans = angular
    .module('antloansFrontEndApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'ui.date',
        'ui.select',
        'ui.slider',
        'LocalStorageModule'
    ])
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.when('', '/reset');
            $urlRouterProvider.when('/', '/reset');
            $urlRouterProvider.otherwise('/reset');

            $stateProvider
                .state('404', {
                    url: '/404',
                    templateUrl: '/404.html'
                })
                .state('reset', {
                    url: '/reset',
                    templateUrl: 'views/loan-reset-pw.html'
                    // controller:''
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'views/login.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'ctrl'
                    // controller:''
                })
                .state('forget-pw', {
                    url: '/forget-pw',
                    templateUrl: 'views/loan-pw.html'
                    // controller:''
                })
                // ==========side bar list ================
                .state('job-list', {
                    url: '/job-list',
                    templateUrl: 'views/loan-job-list.html',
                    controller: 'JobListCtrl'
                    // controller:''
                })
                .state('approval', {
                    url: '/job-list/approval/:approvalId',
                    templateUrl: 'views/conditional-approval.html'
                    // controller:''
                })

                .state('documents', {
                    url: '/documents',
                    templateUrl: 'views/loan-document.html'
                    // controller:''
                })

                .state('users', {
                    url: '/users',
                    templateUrl: 'views/user-list.html'
                    // controller:''
                })
                .state('user-profile', {
                    url: '/user-profile',
                    templateUrl: 'views/loan-user-profile.html'
                    // controller:''
                })
                .state('create', {
                    url: '/users/new',
                    templateUrl: 'views/create-form.html'
                    // controller:''
                })

                .state('reports', {
                    url: '/reports',
                    templateUrl: 'views/report-analytics.html'
                    // controller:''
                })

                .state('settle', {
                    url: '/settle',
                    templateUrl: 'views/settled-list.html'
                    // controller:''
                })
        }]);
