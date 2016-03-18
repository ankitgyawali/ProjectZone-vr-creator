/* 
   Author: Ankit Gyawali
   Submitted to: Dr. Parson
   First Created: 3/3/2016
   Last Modified: 3/3/201
   Description: assign1.js sets up Three JS scene,  adds three dealy objects and moves it around the canvas along x,y,z axis.
                        Also listens for keypress 'f' & 'd' to listen to freeze and show demo dealy. Demo dealy leaves a sphere in the canvas.
*/

//Set up new ThreeJS Scene
var scene = new THREE.Scene();

//Set up a camera and move out outwards 5 index so that we can see the canvas from top
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

//Set up WEBGL renderer.
var renderer = new THREE.WebGLRenderer({    alpha: true });

var animateRender; //Animation Frame declared globally to be able freeze rendering
var frozen = false, demo = false; // Key press flags


//Vars associated with dealies
var demoDealy = new GeometricDealy(scene);
var dealy = []; 
var dealylength = 3;

//(1/3) Main Function: Initializer
var init = function() {
// Set Background color & size
renderer.setClearColor(0x000000, 1); 

renderer.setSize(window.innerWidth, window.innerHeight);
//Attach three js scene to HTML
document.body.appendChild(renderer.domElement);
//Populate dealy array
for (var i = 0; i < dealylength; i++) {
        dealy[i] = new GeometricDealy(scene);
        dealy[i].init();
    }
}

//(2/3) Main Function: Listen for key Presses, utilize jQuery
var keyListener = function() {
// When the user presses a key 
jQuery(document).keydown(function(e) {
    switch (e.keyCode) {
        case 70: //For 'f' key
            frozen = !frozen;
            if (frozen) {
                cancelAnimationFrame(animateRender); //Stop Animation
                console.log("Freeze");
            } else {
                requestAnimationFrame(render); //Begin Animation
            }
            break;

        case 68: // For 'd'  key
            console.log("Demo");
            demo = !demo;
            if (demo) { //Create and show dealy
                demoDealy.init();
                cancelAnimationFrame(animateRender); //Pause animation
            } else { //Destroy Dealy

                //Comment one of the below three lines to leave dealy on canvas
                scene.remove(demoDealy.box1);
                 //scene.remove(demoDealy.sphere2);
                scene.remove(demoDealy.box2);
               

                //delete demoDealy;
                
                //Resume animation
                requestAnimationFrame(render);
            }
            break;
    }
 });
}

//(3/3) Main function where animation happens. Called repeatedly
var render = function() {
    animateRender = requestAnimationFrame(render);
    //Animate dealies to a random area
    for (var i = 0; i < dealylength; i++) {
        dealy[i].animate();
    }
    //Render scene after animation
    renderer.render(scene, camera);
};

//Call three main function 
init();
keyListener();
render();


//GeometricDealy class definition
//Provide functions to instantiate dealy (two box on -2 & 2 and one spehere on 0) and animte it
function GeometricDealy(scene) {

  //Initialize Dealy
  this.init = function() {
	  
	  
		//Add random texture for first box
	  	this.boxTex = new THREE.TextureLoader().load( "ball.jpg" );
		this.boxM = new THREE.MeshBasicMaterial( { map: this.boxTex } );
		
		// Add ball texture for sphere geometry
		this.ballText = new THREE.TextureLoader().load( "soccer.jpg" );
		this.balLM = new THREE.MeshBasicMaterial( { map: this.ballText } );
		
		//Add face image as texture for box
		this.thirdText = new THREE.TextureLoader().load( "third.jpg" );
		this.thirdM = new THREE.MeshBasicMaterial( { map: this.thirdText } );
		
        //Add box #1
        this.box1Geo = new THREE.BoxGeometry(1, 1, 1);
        this.box1Mat = new THREE.MeshBasicMaterial({color: (Math.random() * 0xffffff)});
        this.box1 = new THREE.Mesh(this.box1Geo, this.boxM);
        scene.add(this.box1);

        //Add middle sphere
		
		
        this.sphere2Geo = new THREE.SphereGeometry(1, 32, 32);
        this.sphere2Mat = new THREE.MeshBasicMaterial({color: (Math.random() * 0xffffff)});
		

		
		
		//console.log(JSON.stringify(this.sphereTexture));
        this.sphere2 = new THREE.Mesh(this.sphere2Geo, this.balLM);
        
		scene.add(this.sphere2);
		
		
         //Add box #2
        this.box2Geo = new THREE.BoxGeometry(2, 2, 2);
        this.box2Mat = new THREE.MeshBasicMaterial({color: (Math.random() * 0xffffff)});
        this.box2 = new THREE.Mesh(this.box2Geo, this.thirdM);
        scene.add(this.box2);

       //Generate random x & y
        var x = getRandomInt(-5, 5);
        var y = getRandomInt(-2, 2);
       //var  z = getRandomInt(0,50);
        var z = 0;

        //Set position of dealy
        this.box1.position.set(x - 2, y, z);
        this.box2.position.set(x + 2, y, z);
        this.sphere2.position.set(x, y, z);
    }

    //Move dealy position in randomorder
    this.animate = function() {
        //Generate random x & y
        var x = getRandomInt(-5, 5);
        var y = getRandomInt(-2, 2);
        // var  z = getRandomInt(-10,10);
        var z = 0;
        //Set random position & color
        this.box1.position.set(x - 2, y, z);
        this.box1.material.color.setHex(Math.random() * 0xffffff);
        this.box2.position.set(x + 2, y, z);
        this.box2.material.color.setHex(Math.random() * 0xffffff);
        this.sphere2.position.set(x, y, z);
        this.sphere2.material.color.setHex(Math.random() * 0xffffff);
    }

    //Helper function to get random number
    function getRandomInt(min, max) {
        return (Math.random() * (max - min + 1)) + min;
    }  
};

//Helper function to return random color for dealies
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '0x';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}