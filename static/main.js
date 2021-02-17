const app = new PIXI.Application({
	width: 740,
	height: 640,
	backgroundColor: 0x1099bb,
});

document.body.appendChild( app.view );

const container = new PIXI.Container();
app.stage.addChild( container );

const texture = PIXI.Texture.from('static/images/matrix.png');

const smile = new PIXI.Sprite( texture );
smile.anchor.set(-0.2);

container.addChild( smile );