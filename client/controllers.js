//Top level parent controller
angular.module('vrApp').controller('mainController', ['$scope', '$location',
    function($scope, $location) {
      //If directly viewed from phone implement set flag to false for viewController
     
      //JSON object to hold world scence if possible
      $scope.worldJSON = {};
      $scope.worldJSON.isViewFromEditor = false;
      $scope.getworldJSON = function (value){
        $scope.worldJSON = value;
      }


   }
   ]);


//Controller for Editor page
angular.module('vrApp').controller('editorController', ['$scope', '$location','$http',
    function($scope, $location,$http) {

//Save Function
$scope.saveEnvironment = function (){
//Debug: Set a flag value here ??? for saveController in case user tries to access it directly
 $location.url('/save');
}
}

]);





//Save controller, 
angular.module('vrApp').controller('saveController', ['$scope', '$location', 
    function($scope, $location) {

//Debug: http.post code goes here

//Generate Link after http post
$scope.qrLink = Math.random();
$scope.viewQRWorld = function()
{
//Flag to check in view controller if the world is from editor
$scope.worldJSON.isViewFromEditor = true;
$scope.worldJSON.name = 'World Number #' + $scope.qrLink;
 $location.url('/view');
}

   }
   ]);


