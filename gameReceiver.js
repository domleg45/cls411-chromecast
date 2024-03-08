 
// Ajoutez le gestionnaire d'événements au récepteur
const context = cast.framework.CastReceiverContext.getInstance();
context.addEventListener(cast.framework.system.EventType.MESSAGE, messageListener);

messageBus = receiverManager.getCastMessageBus('urn:x-cast:edu.mv.action', cast.receiver.CastMessageBus.MessageType.JSON);

messageBus.onMessage = function(event) {
  var sender = event.senderId;
  var message = event.data;
  var s = document.getElementById("test");
  s.innerHTML = message;
  alert(message);
};