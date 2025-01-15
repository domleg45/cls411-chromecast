const castDebugLogger = cast.debug.CastDebugLogger.getInstance();
const context = cast.framework.CastReceiverContext.getInstance();
var centerX = 150; // Position X du centre
var centerY = 150; // Position Y du centre
var radius = 100; // Rayon du cercle
var angle = 0; // Angle initial
var speed = 2 * Math.PI / 1000; // Vitesse de rotation (une rotation complète toutes les 1000ms)
var startTime = null;


const CHANNEL = 'urn:x-cast:testChannel';

 const texturePlayer = await PIXI.Assets.load('./img/tibine.png');
 const textureBurger = await PIXI.Assets.load('./img/gift.png');
 const backgroundTexture = await PIXI.Assets.load('./img/back.jpg');
 const startTexture = await PIXI.Assets.load('./img/debut.png');
 const textureExplosion = await PIXI.Assets.load('https://pixijs.com/assets/spritesheet/mc.json');
 const player = PIXI.Sprite.from(texturePlayer);
 const burger = PIXI.Sprite.from(textureBurger);


  const background = new PIXI.Sprite(backgroundTexture);
  const startMaison = PIXI.Sprite.from(startTexture);

  // opacité
  burger.blendMode = PIXI.BLEND_MODES.ADD;
  burger.alpha = 0.7;


 function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > 4) { // 5 minutes
        context.stop();
    }
}

function burgerIsReached() {
    var distance1 = distance(burger.x, burger.y, player.x, player.y);
    //document.getElementById('distance1').innerHTML = "Distance = " +distance1;
    if (distance1 <= 20) {
      return true;
    }
    return false;
}

function animate() {
    let i;

    // Create an array to store the textures
    const explosionTextures = [];

    for (i = 0; i < 26; i++)
    {
        const texture = PIXI.Texture.from(`./img/champi.png`);

        explosionTextures.push(texture);
    }

    for (i = 0; i < 50; i++)
    {
        // Create an explosion AnimatedSprite
        const explosion = new PIXI.AnimatedSprite(explosionTextures);

        explosion.x = Math.random() * app.screen.width;
        explosion.y = Math.random() * app.screen.height;
        explosion.anchor.set(0.5);
        explosion.rotation = Math.random() * Math.PI;
        explosion.scale.set(0.75 + Math.random() * 0.5);
        explosion.gotoAndPlay((Math.random() * 26) | 0);
        app.stage.addChild(explosion);

        setTimeout(() => {
          if (app.stage) { // Vérifie si l'élément est toujours dans la scène
              app.stage.removeChild(explosion);
          }
        }, 3000);

    }

}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

context.addCustomMessageListener(CHANNEL, function(customEvent) {

	const pos = customEvent.data.msg.split(',');
	player.x = pos[0];
	player.y = pos[1];
  //document.getElementById('distance1').innerHTML = player.x;
  //document.getElementById('distance2').innerHTML = player.y;
  if (burgerIsReached()) {
    context.sendCustomMessage(CHANNEL, undefined, "test")
    animate();
  }
  idleTime = 0;
	
});

context.addEventListener(cast.framework.system.EventType.READY, () => {
  if (!castDebugLogger.debugOverlayElement_) {
      // Enable debug logger and show a 'DEBUG MODE' overlay at top left corner.
      castDebugLogger.setEnabled(true);
      // Show debug overlay
      castDebugLogger.showDebugLogs(true);
      // Clear log messages on debug overlay
      castDebugLogger.clearDebugLogs();
  }
});

castDebugLogger.loggerLevelByEvents = {
  'cast.framework.events.category.CORE': cast.framework.LoggerLevel.INFO,
  'cast.framework.events.EventType.MEDIA_STATUS': cast.framework.LoggerLevel.DEBUG
}

const options = new cast.framework.CastReceiverOptions();

options.customNamespaces = Object.assign({});
options.customNamespaces[CHANNEL] = cast.framework.system.MessageType.JSON;
options.disableIdleTimeout = true;

context.start(options);

var idleInterval = setInterval(timerIncrement, 60000); // 1 minute

// Create a PixiJS application.
 var app = new PIXI.Application({ width: 1080, height: 720, backgroundColor: 0x222222 });
 document.getElementById('pixi-container').appendChild(app.view);

 // Resize the background to fit the app dimensions
 background.width = app.screen.width;
 background.height = app.screen.height;

 // Add the background to the stage
 app.stage.addChild(background);

 app.stage.addChild(startMaison);
 app.stage.addChild(player);
 app.stage.addChild(burger);

 player.anchor.set(0.5);
 burger.anchor.set(0.5);
 

 player.x = app.screen.width / 2;
 player.y = app.screen.height / 2;
 burger.x = 400;
 burger.y = 300;
 startMaison.x = app.screen.width / 2;
 startMaison.y = app.screen.height / 2;


	