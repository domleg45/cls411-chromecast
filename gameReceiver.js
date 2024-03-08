 
// Ajoutez le gestionnaire d'événements au récepteur
const receiverManager = cast.framework.CastReceiverContext.getInstance().getCastReceiverManager();
receiverManager.addEventListener(cast.framework.system.EventType.MESSAGE, messageListener);

messageBus = receiverManager.getCastMessageBus('edu.mv.action', cast.receiver.CastMessageBus.MessageType.JSON);

messageBus.onMessage = function(event) {
  var sender = event.senderId;
  var message = event.data;
  var s = document.getElementById("test");
  s.value = message;
};