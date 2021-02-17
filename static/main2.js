const app = new PIXI.Application({
	width: 640,
	height: 640,
	backgroundColor: 0x1099bb,
});

document.body.appendChild( app.view );

PIXI.Loader.shared
	.add("static/images/matrix.png")
	.load( setup )

function setup() {
	let matrix = new PIXI.Sprite( PIXI.Loader.shared.resources['static/images/matrix.png'].texture );

	matrix.x = 300;
	matrix.y = 300;

	matrix.scale.set(0.5);
	matrix.anchor.set(0.5); // ЯКОРЬ, ТОЧКА ПРИВЯЗКИ ОБЬЕКТА (1 - ЛЕВЫЙ ВЕРХНИЙ, 0.5 - ЦЕНТР) 

	app.ticker.add( (delta) => {
		matrix.rotation -= 0.01 * delta;
	})

	app.stage.addChild( matrix );
}