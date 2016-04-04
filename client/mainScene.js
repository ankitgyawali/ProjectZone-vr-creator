
//Render the virtual reality scence here
angular.module('vrApp').controller('viewController', ['$scope', '$location','$routeParams',
    function($scope, $location,$routeParams) {
      

      $scope.worldJSON._id =  $routeParams.param1
      //Debug: Manual JSON Here, use conver service later
      $scope.worldJSON.lightColor = 0xE6E3E3; //Light white
      $scope.worldJSON.skyColor = 0x87CEEB; //Sky blue
      $scope.worldJSON.groundTexture = 'textures/ground/stone.png';
      $scope.worldJSON.room = "false";
      $scope.worldJSON.cameraZposition = 10; //Default 10 
      $scope.worldJSON.roomSize = 25;
        

      console.log('Mongo id is:  '+ $scope.worldJSON._id );
      //IF NOT GROUND TEXTURE


      //Debug: First check if user is trying to view from pc here.
      if($scope.worldJSON.isViewFromEditor==true){
        console.log("this is world json: "+ JSON.stringify($scope.worldJSON));
        console.log("access from local json object directly")
      }
      else{
        console.log("this is world json: "+ JSON.stringify($scope.worldJSON));
        console.log("access view from database");
      }


//***********************************************
    //   var camera, scene, renderer, controls, element, container;
    $scope.scene = new THREE.Scene();

    $scope.camera = new THREE.PerspectiveCamera(120, 1, 0.001, 700); //Make this dynamic. Debug: Scaffold with angularjs
     $scope.camera.position.set(0, $scope.worldJSON.cameraZposition, 0); //Second position sets height of camera Debug: Dynamic
     $scope.scene.add($scope.camera);

    $scope.renderer = new THREE.WebGLRenderer(); //Use webGL


      $scope.element = $scope.renderer.domElement;
      $scope.container = document.getElementById('maincanvas');
      $scope.container.appendChild($scope.element);

       $scope.clock = new THREE.Clock(); //Debug: Read up on this

   

    init();
    animate();



    function init() {
  

     $scope.effect = new THREE.StereoEffect($scope.renderer); //Stereo effect object created from stereoeffect.js library

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


  $scope.light = new THREE.AmbientLight($scope.worldJSON.lightColor); // soft white light
  $scope.scene.add($scope.light );

  
      //Set Color
      $scope.renderer.setClearColor( $scope.worldJSON.skyColor, 0.5 ); //Sky color
     
     // Debug: This is dynamic
      $scope.texture = THREE.ImageUtils.loadTexture($scope.worldJSON.groundTexture);

      //Texture is repeated from 4x times. (50/50 horizonatal vertical)
      //Can be changed to 1x by 100,100
      $scope.texture.wrapS = THREE.RepeatWrapping;
      $scope.texture.wrapT = THREE.RepeatWrapping;
      $scope.texture.repeat = new THREE.Vector2(50, 50);
      $scope.texture.anisotropy = $scope.renderer.getMaxAnisotropy();

      //Instantiate material object with mapped to texture
      $scope.material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xff0000,
        shininess: 20,
        shading: THREE.FlatShading,
        map: $scope.texture
      });

      // $scope.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

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
      $scope.width = $scope.container.offsetWidth;
      $scope.height = $scope.container.offsetHeight;

      $scope.camera.aspect = $scope.width / $scope.height;
      $scope.camera.updateProjectionMatrix();

      $scope.renderer.setSize($scope.width, $scope.height);
      $scope.effect.setSize($scope.width, $scope.height);
    }

    function update(dt) {
      resize();

      $scope.camera.updateProjectionMatrix();

      $scope.controls.update(dt);
    }


    function render(dt) {
     $scope.effect.render($scope.scene, $scope.camera);
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