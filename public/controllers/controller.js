var recipeApp = angular.module('recipeApp', [
    'ngRoute',
    'ngResource'
]);

recipeApp.controller('recipeBoxCtrl', ['$scope', '$http',
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
            window.location = "./#/recipes";
        }
}]);

recipeApp.controller('recipesCtrl', ['$scope', '$http',
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
            window.location = "./#/viewRecipeDetails.html";
        }
        
        $scope.createnew = function() {
            window.location = "./#/createNotecard.html";
        }
}]);

recipeApp.controller('recipeDetailCtrl', ['$scope', '$http',
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
		
		refresh();
	/*         $scope.remove = function(id) {
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
        }*/	
}]);


recipeApp.controller('createNotecardCtrl', ['$scope', '$http',
    function($scope, $http){
		
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
    .when('/',{
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
    .when('/createNotecard',{
        templateUrl: '/createNotecard.html',
        controller: 'createNotecardCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
});


