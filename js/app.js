angular.module('swapi', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider){

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '../views/home.html',
            controller: 'swCtrl'
        })
        .state('about', {
            url: '/about',
            templateUrl: '../views/about.html',
            controller: 'swCtrl'
        })
        .state('person', {
            url: '/person/:id',
            templateUrl: '../views/personDetail.html',
            controller: 'swCtrl'
        });

    $urlRouterProvider.otherwise('/');

});