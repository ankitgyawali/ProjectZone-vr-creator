//Top level parent controller
angular.module('vrApp').controller('mainController', ['$scope', '$location','CanvasService',
    function($scope, $location,CanvasService) {
      //If directly viewed from phone implement set flag to false for viewController
      $scope.isViewFromEditor = false;
      //JSON object to hold world scence if possible
      $scope.worldJSON = {};
      $scope.getworldJSON = function (value){
        $scope.worldJSON = value;
      }


   }
   ]);


//Controller for Editor page
angular.module('vrApp').controller('editorController', ['$scope', '$location','CanvasService','$http',
    function($scope, $location,CanvasService,$http) {

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
$scope.isViewFromEditor = true;
$scope.worldJSON.name = 'World Number #' + $scope.qrLink;
 $location.url('/view');
}

   }
   ]);


//Render the virtual reality scence here
angular.module('vrApp').controller('viewController', ['$scope', '$location','CanvasService',
    function($scope, $location,CanvasService) {

      //Debug: First check if user is trying to view from pc here.

      if($scope.isViewFromEditor){
        console.log("access from local json object directly")
      }
      else{
        console.log("access view from database");
      }

   }
   ]);