// Ajoutez le gestionnaire d'événements au récepteur
  cast.framework.CastReceiverContext.getInstance().setLoggerLevel(cast.framework.LoggerLevel.DEBUG);

  const context = cast.framework.CastReceiverContext.getInstance();
  const playerManager = context.getPlayerManager();

  const namespace = 'urn:x-cast:com.transfertco.cast';

  playerManager.setMessageInterceptor(namespace, handleMessage);

  function handleMessage(namespace, message) {
    console.log(`Received message on namespace ${namespace}:`, message);
	
	var s = document.getElementById("test");
	s.innerHTML = message;
    // You can send a response back if needed
    // playerManager.sendCustomMessage(namespace, { response: 'Received your message!' });
    return true;
  }

  // Start the receiver
  context.start();