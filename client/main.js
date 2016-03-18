// Designed by: Ankit Gyawali
// Email: agyaw792@gmail.com
// Description: Main App for VR creator

//Define angular app and its dependencies
var vrApp = angular.module('vrApp', ['ngMaterial','ngRoute']);


//Route configuration to provide different level of access controls to different user group
vrApp.config(function($routeProvider) {
   $routeProvider
        .when('/', {
            templateUrl: 'partials/main.html',
            controller: 'rootController'
        })
    // use the HTML5 History API
    // $locationProvider.html5Mode(true);
});



angular.module('myApp', ['ngMaterial'])
vrApp.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('pink');
});

 // red, pink, purple, deep-purple, indigo, blue, light-blue, cyan, teal, green, light-green, 
 // lime, yellow, amber, orange, deep-orange, brown, grey, blue-grey

//Contains global variables used for checksheet manager
//Authentication. Checks if user is logged in on every route change
vrApp.run(['$rootScope',
    function($rootScope) {
 $rootScope.vrAppTitle = "Project Zone Reality Creator"; 
    	    }
]);
