//Stop watch
let seconds=0;
let minuts=0;
let hours=0;
let interval=null;
let status="stopped";

let display_seconds=0;
let display_minuts=0;
let display_hours=0;

function stopwatch(){
  seconds++;
  if(seconds/60 == 1)
  {
    seconds=0;
    minuts++;
    if(minuts/60 == 1)
    {
      minuts=0;
      hours++;
    }
  }

     if(seconds<10)
     {
      display_seconds="0"+seconds.toString();
     }

     else{
      display_seconds=seconds;
     }
     if(minuts<10)
     {
      display_minuts="0"+minuts.toString();
     }
     else
     {
      display_minuts=minuts;
     }
     if(hours<10)
     {
      display_hours="0"+hours.toString();
     }
     else
     {
      display_hours=hours;
     }
  document.getElementById('display').innerHTML=display_hours+" : "+display_minuts+" : "+display_seconds;

}
function startstop()
{
  if(status === "stopped")
  {
    interval=window.setInterval(stopwatch,1000);//1000ms=1s
    document.getElementById('startstop').innerHTML="Stop";
      status="started";
  }
  else{
      window.clearInterval(interval);
    document.getElementById('startstop').innerHTML="Start";
      status="stopped";
      
  }
}
function reset(){
  seconds=0;
  minuts=0;
  hours=0;
  document.getElementById('display').innerHTML="00 : 00 : 00"
}

//Music player
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Song titles
const songs = ['betterdays', 'deepblue', 'relaxing'];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.png`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) 
  {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate',DurTime);