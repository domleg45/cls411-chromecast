  const namespace = 'urn:x-cast:com.transfertco.cast1';
  const ctx = cast.framework.CastReceiverContext.getInstance();
  const options = new cast.framework.CastReceiverOptions();
  const objToSender = 
  {
    type: 'status',
    message: 'Playing'
  };

  options.customNamespaces = Object.assign({});
  options.customNamespaces[namespace] = cast.framework.system.MessageType.JSON;

  //receiving sender message
  ctx.addCustomMessageListener(namespace,  
	customEvent => 
		document.getElementById("test").innerHTML = customEvent.data.msg);

  //message to sender app
  ctx.sendCustomMessage(namespace, objToSender);

  ctx.start(options);