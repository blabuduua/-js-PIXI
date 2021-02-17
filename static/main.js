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

	matrix.x = 100;
	matrix.y = 100;

	matrix.anchor.set(0.09);

	app.stage.addChild( matrix );

	let Sprite = PIXI.Sprite;
	let second_matrix = new Sprite( PIXI.Loader.shared.resources['static/images/matrix.png'].texture );

	second_matrix.x = 50;
	second_matrix.y = 50;

	second_matrix.scale.set(1.5);
	second_matrix.anchor.set(0);

	app.ticker.add( (delta) => {
		second_matrix.rotation -= 0.01 * delta;
	})

	app.stage.addChild( second_matrix );
}





// const container = new PIXI.Container();
// app.stage.addChild( container );

// const texture = PIXI.Texture.from('static/images/matrix.png');

// const smile = new PIXI.Sprite( texture );
// smile.anchor.set(0.5);

// container.addChild( smile );

// container.x = app.screen.width / 2;
// container.y = app.screen.height / 2;

// container.pivot.x = container.width / 2;
// container.pivot.y = container.height / 2;


// app.ticker.add( (delta) => {
// 	container.rotation -= 0.01 * delta;
// })