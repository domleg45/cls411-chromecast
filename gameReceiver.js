// Ajoutez le gestionnaire d'événements au récepteur
cast.framework.CastReceiverContext.getInstance().setLoggerLevel(cast.framework.LoggerLevel.DEBUG);

const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();

const namespace = 'urn:x-cast:com.transfertco.cast1';

playerManager.addEventListener(cast.framework.events.category.CORE,
    event => {
        console.log(event);
		var s = document.getElementById("test");
		s.innerHTML = event.data;
    });

// Start the receiver
context.start();