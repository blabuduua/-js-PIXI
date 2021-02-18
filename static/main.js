let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.Loader.shared,
    resources = PIXI.Loader.shared.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle;

//Create a Pixi Application
let app = new Application({ 
    width: 512, 
    height: 512,                       
    antialias: true, 
    transparent: false, 
    resolution: 1.7
  }
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

//load a JSON file and run the `setup` function when it's done
loader
  .add("grif", "static/images/grif.json")
  .load(setup);

//Define variables that might be used in more 
//than one function
let dungeon, explorer, treasure, door, id, state;

function setup() {

    //Capture the keyboard arrow keys
  let left = keyboard("ArrowLeft"),
      up = keyboard("ArrowUp"),
      right = keyboard("ArrowRight"),
      down = keyboard("ArrowDown");

  //There are 3 ways to make sprites from textures atlas frames

  //1. Access the `TextureCache` directly
  let dungeonTexture = TextureCache["dungeon.png"];
  dungeon = new Sprite(dungeonTexture);
  app.stage.addChild(dungeon);

  //2. Access the texture using throuhg the loader's `resources`:
  explorer = new Sprite(
    resources.grif.textures["explorer.png"]
  );
  explorer.x = 68;
  explorer.vx = 0;
  explorer.vy = 0;
  explorer.scale.set(0.1, 0.1);

  //Center the explorer vertically
  explorer.y = app.stage.height / 2 - explorer.height / 2;
  app.stage.addChild(explorer);

  //Left arrow key `press` method
  left.press = () => {
    //Change the cat's velocity when the key is pressed
    explorer.vx = -5;
    explorer.vy = 0;
  };
  
  //Left arrow key `release` method
  left.release = () => {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the cat isn't moving vertically:
    //Stop the cat
    if (!right.isDown && explorer.vy === 0) {
      explorer.vx = 0;
    }
  };

  //Up
  up.press = () => {
    explorer.vy = -5;
    explorer.vx = 0;
  };
  up.release = () => {
    if (!down.isDown && explorer.vx === 0) {
      explorer.vy = 0;
    }
  };

  //Right
  right.press = () => {
    explorer.vx = 5;
    explorer.vy = 0;
  };
  right.release = () => {
    if (!left.isDown && explorer.vy === 0) {
      explorer.vx = 0;
    }
  };

  //Down
  down.press = () => {
    explorer.vy = 5;
    explorer.vx = 0;
  };
  down.release = () => {
    if (!up.isDown && explorer.vx === 0) {
      explorer.vy = 0;
    }
  };

  //3. Create an optional alias called `id` for all the texture atlas 
  //frame id textures.
  id = resources.grif.textures; 
  
  //Make the treasure box using the alias
  treasure = new Sprite(id["treasure.png"]);
  treasure.scale.set(0.2, 0.2);
  app.stage.addChild(treasure);

  //Position the treasure next to the right edge of the canvas
  treasure.x = app.stage.width - treasure.width - 48;
  treasure.y = app.stage.height / 2 - treasure.height / 2;
  app.stage.addChild(treasure);

  //Make the exit door
  door = new Sprite(id["door.png"]); 
  door.position.set(32, 0);
  door.scale.set(0.2, 0.2);
  app.stage.addChild(door);

  //Make the blobs
  let numberOfBlobs = 12,
      spacing = 50,
      xOffset = 0;

  //Make as many blobs as there are `numberOfBlobs`
  for (let i = 0; i < numberOfBlobs; i++) {

    //Make a blob
    let blob = new Sprite(id["blob.png"]);

    //Space each blob horizontally according to the `spacing` value.
    //`xOffset` determines the point from the left of the screen
    //at which the first blob should be added.
    let x = spacing * i + xOffset;

    //Give the blob a random y position
    //(`randomInt` is a custom function - see below)
    let y = randomInt(0, app.stage.height - blob.height);

    //Set the blob's position
    blob.x = x;
    blob.y = y+randomInt(0, 512);

    blob.scale.set(0.1, 0.1);

    //Add the blob sprite to the stage
    app.stage.addChild(blob);
  }

  //Set the game state
  state = play;
 
  //Start the game loop 
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){

  //Update the current game state:
  state(delta);
}

function play(delta) {

  //Use the cat's velocity to make it move
  explorer.x += explorer.vx;
  explorer.y += explorer.vy
}

//The `randomInt` helper function
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function keyboard(value) {
  let key = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
    if (event.key === key.value) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  //The `upHandler`
  key.upHandler = event => {
    if (event.key === key.value) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  //Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);
  
  window.addEventListener(
    "keydown", downListener, false
  );
  window.addEventListener(
    "keyup", upListener, false
  );
  
  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener("keydown", downListener);
    window.removeEventListener("keyup", upListener);
  };
  
  return key;
}