const steps = [
  {
    text: "Hey… darf ich dir was fragen? 😏",
    buttons: ["Ja, natürlich!", "Hmm… okay 😅"]
  },
  {
    text: "Super! Lust auf ein kleines Abenteuer heute?",
    buttons: ["Oh ja! 😄", "Vielleicht später 🤔"]
  },
  {
    text: "Haha, toll! Ich hab schon was geplant…",
    buttons: ["Erzähl mir! 😎", "Überrasch mich! 😋"]
  },
  {
    text: "Perfekt 😍 Ich dachte, wir könnten…",
    buttons: ["Burger essen 🍔", "Gemütlich kuscheln 🫂"]
  },
  {
    text: "Oh, damit hab ich nicht gerechnet! 😳",
    buttons: ["Burger essen 🍔"]
  },
  {
    text: "Haha, das war witzig 😂",
    buttons: ["Weiter 😌"]
  },
  {
    text: "Vielleicht später? Kein Problem! 🔄",
    buttons: ["Nochmal starten 🔄"]
  },
  {
    text: "Ende! Deshalb klickt man nicht auf fremde Links 😂",
    buttons: ["Neustart 🔁"]
  }
];

let step = 0;

function showStep() {
  const msg = document.getElementById("message");
  msg.classList.remove("fade-in");
  setTimeout(() => {
    msg.innerHTML = `
      <h1>${steps[step].text}</h1>
      <div class="buttons">
        ${steps[step].buttons.map(b => `<button onclick="nextStep('${b}')">${b}</button>`).join("")}
      </div>`;
    msg.classList.add("fade-in");
  }, 200);
}

function nextStep(choice) {
  // Saubere Verzweigungslogik
  if (choice === "Vielleicht später 🤔") step = 6;
  else if (choice === "Gemütlich kuscheln 🫂") step = 4;
  else if (choice === "Burger essen 🍔" && step === 4) step = 5;
  else if (choice.includes("Neustart") || choice.includes("Nochmal")) step = 0;
  else step++;
  showStep();
}

// ---------- Einfacher Bubbles Hintergrund ----------
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bubbles = [];
for(let i=0;i<50;i++){
  bubbles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*4+1,
    d: Math.random()*2+1
  });
}

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  bubbles.forEach(b => {
    ctx.beginPath();
    ctx.arc(b.x,b.y,b.r,0,Math.PI*2);
    ctx.fill();
    b.y -= b.d;
    if(b.y < 0) b.y = canvas.height;
  });
  requestAnimationFrame(animate);
}

window.addEventListener('resize',()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;});
showStep();
animate();
