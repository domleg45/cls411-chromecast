// Ajoutez le gestionnaire d'événements au récepteur
cast.framework.CastReceiverContext.getInstance().setLoggerLevel(cast.framework.LoggerLevel.DEBUG);

const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();

const namespace = 'urn:x-cast:com.transfertco.cast1';

playerManager.addEventListener(
  cast.framework.events.EventType.ALL, (event) => {
	var message = "test 123";
    console.log(`Received message on namespace ${namespace}:`, message);	
	var s = document.getElementById("test");
	s.innerHTML = message;
   
});


playerManager.setMessageInterceptor(cast.framework.messages.MessageType.CUSTOM, handleChannelOneMessage);

function handleChannelOneMessage(namespace, message) {
    console.log(`Received message on channel one:`, message);
    // Handle channel one messages
    return true;
}



// Start the receiver
context.start();