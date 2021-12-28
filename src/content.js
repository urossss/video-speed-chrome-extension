chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.type) {
        case "getPlaybackRate":
            getPlaybackRate(request, sender, sendResponse);
            break;
        case "setPlaybackRate":
            setPlaybackRate(request, sender, sendResponse);
            break;
    }
});

// callback for when message is received
function getPlaybackRate(request, sender, sendResponse) {
    let video = document.getElementsByTagName("video")[0];

    let response = {};

    if (video != null) {
        response.videoExists = true;
        response.playbackRate = video.playbackRate;
    } else {
        response.videoExists = false;
    }

    sendResponse(response);
}

// callback for when message is received
function setPlaybackRate(request, sender, sendResponse) {
    let video = document.getElementsByTagName("video")[0];

    if (video != null) {
        video.playbackRate = request.playbackRate;
    }
}

console.log('Video Speed Control extension ready to go!');