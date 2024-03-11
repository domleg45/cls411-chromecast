const context = cast.framework.CastReceiverContext.getInstance();

const CHANNEL = 'urn:x-cast:testChannel';

//context.addCustomMessageListener(CHANNEL, function(customEvent) {
//   var eventData = customEvent.data;
//    parseCommand(eventData);
//    idleTime = 0;
//});

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
	
	