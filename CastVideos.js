let session;
let media;
let isPlaying = true;
let currentVideoIndex = 0;
let currentVideoUrl;
const defaultContentType = 'video/mp4';
const applicationID = '3DDC41A0';
const videoList = [
    'https://transfertco.ca/video/DBillPrelude.mp4',
    'https://transfertco.ca/video/DBillSpotted.mp4',
    'https://transfertco.ca/video/usa23_7_02.mp4'
    // Add more video URLs as needed
];

document.getElementById('connectButton').addEventListener('click', () => {
    initializeApiOnly();
});

document.getElementById('startBtn').addEventListener('click', () => {
    if (session) {
        loadMedia(videoList[currentVideoIndex]);
    } else {
        alert('Connectez-vous sur chromecast en premier');
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (session) {
        currentVideoIndex = (currentVideoIndex + 1) % videoList.length;
        loadMedia(videoList[currentVideoIndex]);
    } else {
        alert('Connectez-vous sur chromecast en premier');
    }
});

document.getElementById('playBtn').addEventListener('click', () => {
    if (media) {
        if (isPlaying) {
            media.pause(null, onMediaCommandSuccess, onError);
        } else {
            media.play(null, onMediaCommandSuccess, onError);
        }
        isPlaying = !isPlaying;
    }
});


function sessionListener(newSession) {
    session = newSession;
    document.getElementById('startBtn').style.display = 'block';
    document.getElementById('nextBtn').style.display = 'block';
}



function onMediaDiscovered(mediaItem) {
    media = mediaItem;
    document.getElementById('playBtn').style.display = 'block';
}

function receiverListener(availability) {
    if (availability === chrome.cast.ReceiverAvailability.AVAILABLE) {
        document.getElementById('connectButton').style.display = 'block';
    } else {
        document.getElementById('connectButton').style.display = 'none';
    }
}

function onInitSuccess() {
    console.log('Chromecast init success');
}

function onError(error) {
    console.error('Chromecast initialization error', error);
}

function onMediaCommandSuccess() {
    console.log('Media command success');
}

function initializeApiOnly() {
    
    const sessionRequest = new chrome.cast.SessionRequest(applicationID);
    const apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);

    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
    initializeCastApi();
}

function loadMedia(videoUrl) {
    currentVideoUrl = videoUrl;
    const mediaInfo = new chrome.cast.media.MediaInfo(videoUrl, defaultContentType);
    const request = new chrome.cast.media.LoadRequest(mediaInfo);

    session.loadMedia(request, onMediaDiscovered, onError);
}

// Fonction pour mettre à jour le curseur de temps
function updateSeekSlider() {
    var timeSlider = document.getElementById('timeSlider');
    var remotePlayer = new cast.framework.RemotePlayer();
    var position = remotePlayer.currentTime;
    var duration = remotePlayer.duration;

    // Mettez à jour la position du curseur de recherche en fonction de la position actuelle et de la durée totale
    if (duration > 0) {
        timeSlider.value = (position / duration) * 100;
    } else {
        timeSlider.value = 0;
    }
}

function seekTimeMedia() {
    var timeSlider = document.getElementById('timeSlider');
    var seekValue = parseFloat(timeSlider.value);

    var remotePlayer = new cast.framework.RemotePlayer();
    var remotePlayerController = new cast.framework.RemotePlayerController(remotePlayer);

    var position = (seekValue / 100) * remotePlayer.duration;

    // Utilisez le contrôleur pour rechercher à la position spécifiée
    remotePlayerController.seek(position);
}


// Function to initialize the Cast SDK
function initializeCastApi() {

    // Set up Cast SDK options
    const castOptions = new cast.framework.CastOptions();
    castOptions.receiverApplicationId = applicationID;

    // Initialize CastContext with the CastOptions
    const castContext = cast.framework.CastContext.getInstance();
    castContext.setOptions(castOptions);

    var remotePlayer = new cast.framework.RemotePlayer();
    var remotePlayerController = new cast.framework.RemotePlayerController(remotePlayer);
    
    // Ajouter les évéments ici pour le curseur par exemple.
    remotePlayerController.addEventListener(
        cast.framework.RemotePlayerEventType.IS_PAUSED_CHANGED,
        function(event) {
          if (!event.value) {
            updateSeekSlider();
          }
        }
      );

      remotePlayerController.addEventListener(
        cast.framework.RemotePlayerEventType.CURRENT_TIME_CHANGED,
        function(event) {
          if (!event.value) {
            updateSeekSlider();
          }
        }
      );      
}
