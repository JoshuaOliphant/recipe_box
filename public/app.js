var recipeApp = angular.module('myApp', ['ngRoute']);

recipeApp.config(function ($routeProvider) {
  $routeProvider
    .when('localhost:3000', {
      controller: "HomeController",
      templateUrl: "/views/home.html"
    })
    .when('/createRecipe'{
      controller:"createRecipeController".
      templateUrl: "/views/createRecipe.html"
    })
    .otherwise({
      redirectTo: '/'
    });
});