const personName = "name";
const songImage = "./media/image.png";
const songTitle = "cute song";
const artistName = "wish it was sung by you";
const songFile = "./media/song.mp3";
const photoImages = ["imag10.png","imag9.png","imag8.png","imag6.png","imag7.png","imag5.png","imag4.png","imag1.png","imag3.png","imag2.png"];
time_zone="Europe/London";
birthday = new Date(Date.UTC(2025, 11, 27, 0, 0, 0));
age=19;

const confetti_colors=[{r:255, g:191, b:0}, {r:204, g:85, b:0}, {r:248, g:131, b:121}]

document.getElementById("name").textContent = personName;
document.getElementById("cover").src = songImage;
document.getElementById("songTitle").textContent = songTitle;
document.getElementById("artistName").textContent = artistName;

const audio = document.getElementById("audio");
audio.src = songFile;

const playBtn = document.getElementById("playBtn");
document.getElementById("player").addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "❚❚";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
});

function updateCountdown() {
  const now = new Date();

  const nowTime = new Date(
    now.toLocaleString("en-US", { timeZone: time_zone })
  );
  if (nowTime>birthday) {
    document.getElementById("countdown").textContent =
    `YOU ARE `+age+` !!!`;
  } else{
  const diff = birthday - nowTime;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("countdown").textContent =
    `${days}d ${hours}h ${minutes}m ${seconds}s left`;
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

for (let i = 0; i < 40; i++) {
  const s = document.createElement("div");
  s.className = "sparkle";
  s.style.left = Math.random() * 100 + "vw";
  s.style.top = Math.random() * 100 + "vh";
  s.style.animationDelay = Math.random() * 2 + "s";
  document.body.appendChild(s);
}


function createFallingPhoto() {
  const img = document.createElement("img");
  img.src = "./media/dump/"+photoImages[Math.floor(Math.random() * photoImages.length)];
  img.className = "falling-photo";

  img.style.left = Math.random() * 90 + "vw";
  img.style.animationDuration = 10 + Math.random() * 4 + "s";

  document.body.appendChild(img);

  setTimeout(() => {
    img.remove();
  }, 10000);
}

setInterval(createFallingPhoto, 500);


const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
let confetti = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();


function randomColor() {
  const variance = 30;
  
  const BASE_COLOR = confetti_colors[Math.floor(Math.random() * confetti_colors.length)];
  return `rgb(
    ${BASE_COLOR.r + Math.random()*variance - variance/2},
    ${BASE_COLOR.g + Math.random()*variance - variance/2},
    ${BASE_COLOR.b + Math.random()*variance - variance/2}
  )`;
}

function createConfetti() {
  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 50,
      size: Math.random() * 6 + 4,
      color: randomColor(),
      vx: (Math.random() - 0.5) * 3,
      vy: -Math.random() * 10 - 6,
      gravity: 0.3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10
    });
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((c, i) => {
    c.vy += c.gravity;
    c.x += c.vx;
    c.y += c.vy;
    c.rotation += c.rotationSpeed;

    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate(c.rotation * Math.PI / 180);
    ctx.fillStyle = c.color;
    ctx.fillRect(-c.size/2, -c.size/2, c.size, c.size);
    ctx.restore();

    if (c.y > canvas.height + 50) {
      confetti.splice(i, 1);
    }
  });

  requestAnimationFrame(update);
}

document.getElementById("confettiBtn").addEventListener("click", () => {
  createConfetti();
});

update();
