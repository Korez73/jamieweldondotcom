(function() {

    var app = angular.module("githubViewer", []); //second param is dependancies



    var MainController = function($scope, $http) {

        var onUserComplete = function(response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
        }

        var onRepos = function(response) {
            $scope.repos = response.data;
        }

        var onError = function(reason) {
            $scope.error = "Could not fetch the user/data";
        }

        $http.get("https://api.github.com/users/korez73")
            .then(onUserComplete, onError);

        $scope.message = "GitHub Viewer";
        $scope.username = "korez73"
        $scope.repoSortOrder = "-stargazers_count";

        $scope.search = function(username) {
            $http.get("https://api.github.com/users/" + username)
            .then(onUserComplete, onError);
        }
        //$scope.person = person;
    }

    app.controller("MainController", ["$scope", "$http", MainController]); //register the controller, pass as array
    //with the last param being the controller.  we pass "$scope" and "$http" to ensure angular knows about those dependancies
    //in case this file is minified.

}());
