//Main login controller that handles login of three different user types
angular.module('vrApp').controller('rootController', ['$scope', '$location','CanvasService',
    function($scope, $location,CanvasService) {

CanvasService.test();
CanvasService.canvas();


    }
]);

//Main login controller that handles login of three different user types
angular.module('vrApp').controller('mainController', ['$scope', '$location', 
    function($scope, $location) {



   }
   ]);

//Main login controller that handles login of three different user types
angular.module('vrApp').controller('canvasController', ['$scope', '$location', 
    function($scope, $location) {


   }
   ]);