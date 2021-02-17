const app = new PIXI.Application({
	width: 720,
	height: 750,
	backgroundColor: 0x1099bb,
});

document.body.appendChild( app.view );

PIXI.Loader.shared
	.add("static/images/sprite.png")
	.load( setup )

function setup() {
	let texture = PIXI.utils.TextureCache["static/images/sprite.png"];
	let rectangle = new PIXI.Rectangle(0, 0, 360, 750);

	texture.frame = rectangle;

	let target = new PIXI.Sprite( texture );

	app.stage.addChild( target );
}