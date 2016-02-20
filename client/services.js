angular.module('vrApp').factory('CanvasService', ['$http',
    function($http) {

 return ({ //All of the data is stored as cookie by utilizing $cookies
            test: test, //Is user logged in
            canvas:canvas,
            changeBackground:changeBackground
        });

        function test() {
           console.log("this is test");

        }

        function changeBackground(){

        }

        function canvas(){
 



	}

}]);
