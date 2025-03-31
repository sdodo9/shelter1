document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.querySelector(".menu-btn");
    const menu = document.querySelector(".menu");

    menuBtn.addEventListener("click", function () {
        menu.classList.toggle("active");  // 메뉴 열고 닫기
        if (menu.classList.contains("active")) {
            menuBtn.innerHTML = "&#10005;";  // 메뉴가 열리면 '×' (닫기 버튼)
        } else {
            menuBtn.innerHTML = "&#9776;";  // 메뉴가 닫히면 햄버거 아이콘
        }
    });
});

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    
    // 한 자리 숫자를 두 자리로 만들기
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');

    document.getElementById("clock").textContent = `${hours}:${minutes}`;
}

updateClock(); // 최초 실행
setInterval(updateClock, 1000 * 30);  // 30초마다 업데이트


let currentSongIndex = 0;
const songs = [
  { title: '청록', artist:'이츠',albumName:'CHUNG LOCK',num: '1/5', album: './img/album1.webp', audio: './audio/song1.mp3' },
  { title: 'bunny', artist:'백예린',albumName:'rest', num: '2/5', album: './img/album2.webp', audio: './audio/song2.mp3' },
  { title: 'ひとりごつ', artist:'하치와레',albumName:'치이카와', num: '3/5', album: './img/album3.webp', audio: './audio/song3.mp3' },
  { title: 'Bubble Gum', artist:'NewJeans',albumName:'How sweet', num: '4/5', album: './img/album6.jpg', audio: './audio/song4.mp3' },
  { title: '『未恋』', artist:'チョーキューメイ',albumName:'未恋', num: '5/5', album: './img/album5.jpg', audio: './audio/song5.mp3' },
];

let audio = new Audio(songs[currentSongIndex].audio);
let isPlaying = false;

// ⏩ Next 버튼 기능
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  changeSong();
}

// ⏪ Back 버튼 기능
function backSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  changeSong();
}

// 🎵 노래 변경 시 UI 업데이트
function changeSong() {
  const song = songs[currentSongIndex];
  audio.src = song.audio;
  document.querySelector('.num').textContent = song.num;
  document.querySelector('.album img').src = song.album;
  document.querySelector('.title').textContent = ` ${song.title}`; // 제목 변경
  document.querySelector('.artist').textContent = ` ${song.artist}`;
  document.querySelector('.album-name').textContent = ` ${song.albumName}`;
  document.querySelector('#progress-bar').value = 0;

  if (isPlaying) {
    audio.play();
  }
}

// ▶️⏸️ Play/Pause 버튼 기능
function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
    document.querySelector('.play-pause').textContent = '';
  } else {
    audio.play();
    document.querySelector('.play-pause').textContent = '';
  }
  isPlaying = !isPlaying;
}

// 🎚️ 재생 바(progress bar) 업데이트
audio.addEventListener('timeupdate', function () {
  const progressBar = document.querySelector('#progress-bar');
  let currentTime = audio.currentTime;
  let duration = audio.duration;

  if (!isNaN(duration)) {
    progressBar.value = (currentTime / duration) * 100;
  }
});

// ⏩ 재생 바 클릭으로 시간 이동
document.querySelector('#progress-bar').addEventListener('input', function () {
  let duration = audio.duration;
  let seekTime = (this.value / 100) * duration;
  audio.currentTime = seekTime;
});

function updateBar() {
  const song = songs[currentSongIndex];

  document.querySelector('.num').textContent = song.num; // 트랙 번호
  document.querySelector('.album img').src = song.album; // 앨범 이미지
  document.querySelector('.title').textContent = song.title; // 노래 제목
  document.querySelector('.artist').textContent = song.artist; // 가수 이름
  document.querySelector('.album-name').textContent = song.albumName; // 앨범 이름
}

// 🎵 초기 UI 설정
changeSong();








document.addEventListener("DOMContentLoaded", function () {
    // 각 책 요소 선택
    const books = document.querySelectorAll(".book div");
    const popups = document.querySelectorAll(".popup-overlay");
    const closeButtons = document.querySelectorAll(".close-btn");

    // 책 클릭 시 해당 팝업 띄우기
    books.forEach((book, index) => {
        book.addEventListener("click", () => {
            popups[index].style.display = "flex";
        });
    });

    // 닫기 버튼 클릭 시 팝업 닫기
    closeButtons.forEach((close, index) => {
        close.addEventListener("click", () => {
            popups[index].style.display = "none";
        });
    });

    // 팝업 외부 클릭 시 닫기
    popups.forEach((popup) => {
        popup.addEventListener("click", (e) => {
            if (e.target === popup) {
                popup.style.display = "none";
            }
        });
    });
});
