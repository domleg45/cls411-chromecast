const messageListener = (event) => {
    const message = event.data;
    if (message.type === 'command') {
      // Gérez un type de message personnalisé
      const customData = message.customData;
      console.log('Message personnalisé reçu :', customData);
      var s = document.getElementById("test");
      s.value = customData;
    }
  };
  
  // Ajoutez le gestionnaire d'événements au récepteur
  const receiverManager = cast.framework.CastReceiverContext.getInstance().getCastReceiverManager();
  receiverManager.addEventListener(cast.framework.system.EventType.MESSAGE, messageListener);