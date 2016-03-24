angular.module('vrApp').factory('RenderService', ['$http',
    function($http) {

 return ({ //All of the data is stored as cookie by utilizing $cookies
            init: init, //Is user logged in
            convertJSON:convertJSON
        });

        function init() {
           console.log("this is test");

        }

        function convertJSON(){
		console.log("this is converting the json");
        }



}]);
