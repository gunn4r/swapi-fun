angular.module('swapi', [])

.controller('swCtrl', function($scope, swService){
    
    //Init the pagination url variable.
    var nextPageUrl = null;

    //Init the data to get the first 10 people and add them to $scope.people.
    var thisIsAPromise = swService.getAllPeople();        
        thisIsAPromise.then(function(response){
            $scope.people = response.data.results;
            nextPageUrl = response.data.next;
        });

    //Get next page of 10 results
    $scope.getNext = function(){
        //Grab all people. If a nextPageUrl is provided then grab the next page of results.
        swService.getAllPeople(nextPageUrl)
            .then(function(response){ 
                response.data.results.forEach(function(item){
                    $scope.people.push(item);
                });
                nextPageUrl = response.data.next;
            });
    };

    swService.getPeopleWithShips().then(function(response){
        console.log(response)
    });

})





.service('swService', function($http, $q){



    this.getAllPeople = function(nextPageUrl){
        var pageUrl = nextPageUrl || 'http://swapi.co/api/people';
        return $http({
            method: 'GET',
            url: pageUrl
        });
    };

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