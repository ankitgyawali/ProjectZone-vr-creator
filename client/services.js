angular.module('vrApp').factory('CanvasService', ['$http',
    function($http) {

 return ({ //All of the data is stored as cookie by utilizing $cookies
            init: init, //Is user logged in
            changeBackground:changeBackground
        });

        function init() {
           console.log("this is test");

        }

        function changeBackground(){

        }



}]);
