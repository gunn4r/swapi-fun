angular.module('swapi', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider){

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '../views/home.html',
            controller: 'swCtrl',
            resolve: {
                frontLoadData: function(swService){
                    return swService.getAllPeople()
                        .then(function(response){
                            return response.data;
                        }, function(){
                            return 'MASSIVE ERROR';
                        });
                }
            }
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