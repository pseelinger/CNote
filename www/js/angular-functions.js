var app = angular.module('CNote', ['ngRoute']);

app.controller('MainPageController', MainPageController);

function MainPageController($scope){
  $scope.all = true;
  $scope.news = false;
  $scope.sports = false;
  $scope.events = false;

  $scope.changeCategory = function(category){
    $scope.all = false;
    $scope.news = false;
    $scope.sports = false;
    $scope.events = false;

    $scope[category] = true;

     $("html, body").animate({ scrollTop: 0 }, "slow");
  }
}
