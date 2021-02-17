const app = new PIXI.Application({
	width: 720,
	height: 750,
	backgroundColor: 0x1099bb,
});

document.body.appendChild( app.view );

PIXI.Loader.shared
	.add("static/images/atlas.json")
	.load( setup )

function setup() {
	let id = PIXI.Loader.shared.resources["static/images/atlas.json"].textures;

	console.log(id)

	let sprite = new PIXI.Sprite( id["uia_logo_w.png"] );

	app.stage.addChild( sprite );
}