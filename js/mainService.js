angular.module('swapi')

.service('swService', function($http, $q){



    this.getAllPeople = function(nextPageUrl){
        var pageUrl = nextPageUrl || 'http://swapi.co/api/people';
        return $http({
            method: 'GET',
            url: pageUrl
        });
    };

    this.getPerson = function(id){
        return $http.get('http://swapi.co/api/people/'+id);
    }

    this.getShips = function(){
        return $http({
            method: 'GET',
            url: 'http://swapi.co/api/starships'
        });
    }


    //STEP 1: Bring $q into service (dependency injection)
    this.getPeopleWithShips = function(){
        var deferred = $q.defer(); //STEP 2

        $http.get('http://swapi.co/api/people').then(function(response){
            var people = response.data;
           
            $http.get('http://swapi.co/api/starships').then(function(response){
                var ships = response.data;
                deferred.resolve([people, ships]); //STEP 3
            });

        });

        return deferred.promise; //STEP 4

    }


});