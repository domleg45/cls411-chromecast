  const namespace1 = 'urn:x-cast:com.transfertco.cast1';
  const namespace2 = 'urn:x-cast:com.transfertco.cast2';
  const ctx = cast.framework.CastReceiverContext.getInstance();
  

  
  //receiving sender message
 //ctx.addCustomMessageListener(namespace1,  
//	customEvent => 
//		document.getElementById("test").innerHTML = customEvent.data.msg);

	const options = new cast.framework.CastReceiverOptions();
	//options.customNamespaces = {
	//	namespace1: cast.framework.system.MessageType.JSON
	//};

	options.disableIdleTimeout = true;

	ctx.start(options);