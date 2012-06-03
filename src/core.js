   var container, stats;
   var camera, scene, projector, renderer;
   init();
   animate();
	
   function init() {
	   renderer = new THREE.WebGLRenderer();
	   renderer.setSize(window.innerWidth, window.innerHeight);
	   
       document.body.appendChild(renderer.domElement);
       
       scene = new THREE.Scene();

       camera = new THREE.PerspectiveCamera(
           35,             // Field of view
           window.innerWidth / window.innerHeight,      // Aspect ratio
           0.1,            // Near plane
           10000           // Far plane
       );
       camera.position.set(3, 10, 15 );
       camera.lookAt(scene.position);
       scene.add(camera);

       //for mesh params are geomety and material
       var cube = new THREE.Mesh(
           new THREE.CubeGeometry( 5, 5, 5 ),
           new THREE.MeshLambertMaterial( { color: 0xFF0000 } )
       );
       scene.add(cube);
       
       var light = new THREE.PointLight( 0xFFFF00 );
       light.position.set( 10, 10, 20 );
       scene.add( light );

	   renderer.render(scene, camera);
   }
   
   function animate () {
	   requestAnimationFrame(animate);
       render();
   }
   
   function render () {
	   camera.lookAt( scene.position );
	   renderer.render(scene, camera);
   }
   