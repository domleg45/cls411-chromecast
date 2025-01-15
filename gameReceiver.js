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
 const textureCadeau = await PIXI.Assets.load('./img/gift.png');
 const textureChampi = await PIXI.Assets.load('./img/champi2.png');
 const backgroundTexture = await PIXI.Assets.load('./img/back.jpg');
 const startTexture = await PIXI.Assets.load('./img/debut.png');
 const tibine2Texture = await PIXI.Assets.load('./img/tibine2.png');
 const gogoTexture = await PIXI.Assets.load('./img/goblest2.png');
 const textureExplosion = await PIXI.Assets.load('https://pixijs.com/assets/spritesheet/mc.json');
 const player = PIXI.Sprite.from(texturePlayer);
 const cadeau = PIXI.Sprite.from(textureCadeau);
 const champi2 = PIXI.Sprite.from(textureChampi);
 const sprite = PIXI.Sprite.from(gogoTexture);

  const background = new PIXI.Sprite(backgroundTexture);
  const startMaison = PIXI.Sprite.from(startTexture);



 function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > 4) { // 5 minutes
        context.stop();
    }
}

function cadeauIsReached() {
    var distance1 = distance(cadeau.x, cadeau.y, player.x, player.y);
    //document.getElementById('distance1').innerHTML = "Distance = " +distance1;
    if (distance1 <= 20) {
      return true;
    }
    return false;
}

function champiIsReached() {
  var distance1 = distance(champi2.x, champi2.y, player.x, player.y);
  if (distance1 <= 20) {
    return true;
  }
  return false;
}

function animate(image) {
    let i;

    // Create an array to store the textures
    const explosionTextures = [];

    for (i = 0; i < 26; i++)
    {
        const texture = PIXI.Texture.from(image);

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


function animateVersDroite() {
  const targetX = 1000;
  const step = 20;
  const interval = 100;
  let elapsedTime = 0;

  app.ticker.add((delta) => {
      elapsedTime += delta * (1000 / 60); // Convertir delta en millisecondes
      if (elapsedTime >= interval) {
          elapsedTime = 0; // Réinitialiser le temps
          if (sprite.x + step < targetX) {
              sprite.x += step; // Déplacement
          } else {
              sprite.x = targetX; // Arrêt
              app.ticker.stop(); // Arrêter le ticker
          }
      }
  });

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
  if (cadeauIsReached()) {
    context.sendCustomMessage(CHANNEL, undefined, "test")
    animate('./img/champi.png');
  }

  if (champiIsReached()) {
    context.sendCustomMessage(CHANNEL, undefined, "test")
    animateVersDroite();
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
 app.stage.addChild(cadeau);
 app.stage.addChild(champi2);
 app.stage.addChild(sprite);

 player.anchor.set(0.5);
 cadeau.anchor.set(0.5);
 champi2.anchor.set(0.5);
 sprite.anchor.set(0.5);

 player.x = app.screen.width / 2;
 player.y = app.screen.height / 2;
 cadeau.x = 400;
 cadeau.y = 300;
 champi2.x = 900;
 champi2.y = 100;
 sprite.x = 0;
 sprite.y = 100;
 startMaison.x = app.screen.width / 2;
 startMaison.y = app.screen.height / 2;


	