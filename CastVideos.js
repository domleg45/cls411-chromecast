let currentSession;
let currentMediaSession;
let isPlaying = true;
let currentVideoIndex = 0;
let currentVideoUrl;
let updateInterval;
let lastVolumeLevel = 1;
const muteToggle = document.getElementById('muteToggle');
const defaultContentType = 'video/mp4';
const videoList = [
    'https://transfertco.ca/video/DBillPrelude.mp4',
    'https://transfertco.ca/video/DBillSpotted.mp4',
    'https://transfertco.ca/video/usa23_7_02.mp4'
];

document.getElementById('connectButton').addEventListener('click', () => {
    initializeApiOnly();
});

document.getElementById('startBtn').addEventListener('click', () => {
    if (currentSession) {
        if(localStorage.getItem('currentVideoIndexLS')) {
            loadMedia(videoList[localStorage.getItem('currentVideoIndexLS')]);
        } else {
            loadMedia(videoList[currentVideoIndex]);
        }
        
       
    } else {
        alert('Connectez-vous sur chromecast en premier');
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentSession) {
        currentVideoIndex = (currentVideoIndex + 1) % videoList.length;
        localStorage.setItem('currentVideoIndexLS', currentVideoIndex);
        loadMedia(videoList[currentVideoIndex]);
    } else {
        alert('Connectez-vous sur chromecast en premier');
    }
});

document.getElementById('previousBtn').addEventListener('click', () => {
    if (currentSession) {
        currentVideoIndex = (currentVideoIndex - 1) % videoList.length;
        localStorage.setItem('currentVideoIndexLS', currentVideoIndex);
        loadMedia(videoList[currentVideoIndex]);
    } else {
        alert('Connectez-vous sur chromecast en premier');
    }
});

document.getElementById('playBtn').addEventListener('click', () => {
    if (currentMediaSession) {
        if (isPlaying) {
            currentMediaSession.pause(null, onMediaCommandSuccess, onError);
        } else {
            currentMediaSession.play(null, onMediaCommandSuccess, onError);
        }
        isPlaying = !isPlaying;
    }
});


function sessionListener(newSession) {
    currentSession = newSession;
    document.getElementById('startBtn').style.display = 'block';
    document.getElementById('nextBtn').style.display = 'block';
    document.getElementById('previousBtn').style.display = 'block';
}


function initializeMuted(remotePlayerController, remotePlayer, mediaSession) {
    //Ajout listener + boutton
    muteToggle.addEventListener('click', () => {
        if (currentMediaSession.volume.muted) {
            // Unmute
            const volume = new chrome.cast.Volume(lastVolumeLevel, false);
            const volumeRequest = new chrome.cast.media.VolumeRequest(volume);
            currentMediaSession.setVolume(volumeRequest, onMediaCommandSuccess, onError);
        } else {
            
            
            lastVolumeLevel = currentMediaSession.volume.level;
            // Mute
            const volume = new chrome.cast.Volume(0, true);
            const volumeRequest = new chrome.cast.media.VolumeRequest(volume);
            currentMediaSession.setVolume(volumeRequest, onMediaCommandSuccess, onError);
        }
    });
}


function initializeMediaSession(mediaSession) {
    currentMediaSession = mediaSession;
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
    const sessionRequest = new chrome.cast.SessionRequest(chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
    const apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);

    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
}

function loadMedia(videoUrl) {
    currentVideoUrl = videoUrl;
    const mediaInfo = new chrome.cast.media.MediaInfo(videoUrl, defaultContentType);
    const request = new chrome.cast.media.LoadRequest(mediaInfo);

    currentSession.loadMedia(request, mediaSession => {
        console.log('Media chargé avec succès');
        initializeMediaSession(mediaSession);
        initializeMuted(mediaSession);
      }, onError);
}

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}