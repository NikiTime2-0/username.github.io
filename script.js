// --------------------
// Interaktive Steps
// --------------------
const steps = {
  start: {
    text: "Hey… hast du Lust, heute etwas zu unternehmen? 😎",
    buttons: [
      { text: "Ja klar! 😄", next: "ideen", effect: "hearts" },
      { text: "Vielleicht später 🤔", next: "wiederholen1" }
    ]
  },
  wiederholen1: {
    text: "Oh, wähle nochmal 😏",
    buttons: [
      { text: "Okay, jetzt ja 😎", next: "ideen", effect: "hearts" },
      { text: "Nö 😅", next: "restart" }
    ]
  },
  restart: {
    text: "Du bist hartnäckig 😏, wir fangen nochmal von vorne an!",
    buttons: [
      { text: "Neustart 🔄", next: "start" }
    ]
  },
  ideen: {
    text: "Was machen wir zuerst?",
    buttons: [
      { text: "Burger essen 🍔", next: "burger", effect: "burger" },
      { text: "Kuscheln 🫂", next: "kuscheln", effect: "hearts" }
    ]
  },
  burger: {
    text: "Lecker 😋! Danach noch ein Spaziergang?",
    buttons: [
      { text: "Ja 🚶‍♂️", next: "spaziergang", effect: "stars" },
      { text: "Nein 🎮", next: "spiel" }
    ]
  },
  kuscheln: {
    text: "Aww 🥰 Kuscheln ist toll! Danach Lust auf Spaziergang?",
    buttons: [
      { text: "Ja 😄", next: "spaziergang", effect: "stars" },
      { text: "Lieber spielen 🎮", next: "spiel" }
    ]
  },
  spiel: {
    text: "Haha 😜, kleines Fun-Moment!",
    buttons: [
      { text: "Du denkst an mich? ❤️", next: "lieblingsmoment", effect: "hearts" },
      { text: "Hmm… ein Geheimnis 🤫", next: "lieblingsmoment", effect: "stars" }
    ]
  },
  spaziergang: {
    text: "Schön spazieren zu gehen… Das war mein Lieblingsmoment heute 🥰",
    buttons: [
      { text: "Aww 💕", next: "ende" },
      { text: "Haha 😎", next: "ende" }
    ]
  },
  lieblingsmoment: {
    text: "Richtig geraten! 🥰 Lieblingsmoment!",
    buttons: [
      { text: "Aww 💕", next: "ende" },
      { text: "Haha 😎", next: "ende" }
    ]
  },
  ende: {
    text: "Danke, dass du mitgemacht hast! Du bist besonders 💌",
    buttons: [
      { text: "Nochmal 🔄", next: "start" }
    ]
  }
};

let currentStep = "start";

// --------- Sounds ----------
const clickSound = document.getElementById("clickSound");
const emojiSound = document.getElementById("emojiSound");

// --------- Step Anzeige ----------
function showStep(effect){
  const step = steps[currentStep];
  const msg = document.getElementById("message");
  msg.innerHTML = `
    <h1>${step.text}</h1>
    <div class="buttons">
      ${step.buttons.map(b=>`<button onclick="nextStep('${b.next}','${b.effect||''}')">${b.text}</button>`).join("")}
    </div>`;
  msg.classList.add("fade-in");
  if(effect) triggerEffect(effect);
}

function nextStep(next,effect){
  if(!next) return;
  clickSound.play();
  currentStep = next;
  const msg = document.getElementById("message");
  msg.classList.remove("fade-in");
  setTimeout(()=>showStep(effect),150);
}

// --------- Canvas Hintergrund ----------
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const flying = [];

// Dynamischer Farbverlauf Hintergrund
function animateBackground(){
  const gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
  const time = Date.now() * 0.0001;
  gradient.addColorStop(0, `hsl(${(time*50)%360},60%,25%)`);
  gradient.addColorStop(1, `hsl(${(time*50+100)%360},60%,45%)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

// Effekte Trigger
function triggerEffect(type){
  emojiSound.play();
  const count = 15;
  for(let i=0;i<count;i++){
    flying.push({
      x: canvas.width/2,
      y: canvas.height/2,
      dx: (Math.random()-0.5)*5,
      dy: (Math.random()-1.5)*5,
      size: Math.random()*30+15,
      type: type
    });
  }
}

// Animation Loop
function animate(){
  animateBackground();

  // fliegende Emojis
  for(let i=flying.length-1;i>=0;i--){
    const f = flying[i];
    f.x += f.dx;
    f.y += f.dy;
    f.dy += 0.05;
    ctx.save();
    ctx.translate(f.x,f.y);
    ctx.font = `${f.size}px sans-serif`;
    const emoji = f.type==="burger"?"🍔":f.type==="hearts"?"❤️":"⭐";
    ctx.fillText(emoji,0,0);
    ctx.restore();
    if(f.y>canvas.height+50 || f.x<-50 || f.x>canvas.width+50) flying.splice(i,1);
  }

  requestAnimationFrame(animate);
}

window.addEventListener('resize',()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;});
animate();
showStep();
