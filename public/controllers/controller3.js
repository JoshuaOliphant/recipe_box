var myApp3 = angular.module('myApp3', []);
myApp3.controller('AppCtrl3', ['$scope', '$http',
    function($scope, $http){
		
		var recipeID;
		var ingredientIDs;
		var refresh = function() {
			$scope.ingredient = "";
        };
		
		$scope.createrecipe = function() {
			console.log($scope.recipe);
			$http.post("/createrecipe", $scope.recipe).success(function(response) {
				console.log("Recipe initialized");
				recipeID = response;
				console.log(recipeID);
				refresh();
			});
		};
		
        $scope.addingredient = function() {
            console.log($scope.ingredient);
			console.log(recipeID);
            $http.post('/ingredientlist/' + recipeID, $scope.ingredient).success(function(response){
                console.log(response);
				refresh();
            });
			
        };

        $scope.remove = function(id) {
            console.log(id);
            $http.delete('/ingredientlist/' + id).success(function(response){
                refresh();
            });
        };

        $scope.edit = function(id) {
            console.log(id);
            $http.get('/ingredientlist/' + id).success(function(response){
                $scope.ingredient = response;
            })
        }

        $scope.update = function() {
            console.log($scope.ingredient._id);
            $http.put('/ingredientlist/' + $scope.ingredient._id, $scope.ingredient).success(function(response){
                refresh();
            })
        }

        $scope.deselect = function() {
            $scope.ingredient = "";
        }
	}]);
