// Ajoutez le gestionnaire d'événements au récepteur
const context = cast.framework.CastReceiverContext.getInstance();


messageBus = receiverManager.getCastMessageBus(namespace, function(customEvent) {
	if(customEvent.data.type == "message"){
		  var sender = customEvent.senderId;
		  var message = customEvent.data.value;
		  var s = document.getElementById("test");
		  s.innerHTML = message;
		  alert(message);		
	}
};

context.addCustomMessageListener('urn:x-cast:com.transfertco.cast', cast.framework.system.EventType.MESSAGE, messageListener);
context.start();