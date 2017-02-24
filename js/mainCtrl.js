angular.module('swapi')

.controller('swCtrl', function($scope, swService, $stateParams, frontLoadData){
    
    //Init the pagination url variable.
    var nextPageUrl = null;
    $scope.loading = false;

    //Get data from the route resolve "frontLoadData".
    $scope.people = frontLoadData.results;
    nextPageUrl = frontLoadData.next;

    //Get next page of 10 results
    $scope.getNext = function(){
        $scope.loading = true;
        //Grab all people. If a nextPageUrl is provided then grab the next page of results.
        swService.getAllPeople(nextPageUrl)
            .then(function(response){ 
                response.data.results.forEach(function(item){
                    $scope.people.push(item);
                });
                nextPageUrl = response.data.next;
                $scope.loading = false;
            });
    };

    swService.getPeopleWithShips().then(function(response){
    });

    if($stateParams.id){
        $scope.loading = true;
        swService.getPerson($stateParams.id)
            .then(function(response){
                $scope.person = response.data;
                $scope.loading = false;
            });
    }

    $scope.getPersonId = function(index){
        var personUrl = $scope.people[index].url;
        var personId = personUrl.substring(personUrl.indexOf('people/')+7, personUrl.length-1);
        return personId;
    }





});