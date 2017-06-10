'use strict';

antloans.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        /*$urlRouterProvider.when('', '/reset');
        $urlRouterProvider.when('/', '/reset');*/

        $urlRouterProvider.otherwise('/home/job-list');

/*        // disable the router
        $urlRouterProvider.deferIntercept(true);*/

        $stateProvider
            .state('reset', {
                url:'/reset',
                templateUrl: 'views/loan-reset-pw.html',
                controller:'ResetPassCtrl'
            })
            .state('login', {
                url:'/login',
                templateUrl: 'views/login.html',
                controller:'LoginCtrl',
                controllerAs: 'ctrl'
            })
            .state('home',{
                abstract:true,
                templateUrl:'views/home.html'
            })
            .state('home.job-list',{
                url:'/home/job-list',
                templateUrl:'views/loan-job-list.html',
                controller:'JobListCtrl'
            })
            .state('home.document',{
                url:'/home/document',
                templateUrl:'views/loan-document.html'
            })
            .state('home.user-list',{
                url:'/home/user-list',
                templateUrl:'views/user-list.html'
            })
            .state('home.report',{
                url:'/home/report',
                templateUrl:'views/report-analytics.html'
            })
            .state('home.conditional-approval',{
                url:'/home/job-list/conditional-approval/:approvalId',
                templateUrl:'views/conditional-approval.html'
            })
            .state('404', {
                templateUrl: '/404.html',
                url:'/404'
            })
    }]);