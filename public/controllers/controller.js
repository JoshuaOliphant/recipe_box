var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http',
    function($scope, $http){
        console.log("Hello world from controller");

        var refresh = function() {
            $http.get('/ingredientlist').success(function(response){
                console.log("I got the data I requested");
                $scope.ingredientlist = response;
                $scope.ingredient = "";

            });
        };

        refresh();

        $scope.addingredient = function() {
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
