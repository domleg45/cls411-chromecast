import { Application, Assets, Sprite } from 'pixi.js';

const castDebugLogger = cast.debug.CastDebugLogger.getInstance();
const context = cast.framework.CastReceiverContext.getInstance();

const CHANNEL = 'urn:x-cast:testChannel';

let x;
let y;

// Asynchronous IIFE
(async () =>
{
    // Create a PixiJS application.
    const app = new Application();

    // Intialize the application.
    await app.init({ background: '#1099bb', resizeTo: window });
    
    const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
    const bunny = new Sprite(texture);
    app.stage.addChild(bunny);
    bunny.anchor.set(0.5);

    bunny.x = app.screen.width / 2
    bunny.y = app.screen.height / 2 

    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(app.canvas);
})();




context.addCustomMessageListener(CHANNEL, function(customEvent) {
	const elem = document.getElementById("test");
	elem.style.color = 'red';
	const elem2 = document.getElementById("test2");
	elem2.innerHTML  = customEvent.data.msg;
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
	
	