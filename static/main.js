const app = new PIXI.Application({
	width: 640,
	height: 640,
	backgroundColor: 0x1099bb,
});

document.body.appendChild( app.view );

const container = new PIXI.Container();
app.stage.addChild( container );

const texture = PIXI.Texture.from('static/images/matrix.png');

const smile = new PIXI.Sprite( texture );

container.addChild( smile );