  var container, stats;
	var camera, scene, projector, renderer;

	var mouse = { x: 0, y: 0 }, INTERSECTED;
	var radius = 100;
	var theta = 0;
	
	init();
	animate();

	
    
    function init ()  {

       


        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.set(0, 300, 500 );
        camera.lookAt( scene.position );

        scene.add( camera );

        var geometry = new THREE.CubeGeometry( 5, 5, 5 );
        
/*        for ( var i = 0; i < 500; i ++ ) {

            var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

            object.position.x = Math.random() * 800 - 400;
            object.position.y = Math.random() * 800 - 400;
            object.position.z = Math.random() * 800 - 400;

            object.rotation.x = ( Math.random() * 360 ) * Math.PI / 180;
            object.rotation.y = ( Math.random() * 360 ) * Math.PI / 180;
            object.rotation.z = ( Math.random() * 360 ) * Math.PI / 180;

            object.scale.x = Math.random() * 2 + 1;
            object.scale.y = Math.random() * 2 + 1;
            object.scale.z = Math.random() * 2 + 1;

            scene.add( object );

        }
  */      
  planeAsPlane = new THREE.PlaneGeometry( 300, 300, 20, 20 );
  
  planeAsPlane.dynamic = true;  
       for (var i = 0; i < planeAsPlane.vertices.length; i++) {
        planeAsPlane.vertices[i].x += Math.round(Math.random()*2);
	planeAsPlane.vertices[i].y += Math.round(Math.random()*2);
	planeAsPlane.vertices[i].x += Math.round(Math.random()*2);
    }

     planeAsPlane.__dirtyVertices = true;
   planeAsPlane.computeCentroids();
   planeAsPlane.computeVertexNormals();
   
   plane = new THREE.Mesh( planeAsPlane, new THREE.MeshBasicMaterial( { color: 0x555555, wireframe: true } ) );
  
  
  //console.log(planeAsPlane.faces.length);
  //console.log(plane.uvs.length);
  
  //plane.vertices[0].position.z += 3;
  //plane._dirtyVertices = true;
//  planeAsPlane.computeCentroids();
  
     /*for (var i = 0; i < 5; i++) {
        planeAsPlane.vertices[i].position.z += 3;
    }*/
    
    
  //plane.rotation.x = - 90 * Math.PI / 180;
  scene.add( plane );
  
        var cube = new THREE.Mesh(
        		   geometry,            
                                new THREE.MeshLambertMaterial( { color: 0xff00ff } )
                            );
        scene.add( cube );

        var cube2 = new THREE.Mesh(
                geometry,
                new THREE.MeshLambertMaterial( { color: 0xff00ff } )
            );
        cube2.position.x = 10;
        cube2.position.y = 10;
        cube2.position.z = 10;
        scene.add(cube2);

    	
    	projector = new THREE.Projector();
    	
    	/*
    	var geometry = new THREE.Geometry();
    	var vertex = new THREE.Vector3();
		vertex.x = 1;
		vertex.y = 2;
		vertex.z = 3;
		geometry.vertices.push(vertex) ;
		
		var vertex = new THREE.Vector3();
		vertex.x = 3;
		vertex.y = 2;
		vertex.z = 3;
		geometry.vertices.push(vertex) ;
		
		var vertex = new THREE.Vector3();
		vertex.x = 1;
		vertex.y = 4;
		vertex.z = 3;
		geometry.vertices.push(vertex) ;
		//numbers of verticies in the arguments of the Face3 constructor!
		geometry.faces.push( new THREE.Face3(1, 2, 0) );
		//geometry.faces.push( new THREE.Face3(1, 2, 3) );
		//geometry.faces.push( new THREE.Face3(4, 5, 6) );

		//geometry.computeFaceNormals();
		var goodMesh = new THREE.Mesh(
				geometry,
                new THREE.MeshBasicMaterial( { color: 0xFFAA00 } )
            );
	     //scene.add( goodMesh);
	     */
	     var light = new THREE.DirectionalLight( 0xffffff, 2 );
         light.position.set( 1, 1, 1 ).normalize();
         scene.add( light );

         var light = new THREE.DirectionalLight( 0xffffff );
         light.position.set( -1, -1, -1 ).normalize();
         scene.add( light );


        

        stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		document.body.appendChild( stats.domElement );

		 renderer = new THREE.WebGLRenderer();
	        renderer.sortObjects = false;
	        renderer.setSize( window.innerWidth, window.innerHeight );
	        document.body.appendChild( renderer.domElement );
	        renderer.render( scene, camera );
            document.addEventListener( 'mousemove', onDocumentMouseMove, false );
            document.addEventListener( 'mousedown', onDocumentMouseClick, false );
            
    };
		
    function onDocumentMouseClick(event) {
   
  
      //console.log(planeAsPlane.vertices[24].x);
      
      
    	console.log("clicked");
    	 var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
         projector.unprojectVector( vector, camera );
    	 var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );
    	 var c = ray.intersectObject(plane);
	 var cube3 = new THREE.Mesh(
        		   new THREE.CubeGeometry( 5, 5, 5 ),            
                             new THREE.MeshLambertMaterial( { color: 0x0f00f0 } )
                            );
	cube3.position = c[0].point;		    
        scene.add( cube3);
	
         /*if( c.length > 0 ) {
            console.log(c[0].point);
         }*/
    }
    function onDocumentMouseMove( event ) {

        event.preventDefault();

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    }
	        
	        function animate() {

				requestAnimationFrame( animate );

				render();

				stats.update();
			}
	        
	        

			function render() {

			
  
  
				theta = 120;

				camera.position.x = radius * Math.sin( theta * Math.PI / 360 );
				camera.position.y = radius * Math.sin( theta * Math.PI / 360 );
				camera.position.z = radius * Math.cos( theta * Math.PI / 360 );
				camera.lookAt( scene.position );
				
				
				var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
                projector.unprojectVector( vector, camera );

                var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );

                var intersects = ray.intersectObjects( scene.children );

               
                
                if ( intersects.length > 0 ) {

                    if ( INTERSECTED != intersects[ 0 ].object ) {

                        if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

                        INTERSECTED = intersects[ 0 ].object;
                        INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
                        INTERSECTED.material.color.setHex( 0xff0000 );

                    }

                } else {

                    if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

                    INTERSECTED = null;

                }
                
                
				
				renderer.render( scene, camera );
			}