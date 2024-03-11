  const namespace1 = 'urn:x-cast:com.transfertco.cast1';
  const namespace2 = 'urn:x-cast:com.transfertco.cast2';
  const ctx = cast.framework.CastReceiverContext.getInstance();
  

  


	
	
	
	

	const options = new cast.framework.CastReceiverOptions();
	options.customNamespaces = { 'urn:x-cast:com.transfertco.cast1': 'STRING' }

	options.disableIdleTimeout = true;

  //receiving sender message
  //ctx.addCustomMessageListener('urn:x-cast:com.transfertco.cast1', function(customEvent) {
	//document.getElementById("test").innerHTML = customEvent;
//});

	ctx.start(options);
	
	