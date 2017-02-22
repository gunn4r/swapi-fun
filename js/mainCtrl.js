angular.module('swapi')

.controller('swCtrl', function($scope, swService, $stateParams){
    
    //Init the pagination url variable.
    var nextPageUrl = null;
    $scope.loading = true;

    //Init the data to get the first 10 people and add them to $scope.people.
    swService.getAllPeople()
        .then(function(response){
            $scope.people = response.data.results;
            nextPageUrl = response.data.next;
            $scope.loading = false;
        });

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