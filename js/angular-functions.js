var app = angular.module('CNote', ['ngRoute']);

app.controller('MainPageController', MainPageController);

function MainPageController($scope){
  $scope.all = true;
  $scope.news = false;
  $scope.sports = false;
  $scope.obituaries = false;
  $scope.classifieds = false;

  $scope.changeCategory = function(category){
    $scope.all = false;
    $scope.news = false;
    $scope.sports = false;
    $scope.obituaries = false;
    $scope.classifieds = false;

    $scope[category] = true;
  }
}
