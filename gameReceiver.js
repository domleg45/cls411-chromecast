  const CHANNEL = 'urn:x-cast:testChannel';
  const ctx = cast.framework.CastReceiverContext.getInstance();

	const options = new cast.framework.CastReceiverOptions();
	options.customNamespaces = Object.assign({});
	options.customNamespaces[CHANNEL] = cast.framework.system.MessageType.JSON;

	options.disableIdleTimeout = true;

    ctx.addCustomMessageListener(CHANNEL, customEvent =>
	  //document.getElementById("test").innerHTML = customEvent;
    );

	ctx.start(options);
	
	