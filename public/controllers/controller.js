var recipeApp = angular.module('recipeApp', [
    'ngRoute',
    'ngResource'
]);


recipeApp.controller('recipeBoxCtrl', ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http){

        var refresh = function() {
            $http.get('/categories').success(function(response){
                console.log("I got the data I requested");
                $scope.categorylist = response;
                console.log(response);
            });
        };
        
        refresh();
        
        $scope.getrecipes = function(id){
			$rootScope.categoryID = id;
			console.log($rootScope.categoryID);
            window.location = "./#/recipes";
        }
         $scope.createnew = function() {
            window.location = "./#/create";
        };
}]);

recipeApp.controller('recipesCtrl', ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http){
        $scope.loadRecipes = function() {
            $http.get('/categories/' + $rootScope.categoryID).success(function(response){
                console.log("I got the data I requested");
                $scope.recipelist = response;
                console.log(response);
            });
        };
        
        $scope.getdetails = function(id) {
			$rootScope.recipeID = id;
			console.log($rootScope.recipeID);
            window.location = "./#/recipeDetails";
        }
        $scope.createnew = function() {
            window.location = "./#/create";
        };
}]);

recipeApp.controller('recipeDetailCtrl', ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http){
        
        var ingredientIDs;
        var refresh = function() {
            $http.get("/recipeData/" + $rootScope.recipeID).success(function(response) {
                console.log("I got the data I requested");
                $scope.recipe = response;
                ingredientIDs = response.ingredientIDs;
                console.log(ingredientIDs);
				console.log(ingredientIDs.length);
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
			console.log($scope.ingredients);
        };
		refresh();
		
	  $scope.removeRecipe = function(id) {
            console.log(id);
            $http.delete('/recipe/' + id).success(function(response){
            });
        };
/*
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
*/	
}]);


recipeApp.controller('createNotecardCtrl', ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http){
		
        document.getElementById("newNoteCardButton").style.visibility = "hidden";
		var ingredientListForDisplay = [];
		var ingredientIDs = [];
		var refresh = function() {
			$scope.ingredient = "";
			console.log("categories: ");
			$http.get('/categories').success(function(response){
                //console.log("I got the data I requested");
                $scope.categories = response;
				//console.log(response);
            });
        };
		refresh();
		
		//Creates a recipe and adds the ingredient ids
		$scope.createrecipe = function() {
			console.log(ingredientIDs);
			$scope.recipe.ingredientIDs = ingredientIDs;
			console.log($scope.recipe.ingredientIDs);
			console.log($scope.recipe);
			$http.post("/createrecipe", $scope.recipe).success(function(response) {
				console.log("Recipe initialized");
				console.log(response);
				refresh();
			});
			
		};

		//adds ingredients to the DB and stores the ID in array ingredientIDs
		//adds ingredients to ingredientListForDisplay to be displayed in scope
        $scope.addingredient = function() {
			var id;
            $http.post('/ingredientlist/', $scope.ingredient).success(function(response){
				id = response.ingredientID;
				console.log(id);
				ingredientIDs.push(id);
				$scope.ingredient.ingredientID = id;
				refresh();
            });
			
			ingredientListForDisplay.push($scope.ingredient);
			$scope.ingredients = ingredientListForDisplay;
            console.log($scope.ingredient);
        };

	 //IN PROGRESS
        $scope.remove = function(id) {
            console.log(id);
            $http.delete('/ingredientlist/' + id).success(function(response){
            });
			var i = ingredientIDs.indexOf(id);
			if(i != -1) {
				ingredientIDs.splice(i, 1);
				$scope.ingredients = ingredientIDs;
			}
			refresh();
        };
/*
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
        */
}]);

recipeApp.config(function($routeProvider){
    $routeProvider
    .when('/#',{
        templateUrl: 'recipeBox.html',
        controller: 'recipeBoxCtrl'
    })
    .when('/recipes',{
        templateUrl: '/recipes.html',
        controller: 'recipesCtrl'
    })
    .when('/recipeDetails',{
        templateUrl: '/viewRecipeDetails.html',
        controller: 'recipeDetailCtrl'
    })
    .when('/create',{
        templateUrl: '/createNotecard.html',
        controller: 'createNotecardCtrl'
    })
    .otherwise({
        redirectTo: '/#'
    });
});


