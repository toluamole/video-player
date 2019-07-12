const body = document.querySelector('.body');
const player = document.querySelector('.player')
const video = player.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled')
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const player__slider = document.querySelectorAll('.player__slider');
const ranges = document.querySelectorAll('[type = range]');
const fullScreen = document.querySelector('.fullscreen');
let mousedown = false;

function togglePlay() {
 const method = video.paused ? video.play() : video.pause();
}

function pressToPlay(event){
 if(event.keyCode === 32) {
   const method = video.paused ? video.play() : video.pause();
 }
}

function pressToSkip(event){
  const skipVideo = parseFloat(this.dataset.skip);
  if(event.keyCode === 37){
    video.currentTime -= skipVideo
  }else {
    if (event.keyCode === 39) {
      video.currentTime += skipVideo
    }
  }
}

function updateButton(){
  const icon = video.paused ? '►' : '❚❚';
  toggle.textContent = icon;
}

function skip(){
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
  video[this.name] = this.value;
}

function handleProgress(){
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function fullVideo() {
  if(window.fullScreen){
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
    else if (document.msExitFullScreen) document.msExitFullScreen();
  }
  else {
    if (video.requestFullscreen) video.requestFullscreen();
    else if (video.mozRequestFullScreen) video.mozRequestFullScreen();
    else if (video.webkitRequestFullScreen) video.webkitRequestFullScreen();
    else if (video.msRquestFullscreen) video.msRquestFullscreen()
  }

}


body.addEventListener('keydown', pressToPlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
skipButtons.forEach(button => button.addEventListener('click', skip));
skipButtons.forEach(button => button.addEventListener('keydown', pressToSkip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
fullScreen.addEventListener('click', fullVideo);
