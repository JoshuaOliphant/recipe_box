var recipeApp = angular.module('recipeApp', [
    'ngRoute',
    'ngResource'
]);

//controller for viewing a recipe box
recipeApp.controller('recipeBoxCtrl', ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http){

        $scope.loadBox = function() {
            $http.get('/categories').success(function(response){
                console.log("I got the data I requested");
                $scope.categorylist = response;
                console.log(response);
            });
        };
        
        $scope.getrecipes = function(id){
			$rootScope.categoryID = id;
			console.log($rootScope.categoryID);
            window.location = "./#/recipes";
        }
         $scope.createnew = function() {
            window.location = "./#/create";
        };
}]);

//controller for viewing recipes in a category
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

//controller for viewing a notecard
recipeApp.controller('recipeDetailCtrl', ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http){
        
        var ingredientIDs;
        $scope.loadNotecard = function() {
            $http.get("/recipeData/" + $rootScope.recipeID).success(function(response) {
                console.log("I got the data I requested");
                $scope.recipe = response;
				console.log(ingredientIDs);
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
		
	  $scope.removeRecipe = function(id) {
            console.log(id);
            $http.delete('/recipe/' + id).success(function(response){
				console.log("Deleted recipe " + response);
				window.location = "./#/recipes";
            });
			
        };

        $scope.edit = function(id) {
			$rootScope.recipeID = id;
            window.location = "./#/edit";
            }
}]);

//controller for creating a notecard 
recipeApp.controller('createNotecardCtrl', ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http){
		
        //document.getElementById("newNoteCardButton").style.visibility = "hidden";
		var ingredientIDs = [];
		$scope.loadCreate = function() {
			$scope.newingredient = "";
			console.log("categories: ");
			$http.get('/categories').success(function(response){
                $scope.categories = response;
            });
			$scope.ingredients=[];
        };
		
		//Creates a recipe and adds the ingredient ids
		$scope.createrecipe = function() {
			console.log(ingredientIDs);
			$scope.recipe.ingredientIDs = ingredientIDs;
			console.log($scope.recipe);
			$http.post("/createrecipe", $scope.recipe).success(function(response) {
				console.log("Recipe initialized");
				console.log(response);
				$rootScope.recipeID = response;
				console.log("Sending recipe id " + $rootScope.recipeID);
				window.location = "/#/recipeDetails";
			});
		};

		//adds ingredients to the DB and stores the ID in array ingredientIDs
		//adds ingredients to ingredientListForDisplay to be displayed in scope
        $scope.addingredient = function() {
			var id;
            $http.post('/ingredientlist/', $scope.newingredient).success(function(response){
				id = response;
				console.log(id);
				$scope.newingredient.ingredientID = id;
				ingredientIDs.push(id);
				$scope.ingredients.push(response);
            });
			$scope.newingredient = "";
        };

	 //IN PROGRESS
        $scope.remove = function(id) {
            console.log(id);
            $http.delete('/ingredientlist/' + id).success(function(response){
            });
			var j;
			for (var i = 0; i < ingredientIDs.length; i++)
			{
				if (ingredientIDs[i].ingredientID = id)
				{
					j = i;
					break;
				}
			}
			if(j != -1) {
				$scope.ingredients.splice(j, 1);
				ingredientIDs.splice(j, 1);
			}
        };
/*
        $scope.edit = function(id) {
            console.log(id);
            $http.get('/ingredientlist/' + id).success(function(response){
                $scope.ingredient = response;
            })
        }
        */
}]);

//controler for editing recipes 
recipeApp.controller('editRecipeCtrl', ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http){
        var ingredientIDs;
        $scope.loadEdit = function() {
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
			
			$http.get('/categories').success(function(response){
                $scope.categories = response;
            });
			console.log($scope.ingredients);
        };
        
		$scope.deleteingredient = function(id) {
			console.log(id);
			var j;
			for (var i = 0; i < ingredientIDs.length; i++)
			{
				if (ingredientIDs[i].ingredientID = id)
				{
					j = i;
					break;
				}
			}
			if(j != -1) {
				$scope.ingredients.splice(j, 1);
				ingredientIDs.splice(j, 1);
			}
			console.log($scope.ingredients);
			console.log(ingredientIDs);
		};
		
		$scope.addingredient = function() {
			var id;
            $http.post('/ingredientlist/', $scope.newingredient).success(function(response){
				id = response;
				console.log(id);
				$scope.newingredient.ingredientID = id;
				ingredientIDs.push(id);
				$scope.ingredients.push(response);
            });
			$scope.newingredient = "";
        };
		
		$scope.updaterecipe = function() {
			$scope.recipe.ingredientIDs = ingredientIDs;
			$http.post("/updaterecipe", $scope.recipe).success(function(response){
				console.log(response);
				$rootScope.recipeID = $scope.recipe.recipeID;
				window.location = "/#/recipeDetails";
			});
		};
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
	.when('/edit',{
		templateUrl: '/editRecipeDetails.html',
		controller: 'editRecipeCtrl'
	})
    .otherwise({
        redirectTo: '/#'
    });
});


