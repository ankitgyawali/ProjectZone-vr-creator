// Designed by: Ankit Gyawali
// Email: agyaw792@gmail.com
// Description: Main App for VR creator

//Define angular app and its dependencies
var vrApp = angular.module('vrApp', ['ngMaterial','ngRoute']);


//Route configuration to provide different level of access controls to different user group
vrApp.config(function($routeProvider) {
    $routeProvider
   $routeProvider
        .when('/', {
            templateUrl: 'partials/main.html',
            controller: 'rootController'
        })
    // use the HTML5 History API
    // $locationProvider.html5Mode(true);
});



//Contains global variables used for checksheet manager
//Authentication. Checks if user is logged in on every route change
vrApp.run(['$rootScope',
    function($rootScope) {
 $rootScope.vrAppTitle = "Google Virtual Reality Creator"; 
    	    }
]);
