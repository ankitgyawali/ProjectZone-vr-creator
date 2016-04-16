/* 
   Author: Ankit Gyawali
   Submitted to: Dr. Parson
   First Created: 3/29/2016
   Last Modified: 3/29/201
   Description: assign3.js sets up Three JS scene, is a modification of assignment 1 in a sense that instead of using multiple shape objects,
   shapes are created sperately but attached as one final geometry so that its rendered as a single object by renderer, which causes increases in performance.
    Textures  and tinting have been applied to the shape.
*/
//Set up new ThreeJS Scene
var scene = new THREE.Scene();


var maxSubShapes = 50;


//Set up a camera and move out outwards 5 index so that we can see the canvas from top
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

//Set up WEBGL renderer.
var renderer = new THREE.WebGLRenderer({
    alpha: true
});

var animateRender; //Animation Frame declared globally to be able freeze rendering
var frozen = false // Key press flags


//One single object is ued instead of multiple dealies
var mainDealy = new GeometricDealy(scene);


//(1/3) Main Function: Initializer
var init = function() {
    // Set Background color & size
    renderer.setClearColor(0x000000, 1);

    renderer.setSize(window.innerWidth, window.innerHeight);
    //Attach three js scene to HTML
    document.body.appendChild(renderer.domElement);

    mainDealy.init();

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


        }
    });
}

//(3/3) Main function where animation happens. Called repeatedly
var render = function() {
    animateRender = requestAnimationFrame(render);

    mainDealy.animate();
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


        // Create texture
        this.sphereTexture = new THREE.TextureLoader().load("soccer.jpg");
        this.sphereMaterial = new THREE.MeshBasicMaterial({
            map: this.sphereTexture
        });

        //Create ball and sphere geometry
        this.sphereGeometry = new THREE.SphereGeometry(0.25, 32, 32);
        this.boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);

        //Create a sphere mesh to keep using it
        this.sphereFinal = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);


        for (i = 0; i < maxSubShapes; i++) {

            //update sphere position so it doesnt overlap
            this.sphereFinal.position.setX(0.5 * i);

            this.sphereFinal.updateMatrix(); //Update matrix after sphere has been added

            //Merge with box geometry to create  a mesh
            //Main merging occurs here 
            this.boxGeometry.merge(this.sphereFinal.geometry, this.sphereFinal.matrix);
        }

        //Finally create mesh from the geometry
        this.finalMesh = new THREE.Mesh(this.boxGeometry, this.sphereMaterial);

        this.finalMesh.position.set(-5, 2, 1);

        //Add scene to world
        scene.add(this.finalMesh);


    }

    //Move dealy position in randomorder
    this.animate = function() {

        //Rotates main object  
        //Set random position & color
        this.finalMesh.rotation.x += 0.1;
        this.finalMesh.rotation.y += 0.1;
        this.finalMesh.rotation.z += 0.1;
        this.finalMesh.material.color.setHex(Math.random() * 0xffffff);


    }

    //Helper function to get random number
    function getRandomInt(min, max) {
        return (Math.random() * (max - min + 1)) + min;
    }
};