var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http',
    function($scope, $http){
		
		/*currently this is ONLY dealing with adding ingredients;
		no recipe name, no image, no concept of multiple recipes*/
        var refresh = function() {
            $http.get('/ingredientlist').success(function(response){
                console.log("I got the data I requested");
                $scope.ingredientlist = response;
                $scope.ingredient = "";

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
		
		/*
		$scope.selectCategory = function(id)
		{
			
		}
		
		$scope.selectRecipe = function(id)
		{
			console.log("Getting recipe " + id);
			$http.get("/recipeData/" + $scope.recipe._id))
		}
		
		$scope.addRecipe = function(id)
		{
			
		}
    }]);*/
