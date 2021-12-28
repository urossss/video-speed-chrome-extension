let playbackRate = 1;

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: "getPlaybackRate" }, function (response) {
        if (!response) {
            return;
        }

        if (response.videoExists) {
            document.getElementById("video-not-found-div").style.display = "none";
            document.getElementById("video-found-div").style.display = "block";
            document.getElementById("video-speed").value = response.playbackRate;
            playbackRate = roundToTwoDecimals(response.playbackRate);
        } else {
            document.getElementById("video-not-found-div").style.display = "block";
            document.getElementById("video-found-div").style.display = "none";
        }
    });
});

function roundToTwoDecimals(num) {
    return Math.round(num * 100) / 100;
}

function increasePlaybackRate() {
    applyNewPlaybackRate(playbackRate + 0.1);
}

function decreasePlaybackRate() {
    if (playbackRate <= 0.1) {
        return;
    }

    applyNewPlaybackRate(playbackRate - 0.1);
}

function setPlaybackRate() {
    if (playbackRate <= 0.1) {
        return;
    }

    let newPlaybackRate = document.getElementById("video-speed").value;
    if (isNaN(newPlaybackRate)) {
        return;
    }

    applyNewPlaybackRate(newPlaybackRate);
}

function applyNewPlaybackRate(newPlaybackRate) {
    playbackRate = roundToTwoDecimals(newPlaybackRate);
    document.getElementById("video-speed").value = playbackRate;

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "setPlaybackRate", playbackRate: playbackRate });
    });
}

increaseButton.addEventListener("click", increasePlaybackRate);
decreaseButton.addEventListener("click", decreasePlaybackRate);
videoSpeedForm.addEventListener("submit", setPlaybackRate);