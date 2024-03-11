  const namespace1 = 'urn:x-cast:com.transfertco.cast1';
  const namespace2 = 'urn:x-cast:com.transfertco.cast2';
  const ctx = cast.framework.CastReceiverContext.getInstance();
  

  
  //receiving sender message
  ctx.addCustomMessageListener(namespace1, function(customEvent) {
	document.getElementById("test").innerHTML = customEvent;
});

	
	
	
	

	const options = new cast.framework.CastReceiverOptions();
	options.customNamespaces = { 'urn:x-cast:com.transfertco.cast1': 'STRING' }

	options.disableIdleTimeout = true;

	ctx.start(options);