// --------- Steps
const steps = {
  start: {
    text: "Hey… Lust auf ein kleines Abenteuer heute? 🌙✨",
    buttons: [
      { text: "Ja klar 😄", next: "ideen" },
      { text: "Vielleicht später 🤔", next: "wiederholen1" }
    ]
  },
  wiederholen1: {
    text: "Hmm, wähle nochmal 😏",
    buttons: [
      { text: "Okay, jetzt ja 😎", next: "ideen" },
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
      { text: "Burger essen 🍔", next: "burger" },
      { text: "Kuscheln 🫂", next: "kuscheln" }
    ]
  },
  burger: {
    text: "Lecker 😋! Danach noch ein Spaziergang?",
    buttons: [
      { text: "Ja 🚶‍♂️", next: "spaziergang" },
      { text: "Nein 🎮", next: "spiel" }
    ]
  },
  kuscheln: {
    text: "Aww 🥰 Kuscheln ist toll! Danach Lust auf Spaziergang?",
    buttons: [
      { text: "Ja 😄", next: "spaziergang" },
      { text: "Lieber spielen 🎮", next: "spiel" }
    ]
  },
  spiel: {
    text: "Haha 😜, Fun-Moment!",
    buttons: [
      { text: "Du denkst an mich? ❤️", next: "lieblingsmoment" },
      { text: "Hmm… Geheimnis 🤫", next: "lieblingsmoment" }
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

// --------- Step Anzeige ----------
function showStep(){
  const step = steps[currentStep];
  const msg = document.getElementById("message");
  if(!step) return;

  msg.innerHTML = `
    <h1>${step.text}</h1>
    <div class="buttons">
      ${step.buttons.map(b=>`<button onclick="nextStep('${b.next}')">${b.text}</button>`).join("")}
    </div>`;
  msg.classList.add("fade-in");
}

function nextStep(next){
  if(!next) return;
  currentStep = next;
  const msg = document.getElementById("message");
  msg.classList.remove("fade-in");
  setTimeout(()=>showStep(),150);
}

// --------- Canvas Hintergrund (Sterne + Mond)
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const moon = { x: canvas.width-100, y: 100, radius: 50 };

// Sterne zufällig erzeugen
for(let i=0;i<120;i++){
  stars.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, r: Math.random()*2+0.5, alpha: Math.random() });
}

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

  ctx.fillStyle = "#f0eec0";
  ctx.beginPath();
  ctx.arc(moon.x,moon.y,moon.radius,0,Math.PI*2);
  ctx.fill();

  requestAnimationFrame(animateBackground);
}

window.addEventListener('resize',()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;});

// --------- Start
showStep();
animateBackground();
