const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const Dstatus=document.querySelector("#btnD");
const Lstatus=document.querySelector("#btnL");

// Music
const songs = [
  {
    name: 'Big Dawgs - (Raag.fm)',
    displayName: 'Bigdawgs',
    artist: 'Hanumankind/Jacinto Design',
  },
  {
    name: 'Preme pora baron',
    displayName: 'Preme pora baron',
    artist: 'Lagnajita',
  },
  {
    name: 'Dil Ibaadat',
    displayName: 'Dil Ibaadat',
    artist: 'KK ',
  },
  {
    name: 'Kun Faya Kun',
    displayName: 'Kun Faya Kun',
    artist: 'A.R.Rahman, Mohit Chauhan, Javed Ali',
  },
  {
    name: 'Aayi ni',
    displayName: 'Aayi ni',
    artist: 'Pawan Singh',
  },
  {
    name: 'Tu Hai kahan',
    displayName: 'Tu Hai kahan',
    artist: 'A.R.Rahman, Mohit Chauhan, Javed Ali',
  },
];

//check if song is downloaded 
Dstatus.addEventListener("click",function(){
  Dstatus.innerHTML="Downloaded";
  Dstatus.style.backgroundColor = "green" ;
})


//check if  song is liked 
Lstatus.addEventListener("click",function(){
  Lstatus.innerHTML="Liked" 
  Lstatus.style.backgroundColor = "green" ;
})

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);