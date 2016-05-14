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

myApp.controller('AppCtrl1', ['$scope', '$http',
    function($scope, $http){

        var refresh = function() {
            $http.get('/categories/' + 2).success(function(response){
                console.log("I got the data I requested");
                $scope.recipelist = response;
				console.log(response);
            });
        };
		
		refresh();
		
		$scope.getdetails = function() {
			window.location = "./index2.html";
		}
		
		$scope.createnew = function() {
			window.location = "./index3.html";
		}
}]);

myApp.controller('AppCtrl2', ['$scope', '$http',
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
	
myApp.controller('AppCtrl3', ['$scope', '$http',
    function($scope, $http){
		
		var recipeID;
		var ingredientListForDisplay = [];
		var ingredientIDs = [];
		var refresh = function() {
			$scope.ingredient = "";
			console.log("categories: ");
			$http.get('/categories').success(function(response){
                console.log("I got the data I requested");
                $scope.categories = response;
				console.log(response);
            });
        };
		refresh();
		//Creates a recipe and adds the ingredient ids
		$scope.createrecipe = function() {
			$scope.recipe.ingredientIDs = ingredientIDs;
			console.log($scope.recipe);
			$http.post("/createrecipe", $scope.recipe).success(function(response) {
				console.log("Recipe initialized");
				recipeID = response;
				console.log(recipeID);
				refresh();
			});
			
		};
		
		//adds ingredients to the DB and stores the ID in array ingredientIDs
		//adds ingredients to ingredientListForDisplay to be displayed in scope
        $scope.addingredient = function() {
			ingredientListForDisplay.push($scope.ingredient);
			$scope.ingredients = ingredientListForDisplay;
            console.log($scope.ingredient);
            $http.post('/ingredientlist/', $scope.ingredient).success(function(response){
				ingredientIDs.push(response);
				refresh();
            });
        };

/*      $scope.remove = function(id) {
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
        } */
	}]);