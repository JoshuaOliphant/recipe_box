var recipeApp = angular.module('recipeApp', [
    'ngRoute',
    'ngResource',
]);


//controller for viewing a recipe box
recipeApp.controller('recipeBoxCtrl', ['$scope', '$route', '$http',
    function($scope, $route, $http){
		//ng-init, loads categories and users for dropdown
        $scope.loadBox = function() {
            $http.get('/categories').success(function(response){
                console.log("I got the data I requested");
                $scope.categorylist = response;
                console.log(response);
            });
			
			$http.get('/users').success(function(response){
                console.log("I got the data I requested");
                $scope.users = response;
                console.log(response);
            });
        };

		//stores the category ID in rootScope and redirects recipe list view
        $scope.getrecipes = function(id){
			$rootScope.category = id;
			console.log($rootScope.category);
        }

        $scope.getFBsessionDetails = function() {

            var fbsessionurl = "/fbsessionurl";
            console.log("fbsessionurl is: "+fbsessionurl);

            $http.get(fbsessionurl).success(function(data){
                $scope.fbdetails = data[0];
                //var fbdet = JSON.parse($scope.fbdetails);
                console.log("$scope.fbdetails: "+ $scope.fbdetails.email);
            });
        }
		
		//redirects to the create recipe view

}]);

//controller for viewing recipes in a category
recipeApp.controller('recipesCtrl', ['$scope', '$route', '$http',
    function($scope, $route, $http){
		//ng-init, loads recipes 
        $scope.loadRecipes = function() {
			$scope.categoryName = $route.current.params.categoryName;
			$scope.categoryID = $route.current.params.categoryID;
			$scope.userID = $route.current.params.userID;
            $http.get('/categories/' + $scope.categoryID + '/' + $scope.userID).success(function(response){
                console.log("I got the data I requested");
                $scope.recipelist = response;
                console.log(response);
				console.log("User id for category list: " + $scope.userID);
            }); 
			
        };
}]);

//controller for viewing a notecard
recipeApp.controller('recipeDetailCtrl', ['$scope', '$route', '$http',
    function($scope, $route, $http){
        
        var ingredientIDs;
		//ng-init, loads recipe details, including ingredients 
        $scope.loadNotecard = function() {
			$scope.categoryName = $route.current.params.categoryName;
			$scope.categoryID = $route.current.params.categoryID;
			$scope.recipeID = $route.current.params.recipeID;
			$scope.userID = $route.current.params.userID;
            $http.get("/recipeData/" + $scope.recipeID).success(function(response) {
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
		
		//deletes a recipe from the db and redirects to the recipe list 
	    $scope.removeRecipe = function(id) {
            console.log(id);
            $http.delete('/recipe/' + id).success(function(response){
				console.log("Deleted recipe " + response);
            });
        };
		
}]);

//controller for creating a notecard 
recipeApp.controller('createNotecardCtrl', ['$scope', '$route', '$http',
    function($scope, $route, $http){
		$scope.userID = $route.current.params.userID;
		var ingredientIDs = [];
		//ng-init, loads categories into dropdown menu 
		$scope.loadCreate = function() {
			$scope.newingredient = "";
			console.log("categories: ");
			$http.get('/categories').success(function(response){
                $scope.categories = response;
            });
			$scope.ingredients=[];
			console.log($scope.userID);
        };
		
		//Creates a recipe and adds the ingredient ids
		$scope.createrecipe = function() {
			$http.get("/categoryName/" + $scope.recipe.categoryID).success(function(response){
				$scope.categoryName = response.categoryName;
				console.log($scope.categoryName);
			});
			console.log(ingredientIDs);
			$scope.recipe.ingredientIDs = ingredientIDs;
			$scope.recipe.userID = $scope.userID;
			console.log($scope.recipe);
			$http.post("/createrecipe", $scope.recipe).success(function(response) {
				console.log("Recipe initialized");
				console.log(response);
				$scope.recipeID = response;
				console.log("Category name " + $scope.categoryName);
				console.log("Category id " + $scope.recipe.categoryID);
				console.log("Recipe id " + $scope.recipeID);
				console.log("User id " + $scope.userID);
				
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

		//removes new ingredient from both card and DB
        $scope.remove = function(id) {
            console.log(id);
            $http.delete('/ingredientlist/' + id).success(function(response){
				console.log("Deleted ingredient " + id);
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
		
}]);

//controler for editing recipes 
recipeApp.controller('editRecipeCtrl', ['$scope', '$route', '$http',
    function($scope, $route, $http){
		$scope.recipeID = $route.current.params.recipeID;
		$scope.userID = $route.current.params.userID;
        var ingredientIDs;
		//ng-init, loads all recipe data similar to the recipe details view 
        $scope.loadEdit = function() {
            $http.get("/recipeData/" + $scope.recipeID).success(function(response) {
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
				console.log("Initial load ");
				console.log($scope.recipe);
            });
			
			//loads categories into dropdown 
			$http.get('/categories').success(function(response){
                $scope.categories = response;
            });
			console.log($scope.ingredients);
        };
		
        //removes ingredient from card only, not the DB 
		//assumption that an existing recipe may be using ingredients from another recipe 
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
		
		//adds a new ingredient to the DB and the recipe
		//allows duplicates in DB
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
		
		//saves the updated recipe in the DB
		$scope.updaterecipe = function() {
			console.log("I am in update recipe");
			console.log($scope.recipe);
			$scope.recipe.ingredientIDs = ingredientIDs;
			console.log("I have added the ingredients");
			console.log($scope.recipe);
			$http.post("/updaterecipe", $scope.recipe).success(function(response){
				console.log(response);
				$scope.recipeID = $scope.recipe.recipeID;
			});
			$http.get("/categoryName/" + $scope.recipe.categoryID).success(function(response){
				$scope.categoryName = response.categoryName;
				console.log("Initial category name: " + $scope.categoryName);
			});
			console.log("Category name " + $scope.categoryName);
			console.log("Category id " + $scope.recipe.categoryID);
			console.log("Recipe id " + $scope.recipeID);
			console.log("User id " + $scope.userID);
		};
}]);


recipeApp.config(function($routeProvider){
    $routeProvider
    .when('/#',{
        templateUrl: 'recipeBox.html',
        controller: 'recipeBoxCtrl'
    })
    .when('/recipes/:categoryName/:categoryID/:userID',{
        templateUrl: '/recipes.html',
        controller: 'recipesCtrl'
    })
    .when('/recipeDetails/:categoryName/:categoryID/:recipeID/:userID',{
        templateUrl: '/viewRecipeDetails.html',
        controller: 'recipeDetailCtrl'
    })
    .when('/create/:userID',{
        templateUrl: '/createNotecard.html',
        controller: 'createNotecardCtrl'
    })
	.when('/edit/:recipeID/:userID',{
		templateUrl: '/editRecipeDetails.html',
		controller: 'editRecipeCtrl'
	})
    .otherwise({
        redirectTo: '/#'
    });
});


