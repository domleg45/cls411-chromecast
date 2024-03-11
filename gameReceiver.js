  const CHANNEL = 'urn:x-cast:com.transfertco.cast1';
  const ctx = cast.framework.CastReceiverContext.getInstance();

	const options = new cast.framework.CastReceiverOptions();
	options.customNamespaces = { CHANNEL: 'STRING' }

	options.disableIdleTimeout = true;

    ctx.addCustomMessageListener(CHANNEL, function(customEvent) {
	  //document.getElementById("test").innerHTML = customEvent;
    });

	ctx.start(options);
	
	