
var myApp = angular.module('myApp', ['ui.bootstrap']);


myApp.controller('myCtrl', function ($scope, $filter, $http) {
    //pagination variables.
    $scope.content = [];
    $scope.filteredCustomers = [];
    $scope.currentPage = 1;
    $scope.numPerPage = 20;
    $scope.maxSize = 5;
    $scope.q = [];
    $scope.c = '';
    $scope.orderName = 'name';
    $scope.orderCountry = 'country'
    $scope.orderProperty = $scope.orderName;
    $scope.nameSortClass = 'glyphicon glyphicon-menu-up';
    $scope.countrySortClass = 'glyphicon glyphicon-menu-up';
    $scope.modelShowClass = ''
    init();
    getAllUni();


    function init() {

            $http.get("https://restcountries.eu/rest/v2/all")
            .then(function mySuccess(response) {
                  $scope.content = response.data;
                }, function myError(response) {
                  $scope.content = response.statusText;
              });
    }


    $scope.numberOfPages = function () {
        return Math.ceil($scope.universities.length / $scope.numPerPage);
    }

    $scope.getCountry = function (x) {
        $scope.c = x.name;
        getUniversity();
    }
    
    function getAllUni() {
        $scope.$emit('LOAD')
        $http.get("https://cors-anywhere.herokuapp.com/http://universities.hipolabs.com/search")
            .then(function (response) {
                 $scope.allUni = response.data;
                 $scope.universities = $scope.allUni;
                 $scope.$emit('UNLOAD');
            }, function (response) {
                $scope.allUni = { message: error, status: status };
                $scope.universities = $scope.allUni;
                $scope.$emit('UNLOAD');
            });
    }

    function getUniversity() {
        $scope.$emit('LOAD')
        $http.get(("https://cors-anywhere.herokuapp.com/http://universities.hipolabs.com/search?country=".concat($scope.c)))
            .then(function (response) {
                 $scope.universities = response.data;
                 $scope.$emit('UNLOAD');
            }, function (response) {
                $scope.universities = { message: error, status: status };
                $scope.$emit('UNLOAD');
            });
    }
   
     
    $scope.setOrderProperty = function(property) {
         if(property==='name')
        {
            if ($scope.orderName === property) {
                 $scope.orderName = '-' + property;
                 $scope.nameSortClass = 'glyphicon glyphicon-menu-down';
            } else {
                $scope.orderName = property;
                $scope.nameSortClass = 'glyphicon glyphicon-menu-up';
            } 
            $scope.orderProperty = $scope.orderName;
        }
        else
        {
            if ($scope.orderCountry === property) {
                $scope.orderCountry = '-' + property;
                $scope.countrySortClass = 'glyphicon glyphicon-menu-down';
            } else {
                $scope.orderCountry = property;
                $scope.countrySortClass = 'glyphicon glyphicon-menu-up';
            } 
            $scope.orderProperty = $scope.orderCountry;
        }
     }

    
    $scope.changeClass = function(input){
            $scope.modelShowClass = input;
    }
    

    $scope.changeNumPage = function(num){
        $scope.numPerPage=num;
    }

}).
controller('appController',['$scope',function($scope){
    $scope.$on('LOAD',function(){$scope.loading=true});
    $scope.$on('UNLOAD',function(){$scope.loading=false});
}])


myApp.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});


function myFunction() {
    document.getElementById("myDropup").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropup-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

 