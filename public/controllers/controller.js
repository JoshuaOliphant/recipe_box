var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http',
    function($scope, $http){

        var refresh = function() {
            $http.get('/categories').success(function(response){
                console.log("I got the data I requested");
                $scope.categorylist = response;
				console.log(response);
            });
        };
		
		refresh();
		
		$scope.getrecipes = function(){
			window.location = "/index1.html";
		}
}]);