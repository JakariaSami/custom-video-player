// Getting the elements 
var player = document.querySelector('.player');
var video = player.querySelector('.video');
var progress = player.querySelector('.progress');
var progressBar = player.querySelector('.progress-filled');
var playBtn = player.querySelector('.playBtn');
var range = player.querySelectorAll('.slider');
var skipBtn = player.querySelectorAll('[data-skip]');

// Functions
function togglePlay() {
    if(video.paused){
        video.play()
    } else {
        video.pause()
    }
}

function updateBtn() {
    var icon;
    if(video.paused) {
        icon = '▶'
    }else {
        icon = '❚❚'
    }
    playBtn.textContent = icon;
}

function skip() {
    var amount = this.dataset.skip;
    video.currentTime += parseInt(amount);
}

function rangeUpdate() {
    video[this.name] = this.value
}

function progressBarUpdate() {
    var updateRate = video.currentTime / video.duration ;
    progressBar.style.width = updateRate * 100 + '%'
}

function scrub(e) {
    var scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
// EventListeners
video.addEventListener('click', togglePlay);
playBtn.addEventListener('click', togglePlay);
video.addEventListener('play', updateBtn);
video.addEventListener('pause', updateBtn);

skipBtn.forEach( btn => btn.addEventListener('click', skip));
range.forEach( e => e.addEventListener('change', rangeUpdate))
video.addEventListener('timeupdate' , progressBarUpdate)

let mouseDown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);


// Pause(spacebar), skip(A / D) with keyboard
window.addEventListener('keyup', (e) => {
    if(e.keyCode === 65) {
        video.currentTime -= 10;
    }
     else if(e.keyCode === 68) {
        video.currentTime += 10
    }
     else if(video.paused && e.keyCode === 32) {
        video.play()
    }
     else if(!video.paused && e.keyCode === 32) {
        video.pause()
    }
})

