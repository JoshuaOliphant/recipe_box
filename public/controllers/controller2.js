var myApp2 = angular.module('myApp2', []);
myApp2.controller('AppCtrl2', ['$scope', '$http',
    function($scope, $http){
		
		var ingredientIDs;
        var refresh = function() {
			$http.get("/recipeData/" + 3).success(function(response) {
				console.log("I got the data I requested");
				$scope.recipe = response;
				ingredientIDs = response.ingredientIDs;
				
				$scope.ingredients = [];
				for (var i = 0; i < ingredientIDs.length; i++)
				{
					var id = ingredientIDs[i].ingredientID;
					console.log(id);
					$http.get("/ingredientlist/" + id).success(function(response) {
						console.log(response);
						$scope.ingredients.push(response);
					});
				}
			});
        };
		
        refresh();

        $scope.addingredient = function() {
			console.log("I made it to the controller");
            console.log($scope.ingredient);
            $http.post('/ingredientlist', $scope.ingredient).success(function(response){
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
