const steps = [
  {
    text: "Hey… darf ich dir was fragen?",
    buttons: ["Ja 😄", "Na gut 😅"]
  },
  {
    text: "Super! Hast du Lust auf ein kleines Abenteuer?",
    buttons: ["Ja klar 😎", "Vielleicht später 🤔"]
  },
  {
    text: "Perfekt! Ich möchte auch etwas unternehmen!",
    buttons: ["Burger essen 🍔", "Kuscheln 🫂"]
  },
  {
    text: "Haha, das wird unser Lieblingsmoment heute 🥰",
    buttons: ["Weiter 😌"]
  },
  {
    text: "Danke, dass du mitgemacht hast! 💌",
    buttons: ["Ende 🌸", "Nochmal 🔄"]
  }
];

let step = 0;

function showStep() {
  const msg = document.getElementById("message");
  msg.classList.remove("fade-in");
  setTimeout(() => {
    if (step < steps.length) {
      msg.innerHTML = `
        <h1>${steps[step].text}</h1>
        <div class="buttons">
          ${steps[step].buttons.map(b => `<button onclick="nextStep()">${b}</button>`).join("")}
        </div>`;
      msg.classList.add("fade-in");
    } else {
      step = 0;
      showStep();
    }
  }, 200);
}

function nextStep() {
  step++;
  showStep();
}

// ---------- Simple Bubbles Hintergrund ----------
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
