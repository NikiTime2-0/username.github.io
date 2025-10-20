const steps = {
  start: {
    text: "Hey… darf ich dich was fragen? 🤔",
    buttons: [
      { text: "Ja klar!", next: "frageUnternehmen" },
      { text: "Na gut 😅", next: "frageUnternehmen" }
    ]
  },
  frageUnternehmen: {
    text: "Super! Wollen wir was zusammen unternehmen? 🎉",
    buttons: [
      { text: "Ja, gerne!", next: "ideen" },
      { text: "Vielleicht später 🤔", next: "wiederholen1" }
    ]
  },
  wiederholen1: {
    text: "Oh, wähle nochmal 😏",
    buttons: [
      { text: "Okay, ich will 😎", next: "ideen" },
      { text: "Nö 😅", next: "ende1" }
    ]
  },
  ideen: {
    text: "Was machen wir zuerst?",
    buttons: [
      { text: "Burger essen 🍔", next: "fun1" },
      { text: "Kuscheln 🫂", next: "fun2" }
    ]
  },
  fun1: {
    text: "Mmmh lecker 😋! Willst du danach noch etwas Lustiges machen?",
    buttons: [
      { text: "Ja, lass uns spazieren 🚶‍♂️", next: "fun3" },
      { text: "Oder ein Spiel 🎮", next: "fun3" }
    ]
  },
  fun2: {
    text: "Aww 🥰 Kuscheln ist immer gut! Lust auf eine kleine Überraschung?",
    buttons: [
      { text: "Ja 😄", next: "fun3" },
      { text: "Hmm lieber nicht 🤫", next: "fun3" }
    ]
  },
  fun3: {
    text: "Haha, kleines Fun-Moment: Rate mal, was ich gerade gedacht habe! 😜",
    buttons: [
      { text: "Du denkst an mich? ❤️", next: "lieblingsmoment" },
      { text: "Hmm… ein Geheimnis 🤫", next: "lieblingsmoment" }
    ]
  },
  lieblingsmoment: {
    text: "Richtig geraten! 🥰 Das war echt mein Lieblingsmoment heute.",
    buttons: [
      { text: "Aww 💕", next: "ende2" },
      { text: "Haha, cool 😎", next: "ende2" }
    ]
  },
  ende1: {
    text: "Schade 😅 Vielleicht ein anderes Mal!",
    buttons: [
      { text: "Ende 🌸", next: null }
    ]
  },
  ende2: {
    text: "Danke, dass du bis hierher mitgemacht hast! Du bist wirklich besonders.",
    buttons: [
      { text: "Ende 🌸", next: null },
      { text: "Abbrechen ❌", next: null }
    ]
  }
};

let currentStep = "start";

function showStep() {
  const step = steps[currentStep];
  const msg = document.getElementById("message");
  msg.innerHTML = `
    <h1>${step.text}</h1>
    <div class="buttons">
      ${step.buttons.map((b,i) => `<button onclick="nextStep('${b.next}')">${b.text}</button>`).join("")}
    </div>`;
  msg.classList.add("fade-in");

  const container = document.querySelector(".container");
  container.style.transform = "scale(0.98)";
  setTimeout(() => { container.style.transform = "scale(1)"; }, 150);
}

function nextStep(next) {
  if (!next) return; // Ende
  currentStep = next;
  const msg = document.getElementById("message");
  msg.classList.remove("fade-in");
  setTimeout(showStep, 300);
}

// --------------------
// Hintergrund Animation: einfache Partikel + schwebende Blobs
// --------------------
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
for(let i=0;i<80;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*3+1,
    dx: (Math.random()-0.5)/2,
    dy: (Math.random()-0.5)/2,
    color: `hsla(${Math.random()*360},70%,80%,0.3)`
  });
}

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x += p.dx;
    p.y += p.dy;
    if(p.x<0||p.x>canvas.width)p.dx*=-1;
    if(p.y<0||p.y>canvas.height)p.dy*=-1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = p.color;
    ctx.fill();
  });
  requestAnimationFrame(animate);
}

animate();
window.addEventListener('resize',()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;});
showStep();
