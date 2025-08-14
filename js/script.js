/**************
 * TYPEWRITER *
 **************/
const typeText = "Happy Birthday,  My LOVE ❤️";
const typeTarget = document.getElementById("typewriter");
let ti = 0;
(function typeWriter(){
  if(ti < typeText.length){
    typeTarget.textContent += typeText.charAt(ti++);
    setTimeout(typeWriter, 90);
  }
})();

/*****************
 * BACKGROUND BGM *
 *****************/
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');

// Start immediately (muted) for autoplay compliance
music.volume = 0;       // start silent
music.muted = true;
music.play().catch(()=>{}); // some browsers require user gesture; we'll handle below

// On first user interaction: unmute and fade in
function enableSound(){
  if(music.muted){
    music.muted = false;
    // smooth fade in
    let v = 0;
    const fade = setInterval(()=>{
      v += 0.05;
      music.volume = Math.min(1, v);
      if(v >= 1) clearInterval(fade);
    }, 120);
  }
  window.removeEventListener('click', enableSound);
  window.removeEventListener('scroll', enableSound);
  window.removeEventListener('touchstart', enableSound);
}
window.addEventListener('click', enableSound, {once:false});
window.addEventListener('scroll', enableSound, {once:false});
window.addEventListener('touchstart', enableSound, {once:false});

// Toggle button
musicBtn.addEventListener('click', ()=>{
  if(music.paused){
    music.play().then(()=>{ musicBtn.textContent = "🔊"; });
  }else{
    music.pause(); musicBtn.textContent = "🔇";
  }
});

/***************************
 * SCROLL-IN MEDIA & CAPTION
 ***************************/
const items = document.querySelectorAll('.photo-container');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const el = entry.target;
      const media = el.querySelector('.photo');
      const cap = el.querySelector('.caption');
      media && media.classList.add('show');
      cap && cap.classList.add('show');
      io.unobserve(el);
    }
  });
},{threshold: 0.2, rootMargin: "0px 0px -60px 0px"});
items.forEach(el=>io.observe(el));

/*******************
 * FLOATING HEARTS *
 *******************/
function spawnHeart(){
  const h = document.createElement('div');
  h.className = 'heart';
  h.textContent = Math.random() < 0.2 ? '💖' : '❤️';
  h.style.left = Math.random()*100 + 'vw';
  h.style.fontSize = (Math.random()*18 + 16) + 'px';
  h.style.animationDuration = (Math.random()*3 + 4) + 's';
  document.body.appendChild(h);
  setTimeout(()=>h.remove(), 7000);
}
setInterval(spawnHeart, 500);

/****************
 * PROPOSAL LOGIC
 ****************/
const yesBtn = document.getElementById('yes-btn');
const noBtn  = document.getElementById('no-btn');
const msg    = document.getElementById('proposal-message');
const fwCanvas = document.getElementById('fireworks');
const ctx = fwCanvas.getContext('2d');

function resizeCanvas(){
  fwCanvas.width = fwCanvas.clientWidth;
  fwCanvas.height = fwCanvas.clientHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

yesBtn.addEventListener('click', ()=>{
  msg.textContent = "You just made me the happiest person in the world! 💖. Thank you for saying YES! I want to treat you like the queen you are.You gave me so much of memories I want to create more and more memories and  I love you Putta! Ninu nanige matra I am your Husband No one is supposed to marry you Iam the only one for you.I am right Putta thank you for your Memories and Sorry for what ever i am done to you that's are all my falut nan yake hange madde antha ninige gothu yelli ninna kalkonthini ano bhayadali sycho tara behave madde sorry fokr that and once again HAPPY BIRHDAY MY BEAUTIFUL WIFE ";
  fireworksBurst();
  heartBurst();
});

noBtn.addEventListener('click', ()=>{
  msg.textContent = "No? 😭 Then I'll keep trying until you say YES! (Because I love you that much.)";
});

/****************
 * FIREWORKS FX *
 ****************/
function fireworksBurst(){
  const particles = [];
  const cx = fwCanvas.width/2;
  const cy = fwCanvas.height/2;

  // create colorful particles
  for(let i=0;i<180;i++){
    const ang = Math.random()*Math.PI*2;
    const spd = 2 + Math.random()*4;
    particles.push({
      x: cx, y: cy,
      vx: Math.cos(ang)*spd,
      vy: Math.sin(ang)*spd,
      life: 60 + Math.random()*40,
      color: `hsl(${Math.floor(Math.random()*360)}, 90%, 60%)`
    });
  }

  (function tick(){
    ctx.clearRect(0,0,fwCanvas.width, fwCanvas.height);
    particles.forEach((p,idx)=>{
      p.x += p.vx; p.y += p.vy; p.vy += 0.03; p.life -= 1.2;
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, p.life/100);
      ctx.arc(p.x, p.y, 2.4, 0, Math.PI*2);
      ctx.fill();
      if(p.life <= 0) particles.splice(idx,1);
    });
    ctx.globalAlpha = 1;
    if(particles.length) requestAnimationFrame(tick);
  })();
}

/*****************
 * HEART BURST FX
 *****************/
function heartBurst(){
  // spawn a flurry of hearts quickly
  for(let i=0;i<25;i++){
    setTimeout(spawnHeart, i*50);
  }
}
