let Application = PIXI.Application,
    loader = PIXI.Loader.shared,
    resources = PIXI.Loader.shared.resources,
    Sprite = PIXI.Sprite;

let app = new Application({
	width: 720,
	height: 750,
	backgroundColor: 0x1099bb,
});

document.body.appendChild( app.view );

loader
    .add("atlas", "static/images/atlas.json")
    .use((resource, next) =>
    {
        // Be sure to call next() when you have completed your middleware work.
        next();
    })
    .load((loader, resources) => {
		let id = resources.atlas.textures;

		let sprite = new Sprite( id["uia_logo_w.png"] );

		app.stage.addChild( sprite );
    });

// Throughout the process multiple signals can be dispatched.
loader.onStart.add(() => {console.log("onStart");}); // Called when a resource starts loading.
loader.onError.add(() => {console.log("onError");}); // Called when a resource fails to load.
loader.onLoad.add(() => {console.log("onLoad");}); // Called when a resource successfully loads.
loader.onProgress.add((loader, resource) => {
	console.log("onProgress: " + resource.url); 
	console.log("loading: " + resource.url); 
	console.log("progress: " + loader.progress + "%"); 
}); // Called when a resource finishes loading (success or fail).
loader.onComplete.add(() => {console.log("onComplete");}); // Called when all resources have finished loading.