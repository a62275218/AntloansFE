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
        'LocalStorageModule',
        'chart.js',
        'angularFileUpload',
        'ngDragDrop',
        'xeditable'
    ])
    .config(['$stateProvider', '$urlRouterProvider','ChartJsProvider',
        function ($stateProvider, $urlRouterProvider,ChartJsProvider) {
            ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
            $urlRouterProvider.when('', 'login');
            $urlRouterProvider.when('/', '/login');
            $urlRouterProvider.otherwise('/404');
            /*$locationProvider.html5Mode(true);*/

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
                })
                .state('forget-pw', {
                    url: '/forget-pw',
                    templateUrl: 'views/loan-pw.html',
                    controller:'forgotPassCtrl',
                    controllerAs:'ctrl'
                })
                // ==========side bar list ================
                .state('job-list', {
                    url: '/jobs',
                    templateUrl: 'views/loan-job-list.html',
                    controller: 'JobListCtrl',
                    controllerAs:'ctrl',
                    cache:false,
                    resolve:{
                        response:function(UserService){
                            return UserService.getCurrentUser();
                        }
                    }
                })
                .state('approval', {
                    url: '/jobs/approval/:jobId',
                    templateUrl: 'views/conditional-approval.html',
                    controller:'approvalCtrl'
                })

                .state('documents', {
                    url: '/documents',
                    templateUrl: 'views/loan-document.html',
                    controller:'documentCtrl'
                })

                .state('users', {
                    url: '/users',
                    templateUrl: 'views/user-list.html',
                    controller:'UserListCtrl'
                })
                .state('create-user', {
                    url: '/users/new',
                    templateUrl: 'views/create-user-form.html'
                    // controller:''
                })
                .state('user-profile', {
                    url: '/user-profile',
                    templateUrl: 'views/loan-user-profile.html',
                    controller:'userProfileCtrl',
                    cache:false,
                    resolve:{
                        response:function(UserService){
                            return UserService.getCurrentUser();
                        }
                    }
                })
                .state('create-job', {
                    url: '/jobs/new',
                    templateUrl: 'views/create-job-form.html',
                    controller:'createJob',
                    controllerAs:'ctrl'
                })
                .state('create-document',{
                    url: '/document/new',
                    templateUrl: 'views/create-document.html',
                    controller:'createDocument',
                    controllerAs:'ctrl'
                })

                .state('reports', {
                    url: '/reports',
                    templateUrl: 'views/report-analytics.html',
                    controller:'reportCtrl'
                })

                .state('settle', {
                    url: '/settle',
                    templateUrl: 'views/settled-list.html'
                    // controller:''
                })
                .state('user-detail',{
                    url: '/settle',
                    templateUrl: 'views/settled-list.html'
                    // controller:''
                })
        }])
.run(['$rootScope', '$state', '$urlRouter', 'principal','editableOptions',
    function($rootScope, $state, $urlRouter, principal,editableOptions){
        editableOptions.theme = 'bs3';
        $rootScope.$on('$locationChangeSuccess', function (e, newUrl) {
            if (principal.isIdentityResolved()) return;

            // this event listen will go before the ui router,
            // so just prevent it spread.
            e.preventDefault();

            principal.identity()
                .then(function () {
                    console.log('Identity resolved.');
                    $urlRouter.sync(); // do an update
                });
        });
        /*$rootScope.on('$stateChangeStart',function(){

        });*/

    }]);
