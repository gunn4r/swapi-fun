angular.module('swapi', [])

.controller('swCtrl', function($scope, swService){
    
    //Init the pagination url variable.
    var nextPageUrl = null;

    //Init the data to get the first 10 people and add them to $scope.people.
    swService.getAllPeople()
        .then(function(response){
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

})

.service('swService', function($http){

    this.getAllPeople = function(nextPageUrl){
        var pageUrl = nextPageUrl || 'http://swapi.co/api/people';
        return $http({
            method: 'GET',
            url: pageUrl
        });
    };

});