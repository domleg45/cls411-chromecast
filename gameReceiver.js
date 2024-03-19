const castDebugLogger = cast.debug.CastDebugLogger.getInstance();
const context = cast.framework.CastReceiverContext.getInstance();

const CHANNEL = 'urn:x-cast:testChannel';

 const texturePlayer = await PIXI.Assets.load('./img/seagal.png');
 const textureBurger = await PIXI.Assets.load('./img/burger.png');

 const player = PIXI.Sprite.from(texturePlayer);
 const burger = PIXI.Sprite.from(textureBurger);

context.addCustomMessageListener(CHANNEL, function(customEvent) {
	const pos = customEvent.data.msg.split(',');
	player.x = pos[0];
	player.y = pos[1];
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

function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > 4) { // 5 minutes
        context.stop();
    }
}


// Create a PixiJS application.
 var app = new PIXI.Application({ width: 1080, height: 720, backgroundColor: 0x1099bb });
 document.getElementById('pixi-container').appendChild(app.view);

 app.stage.addChild(player);


 player.anchor.set(0.5);


 player.x = app.screen.width / 2;
 player.y = app.screen.height / 2;	


	