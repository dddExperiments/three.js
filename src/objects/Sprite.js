/**
 * @author mikael emtinger / http://gomo.se/
 */

THREE.Sprite = function( parameters ) {

	THREE.Object3D.call( this );

	if( parameters.material !== undefined ) {

		this.material = parameters.material;
		this.map      = undefined;
		this.blending = material.blending;

	} else if( parameters.map !== undefined ) {

		this.map      = parameters.map instanceof THREE.Texture ? parameters.map : THREE.ImageUtils.loadTexture( parameters.map );
		this.material = undefined;
		this.blending = parameters.blending !== undefined ? parameters.blending : THREE.NormalBlending;

	}

	this.useScreenCoordinates = parameters.useScreenCoordinates !== undefined ? parameters.useScreenCoordinates : true;
	this.mergeWith3D = parameters.mergeWith3D !== undefined ? parameters.mergeWith3D : !this.useScreenCoordinates;
	this.affectedByDistance = parameters.affectedByDistance !== undefined ? parameters.affectedByDistance : !this.useScreenCoordinates;
	this.alignment = parameters.alignment instanceof THREE.Vector2 ? parameters.alignment : THREE.SpriteAlignment.center;

	this.rotation3d = this.rotation;
	this.rotation = 0;
	this.opacity = 1;

	this.uvOffset = new THREE.Vector2( 0, 0 );
	this.uvScale  = new THREE.Vector2( 1, 1 );

};

THREE.Sprite.prototype             = new THREE.Object3D();
THREE.Sprite.prototype.constructor = THREE.Sprite;
THREE.Sprite.prototype.supr        = THREE.Object3D.prototype;


/*
 * Custom update matrix
 */

THREE.Sprite.prototype.updateMatrix = function () {

	this.matrix.setPosition( this.position );

	this.rotation3d.set( 0, 0, this.rotation );
	this.matrix.setRotationFromEuler( this.rotation3d );

	if ( this.scale.x !== 1 || this.scale.y !== 1 ) {

		this.matrix.scale( this.scale );
		this.boundRadiusScale = Math.max( this.scale.x, this.scale.y );

	}

	this.matrixWorldNeedsUpdate = true;

};

/*
 * Alignment
 */

THREE.SpriteAlignment = {};
THREE.SpriteAlignment.topLeft = new THREE.Vector2( 1, -1 );
THREE.SpriteAlignment.topCenter = new THREE.Vector2( 0, -1 );
THREE.SpriteAlignment.topRight = new THREE.Vector2( -1, -1 );
THREE.SpriteAlignment.centerLeft = new THREE.Vector2( 1, 0 );
THREE.SpriteAlignment.center = new THREE.Vector2( 0, 0 );
THREE.SpriteAlignment.centerRight = new THREE.Vector2( -1, 0 );
THREE.SpriteAlignment.bottomLeft = new THREE.Vector2( 1, 1 );
THREE.SpriteAlignment.bottomCenter = new THREE.Vector2( 0, 1 );
THREE.SpriteAlignment.bottomRight = new THREE.Vector2( -1, 1 );
