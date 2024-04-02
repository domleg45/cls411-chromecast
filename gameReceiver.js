const castDebugLogger = cast.debug.CastDebugLogger.getInstance();
const context = cast.framework.CastReceiverContext.getInstance();
var centerX = 150; // Position X du centre
var centerY = 150; // Position Y du centre
var radius = 100; // Rayon du cercle
var angle = 0; // Angle initial
var speed = 2 * Math.PI / 1000; // Vitesse de rotation (une rotation complète toutes les 1000ms)
var startTime = null;


const CHANNEL = 'urn:x-cast:testChannel';

 const texturePlayer = await PIXI.Assets.load('./img/seagal.png');
 const textureBurger = await PIXI.Assets.load('./img/burger.png');

 const player = PIXI.Sprite.from(texturePlayer);
 const burger = PIXI.Sprite.from(textureBurger);

 function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > 4) { // 5 minutes
        context.stop();
    }
}

function burgerIsReached() {
    var distance1 = distance(burger.x, burger.y, player.x, player.y);
    document.getElementById('distance1').innerHTML = "Distance = " +distance1;
    if (distance1 <= 20) {
      return true;
    }
    return false;
}

function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    var progress = timestamp - startTime;
    var newX = centerX + Math.cos(angle) * radius;
    var newY = centerY + Math.sin(angle) * radius;
    player.x = newX;
    player.y = newY;
    angle += speed * progress;
    if (progress < 5000) { // Animation pendant 5 secondes (5000ms)
        requestAnimationFrame(animate);
    }
}



function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

context.addCustomMessageListener(CHANNEL, function(customEvent) {
	const pos = customEvent.data.msg.split(',');
	player.x = pos[0];
	player.y = pos[1];
  if (burgerIsReached()) {
    requestAnimationFrame(animate);
    context.sendCustomMessage(CHANNEL, undefined, "test")
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
 var app = new PIXI.Application({ width: 1080, height: 720, backgroundColor: 0x1099bb });
 document.getElementById('pixi-container').appendChild(app.view);

 app.stage.addChild(player);
 app.stage.addChild(burger);


 player.anchor.set(0.5);
 burger.anchor.set(0.5);


 player.x = app.screen.width / 2;
 player.y = app.screen.height / 2;	
 burger.x = 50;
 burger.y = 100;	


	