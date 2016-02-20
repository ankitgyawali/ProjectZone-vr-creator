//Main login controller that handles login of three different user types
angular.module('vrApp').controller('rootController', ['$scope', '$location','CanvasService',
    function($scope, $location,CanvasService) {

CanvasService.test();
CanvasService.canvas();





    }
]);



//Main login controller that handles login of three different user types
angular.module('vrApp').controller('mainController', ['$scope', '$location','CanvasService',
    function($scope, $location,CanvasService) {



   var camera, scene, renderer; //Initialize vars to create world
    var controls;
    var element, container;
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(120, 1, 0.001, 700); //Make this dynamic. Debug: Scaffold with angularjs
     camera.position.set(0, 10, 0); //Second position sets height of camera Debug: Dynamic
     scene.add(camera);

    renderer = new THREE.WebGLRenderer(); //Use webGL


      element = renderer.domElement;
      container = document.getElementById('maincanvas');
      container.appendChild(element);

       var clock = new THREE.Clock(); //Debug: Read up on this

   

    init();
    animate();

    function init() {

   



      // effect = new THREE.StereoEffect(renderer); //Stereo effect object created from stereoeffect.js library

      

      controls = new THREE.OrbitControls(camera, element); //Attach camera to mouse/swipe
      controls.rotateUp(Math.PI / 4);
      controls.target.set(
        camera.position.x + 0.1,
        camera.position.y,
        camera.position.z
      );
      controls.noZoom = true;
      controls.noPan = true;

      function setOrientationControls(e) {
        if (!e.alpha) {
          return;
        }

        controls = new THREE.DeviceOrientationControls(camera, true);
        controls.connect();
        controls.update();

        element.addEventListener('click', fullscreen, false);

        window.removeEventListener('deviceorientation', setOrientationControls, true);
      }
      window.addEventListener('deviceorientation', setOrientationControls, true);


	var light = new THREE.AmbientLight( 0xE6E3E3 ); // soft white light
	scene.add( light );

	
      //Set Color
      renderer.setClearColor( 0x87CEEB, 0.5 );
      $scope.background = 'textures/ground/grassy.png';
     // Debug: This is dynamic
      var texture = THREE.ImageUtils.loadTexture($scope.background);

      //Texture is repeated from 4x times. (50/50 horizonatal vertical)
      //Can be changed to 1x by 100,100
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat = new THREE.Vector2(50, 50);
      texture.anisotropy = renderer.getMaxAnisotropy();

      //Instantiate material object with mapped to texture
      var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 20,
        shading: THREE.FlatShading,
        map: texture
      });

      //Plate Geometry. Could be changed to provide user with more option
      //Debug: Could be hooked up with angular?
      var geometry = new THREE.PlaneGeometry(1000, 1000);

      var mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 2;
      scene.add(mesh);

      window.addEventListener('resize', resize, false);
      setTimeout(resize, 1);
    }

    function resize() {
      var width = container.offsetWidth;
      var height = container.offsetHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      // effect.setSize(width, height);
    }

    function update(dt) {
      resize();

      camera.updateProjectionMatrix();

      controls.update(dt);
    }

    function render(dt) {
     renderer.render(scene, camera);
    }

    function animate(t) {
      requestAnimationFrame(animate);

      update(clock.getDelta());
      render(clock.getDelta());
    }

    //For cell phone
    function fullscreen() {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      }
    }


$scope.oi = function (){
$scope.background = 'textures/ground/grassy.png';
$scope.scenexx = new THREE.Scene();
console.log("change");
console.log(JSON.stringify($scope.scenexx));
}

   }
   ]);

//Main login controller that handles login of three different user types
angular.module('vrApp').controller('canvasController', ['$scope', '$location', 
    function($scope, $location) {


   }
   ]);