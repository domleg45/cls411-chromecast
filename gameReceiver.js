// Ajoutez le gestionnaire d'événements au récepteur
cast.framework.CastReceiverContext.getInstance().setLoggerLevel(cast.framework.LoggerLevel.DEBUG);

const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();

const namespace = 'urn:x-cast:com.transfertco.cast';

playerManager.addEventListener(
  cast.framework.events.EventType.ALL, (event) => {
	var message = "test 123";
    console.log(`Received message on namespace ${namespace}:`, message);	
	var s = document.getElementById("test");
	s.innerHTML = message;
   
});

// Start the receiver
context.start();