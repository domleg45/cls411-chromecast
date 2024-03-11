const castDebugLogger = cast.debug.CastDebugLogger.getInstance();
const context = cast.framework.CastReceiverContext.getInstance();

const CHANNEL = 'urn:x-cast:testChannel';

//context.addCustomMessageListener(CHANNEL, function(customEvent) {
//   var eventData = customEvent.data;
//    parseCommand(eventData);
//    idleTime = 0;
//});

context.addEventListener(cast.framework.system.EventType.READY, () => {
  if (!castDebugLogger.debugOverlayElement_) {
      // Enable debug logger and show a 'DEBUG MODE' overlay at top left corner.
      castDebugLogger.setEnabled(true);
  }
});

const options = new cast.framework.CastReceiverOptions();

options.disableIdleTimeout = true;

context.start(options);

var idleInterval = setInterval(timerIncrement, 60000); // 1 minute

function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > 4) { // 5 minutes
        context.stop();
    }
}
	
	