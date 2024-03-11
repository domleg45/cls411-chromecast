// Ajoutez le gestionnaire d'événements au récepteur
cast.framework.CastReceiverContext.getInstance().setLoggerLevel(cast.framework.LoggerLevel.DEBUG);

const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();

const namespace = 'urn:x-cast:com.transfertco.cast1';
const namespace = 'urn:x-cast:com.transfertco.cast2';

playerManager.addEventListener(
  cast.framework.events.EventType.ALL, (event) => {
	var message = "test 123";
    console.log(`Received message on namespace ${namespace}:`, message);	
	var s = document.getElementById("test");
	s.innerHTML = message;
   
});


  playerManager.setMessageInterceptor(CHANNEL_ONE_NAMESPACE, handleChannelOneMessage);
  playerManager.setMessageInterceptor(CHANNEL_TWO_NAMESPACE, handleChannelTwoMessage);

  function handleChannelOneMessage(namespace, message) {
    console.log(`Received message on channel one:`, message);
    // Handle channel one messages
    return true;
  }

  function handleChannelTwoMessage(namespace, message) {
    console.log(`Received message on channel two:`, message);
    // Handle channel two messages
    return true;
  }

// Start the receiver
context.start();