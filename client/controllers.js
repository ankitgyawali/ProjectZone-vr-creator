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

      $scope.changeTemplate = function(val){
       $location.url(val);
      }


   }
   ]);


//Top level parent controller
angular.module('vrApp').controller('learnController', ['$scope', '$location',
    function($scope, $location) {
   }
   ]);  


//Top level parent controller
angular.module('vrApp').controller('buildController', ['$scope', '$location',
    function($scope, $location) {

   $(document).ready( function() {
            //alert('hover');
            

            
            
            $('.object').click(function() {
                var whichCategory = $(this).parent();
                var copy=$(this).clone();
    //            $(this).css("position","absolute");
    //            $(this).css("z-index","100");

                copy.css("position" , "absolute");
                copy.addClass('draggable');
                copy.addClass('grab');
                $('.workspace').append(copy);
                $('.draggable').draggable({containment: ".workspace", scroll: false });

                $(".grab").on("dblclick", function(){
                    $(this).remove();
                });
                
                 $(".grab svg circle").on("click", function(){
                   // alert("click");
                   $(this).attr('style', _currentFill); 
                });

                 $(".grab svg path").on("click", function(){
                   // alert("click");
                   $(this).attr('style', _currentFill); 
                });
 
                $(".grab svg polygon").on("click", function(){
                   // alert("click");
                   $(this).attr('style', _currentFill); 
                });
                
                $(".grab svg rect").on("click", function(){
                   // alert("click");
                   $(this).attr('style', _currentFill); 
                });
                
                $(".grab svg polygon").on("click", function(){
                   // alert("click");
                   $(this).attr('style', _currentFill); 
                });
                
                
            });
        });        

       $("#shapeButton").click(function () {
                         $("#colors").hide();
                         $("#light").hide();
                         $("#shapes").show();
                         $("#colorInstruct").hide();
                         $("#lightInstruct").hide();
                         $("#shapeInstruct").show();
                        // e.stopPropagation();
                     });
                     
                     $("#colorButton").click(function () {
                         $("#shapes").hide();
                         $("#light").hide();
                         $("#colors").show();
                         $("#shapeInstruct").hide();
                         $("#lightInstruct").hide();
                         $("#colorInstruct").show();
                         
                        // e.stopPropagation();
                    });
                     
                    $("#lightButton").click(function () {
                        $("#shapes").hide();
                        $("#colors").hide();
                        $("#light").show();
                        $("#shapeInstruct").hide();
                         $("#colorInstruct").hide();
                         $("#lightInstruct").show();
                        //e.stopPropagation();
                    }); 

                        var _currentFill = "fill:#FFFDF1";
                    $(".object").click(function (event) { $(event.target).attr('style', _currentFill); 
                    $(event.target).attr('style', "fill:#FFFDF1");
                                                        })
                    var $swatches = $("#colors");
                    $swatches.click(function (event) { 
                        $swatch = $(event.target);
                        loc = [parseInt($swatch.attr('x'), 10),
                               parseInt($swatch.attr('y'), 10)]
                        $("#selection", $swatches).attr('x', loc[0]);
                        $("#selection", $swatches).attr('y', loc[1]);
                        _currentFill = $swatch.attr('style'); ; 
                        
                        //alert(_currentFill);
                    })

                    


   }
   ]);  


//Controller for Editor page
angular.module('vrApp').controller('editorController', ['$scope', '$location','$http',
    function($scope, $location,$http) {

//Start Front End code ************************
//Debug: needs changes using scope watch
$(document).ready( function() {
//alert('hover');
        $('.object').click(function() {
         $scope.whichCategory = $(this).parent();
            $scope.copy=$(this).clone();
//            $(this).css("position","absolute");
      //      $(this).css("z-index","100");


            copy.css("position", "absolute");
            copy.addClass('draggable');
            copy.addClass('grab');
            $('.workspace').append(copy);
            
            $('.draggable').draggable({containment: ".workspace", scroll: false });
           
        });
  });
//End Front End code ************************





//Save Function
$scope.saveEnvironment = function (){
//Debug: Set a flag value here ??? for saveController in case user tries to access it directly
 $location.url('/save');
}
}

]);





//Save controller, 
angular.module('vrApp').controller('saveController', ['$scope', '$location',  '$http',
    function($scope, $location, $http) {

//Debug: http.post code goes here

//Generate Link after http post
$scope.qrLink = Math.random();
$scope.viewQRWorld = function()
{
//Flag to check in view controller if the world is from editor
$scope.worldJSON.isViewFromEditor = true;
$scope.worldJSON.name = 'World Number #' + $scope.qrLink;
 
            //Code to save world JSON to backend
            // $http({
            //         method: 'POST',
            //         url: '/save',
            //         // set the headers so angular passing info as form data (not request payload)
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         data: {
            //             worldToSave: $scope.worldJSON
            //         }

            //     }).success(function(data, status, headers, config) {
            //          console.log("Successfully saved to database!")
            //           $location.url('/view/' + $scope.qrLink);

            //     })
            //     .error(function(data, status, headers, config) {
            //         $scope.worldJSON.flag = false;
            //          console.log("Something went wrong!")
            //          $location.url('/view/error');

            //     });
 

 $location.url('/view/' + $scope.qrLink);


}

   }
   ]);


