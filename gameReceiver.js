 
// Ajoutez le gestionnaire d'événements au récepteur
const context = cast.framework.CastReceiverContext.getInstance();
context.addCustomMessageListener('urn:x-cast:mvlab', cast.framework.system.EventType.MESSAGE, messageListener);

messageBus = receiverManager.getCastMessageBus('urn:x-cast:mvlab', function(customEvent) {
	if(customEvent.data.type == "message"){
		  var sender = customEvent.senderId;
		  var message = customEvent.data.value;
		  var s = document.getElementById("test");
		  s.innerHTML = message;
		  alert(message);		
	}
};


context.start();