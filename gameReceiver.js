// Ajoutez le gestionnaire d'événements au récepteur
cast.framework.CastReceiverContext.getInstance().setLoggerLevel(cast.framework.LoggerLevel.DEBUG);

const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();

const namespace = 'urn:x-cast:com.transfertco.cast1';

castSession.addMessageListener(namespace, (namespace, message) => {
  console.log(namespace, message);
});

// Start the receiver
context.start();