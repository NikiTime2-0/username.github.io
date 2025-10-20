// --------- Steps
const steps = {
  start: {
    text: "Hey… Lust auf ein kleines Abenteuer heute? 🌙✨",
    buttons: [
      { text: "Ja klar 😄", next: "ideen", effect: "hearts" },
      { text: "Vielleicht später 🤔", next: "wiederholen1" }
    ]
  },
  wiederholen1: {
    text: "Hmm, wähle nochmal 😏",
    buttons: [
      { text: "Okay, jetzt ja 😎", next: "ideen", effect: "hearts" },
      { text: "Nö 😅", next: "restart" }
    ]
  },
  restart: {
    text: "Alles klar, wir starten nochmal 🔄",
    buttons: [
      { text: "Neustart", next: "start" }
    ]
  },
  ideen: {
    text: "Was wollen wir machen?",
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
    text: "Haha 😜, Fun-Moment!",
    buttons: [
      { text: "Du denkst an mich? ❤️", next: "lieblingsmoment", effect: "hearts" },
      { text: "Hmm… Geheimnis 🤫", next: "lieblingsmoment", effect: "stars" }
    ]
  },
  spaziergang: {
    text: "Das war mein Lieblingsmoment heute 🥰",
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
    text: "Danke, dass du mitgemacht hast! 💌",
    buttons: [
      { text: "Nochmal 🔄", next: "start" }
    ]
  }
};

let currentStep = "start";

// -------- Sounds ----------
const clickSound = document.getElementById("clickSound");
const emojiSound = document.getElementById("emojiSound");

// --------- Step Anzeige ----------
function showStep(effect){
  const step = steps[currentStep];
  const msg = document.getElementById("message");
  if(!step) return;

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

const flying = [];
const stars = [];
const moon = { x: canvas.width-100, y: 100, radius: 50 };

// Sterne erzeugen
for(let i=0;i<120;i++){
  stars.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, r: Math.random()*2+0.5, alpha: Math.random() });
}

// Hintergrund Animation
function animateBackground(){
  ctx.fillStyle = "#0b0c1a";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  stars.forEach(s=>{
    s.alpha += (Math.random()-0.5)*0.05;
    s.alpha = Math.max(0,Math.min(1,s.alpha));
    ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fill();
  });

  // Mond
  ctx.fillStyle = "#f0eec0";
  ctx.beginPath();
  ctx.arc(moon.x,moon.y,moon.radius,0,Math.PI*2);
  ctx.fill();
}

// Fliegende Emojis
function triggerEffect(type){
  emojiSound.play();
  const count = 15;
  for(let i=0;i<count;i++){
    flying.push({
      x: canvas.width/2,
      y: canvas.height/2,
      dx: (Math.random()-0.5)*6,
      dy: (Math.random()-2)*6,
      size: Math.random()*30+15,
      type: type,
      spin: (Math.random()-0.5)*0.2,
      rotation: 0
    });
  }
}

// Animation Loop
function animate(){
  animateBackground();

  for(let i=flying.length-1;i>=0;i--){
    const f = flying[i];
    f.x += f.dx;
    f.y += f.dy;
    f.dy += 0.15; // gravity
    f.dx *= 0.99; // air friction
    f.rotation += f.spin;

    ctx.save();
    ctx.translate(f.x,f.y);
    ctx.rotate(f.rotation);
    ctx.font = `${f.size}px sans-serif`;
    const emoji = f.type==="burger"?"🍔":f.type==="hearts"?"❤️":"⭐";
    ctx.fillText(emoji,0,0);
    ctx.restore();

    if(f.y>
