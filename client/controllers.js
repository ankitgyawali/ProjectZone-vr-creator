//Main login controller that handles login of three different user types
angular.module('vrApp').controller('rootController', ['$scope', '$location','CanvasService','$http',
    function($scope, $location,CanvasService,$http) {



$scope.saveEnvironment = function (){
 $location.url('/view');
  console.log("ok");
}




    }
]);



//Main login controller that handles login of three different user types
angular.module('vrApp').controller('mainController', ['$scope', '$location','CanvasService',
    function($scope, $location,CanvasService) {


 $scope.background = 'textures/ground/railtrack.png';
    //   var camera, scene, renderer, controls, element, container;
    $scope.scene = new THREE.Scene();

    $scope.camera = new THREE.PerspectiveCamera(120, 1, 0.001, 700); //Make this dynamic. Debug: Scaffold with angularjs
     $scope.camera.position.set(0, 10, 0); //Second position sets height of camera Debug: Dynamic
     $scope.scene.add($scope.camera);

    $scope.renderer = new THREE.WebGLRenderer(); //Use webGL


      $scope.element = $scope.renderer.domElement;
      $scope.container = document.getElementById('maincanvas');
      $scope.container.appendChild($scope.element);

       $scope.clock = new THREE.Clock(); //Debug: Read up on this

   

    init();
    animate();

    function init() {

   



      // effect = new THREE.StereoEffect(renderer); //Stereo effect object created from stereoeffect.js library

      

      $scope.controls = new THREE.OrbitControls($scope.camera,$scope.element); //Attach camera to mouse/swipe
      $scope.controls.rotateUp(Math.PI / 4);
      $scope.controls.target.set(
        $scope.camera.position.x + 0.1,
        $scope.camera.position.y,
        $scope.camera.position.z
      );
      $scope.controls.noZoom = true;
      $scope.controls.noPan = true;

      function setOrientationControls(e) {
        if (!e.alpha) {
          return;
        }

        $scope.controls = new THREE.DeviceOrientationControls($scope.camera, true);
        $scope.controls.connect();
        $scope.controls.update();

        $scope.element.addEventListener('click', fullscreen, false);

        window.removeEventListener('deviceorientation', setOrientationControls, true);
      }
      window.addEventListener('deviceorientation', setOrientationControls, true);


	$scope.light = new THREE.AmbientLight( 0xE6E3E3 ); // soft white light
	$scope.scene.add($scope.light );

	
      //Set Color
      $scope.renderer.setClearColor( 0x87CEEB, 0.5 ); //Sky color
     
     // Debug: This is dynamic
      $scope.texture = THREE.ImageUtils.loadTexture($scope.background);

      //Texture is repeated from 4x times. (50/50 horizonatal vertical)
      //Can be changed to 1x by 100,100
      $scope.texture.wrapS = THREE.RepeatWrapping;
      $scope.texture.wrapT = THREE.RepeatWrapping;
      $scope.texture.repeat = new THREE.Vector2(50, 50);
      $scope.texture.anisotropy = $scope.renderer.getMaxAnisotropy();

      //Instantiate material object with mapped to texture
      $scope.material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 20,
        shading: THREE.FlatShading,
        map: $scope.texture
      });

      //Plate Geometry. Could be changed to provide user with more option
      //Debug: Could be hooked up with angular?
      $scope.geometry = new THREE.PlaneGeometry(1000, 1000);
      $scope.geometry.dynamic = true;

      $scope.mesh = new THREE.Mesh($scope.geometry, $scope.material);
      $scope.mesh.rotation.x = -Math.PI / 2;
      $scope.scene.add($scope.mesh);

      window.addEventListener('resize', resize, false);
      setTimeout(resize, 1);
    }

    function resize() {
      var width = $scope.container.offsetWidth;
      var height = $scope.container.offsetHeight;

      $scope.camera.aspect = width / height;
      $scope.camera.updateProjectionMatrix();

      $scope.renderer.setSize(width, height);
      // effect.setSize(width, height);
    }

    function update(dt) {
      resize();

      $scope.camera.updateProjectionMatrix();

      $scope.controls.update(dt);
    }

    function render(dt) {
     $scope.renderer.render($scope.scene, $scope.camera);
    }

    function animate(t) {
      requestAnimationFrame(animate);

      update($scope.clock.getDelta());
      render($scope.clock.getDelta());
    }

    //For cell phone
    function fullscreen() {
      if ($scope.container.requestFullscreen) {
        $scope.container.requestFullscreen();
      } else if ($scope.container.msRequestFullscreen) {
        $scope.container.msRequestFullscreen();
      } else if ($scope.container.mozRequestFullScreen) {
        $scope.container.mozRequestFullScreen();
      } else if ($scope.container.webkitRequestFullscreen) {
        $scope.container.webkitRequestFullscreen();
      }
    }



   }
   ]);

//Main login controller that handles login of three different user types
angular.module('vrApp').controller('canvasController', ['$scope', '$location', 
    function($scope, $location) {


   }
   ]);