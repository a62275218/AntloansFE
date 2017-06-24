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
        'xeditable',
        'naif.base64',
        'ui.tinymce'
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
                    templateUrl: 'views/settled-list.html',
                    controller:'settleListCtrl'
                })
                .state('user-detail',{
                    url: '/user-detail/:userId',
                    templateUrl: 'views/user-detail.html',
                    controller:'userDetailCtrl'
                })
        }])
.run(['$rootScope', '$state', '$urlRouter', 'principal','editableOptions',
    function($rootScope, $state, $urlRouter, principal,editableOptions){
        editableOptions.theme = 'bs3';
        $rootScope.default_img_url = "data:image/jpeg;base64,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";
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
