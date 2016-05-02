var myApp1 = angular.module('myApp1', []);
myApp1.controller('AppCtrl1', ['$scope', '$http',
    function($scope, $http){

        var refreshNotecard = function() {
            $http.get('/recipes').success(function(response){
                console.log("I got the data I requested");
                $scope.recipelist = response;
				console.log(response);
            });
        };
		
		refreshNotecard();
		
		$scope.getdetails = function() {
			window.location = "./index2.html";
		}
		
		$scope.createnew = function() {
			window.location = "./index3.html";
		}
}]);