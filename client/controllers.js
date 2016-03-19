//Main login controller that handles login of three different user types
angular.module('vrApp').controller('rootController', ['$scope', '$location','CanvasService','$http',
    function($scope, $location,CanvasService,$http) {



$scope.saveEnvironment = function (){
 $location.url('/save');
  console.log("ok");
}




    }
]);



//Main login controller that handles login of three different user types
angular.module('vrApp').controller('mainController', ['$scope', '$location','CanvasService',
    function($scope, $location,CanvasService) {




   }
   ]);

//Main login controller that handles login of three different user types
angular.module('vrApp').controller('saveController', ['$scope', '$location', 
    function($scope, $location) {


      $scope.qrLink = "htttp://www.ankitgyawali.com/vrc/fwdasdasdaawe23d";
console.log("saveee");


$scope.doSomething = function(){
  console.log("done");
  $scope.qrLink = "xxxxxxxx";
}
   }
   ]);