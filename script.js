// --------- Steps ----------
const steps = {
  start: {
    text: "Hey… hast du Lust, heute etwas zu unternehmen? 🍂",
    buttons: [
      { text: "Ja klar! 😄", next: "ideen" },
      { text: "Vielleicht später 🤔", next: "wiederholen1" }
    ]
  },
  wiederholen1: {
    text: "Oh, wähle nochmal 😏",
    buttons: [
      { text: "Okay, jetzt ja 😎", next: "ideen" },
      { text: "Nö 😅", next: "ende1" }
    ]
  },
  ideen: {
    text: "Was machen wir zuerst?",
    buttons: [
      { text: "Burger essen 🍔", next: "burger", effect: "burger" },
      { text: "Kuscheln 🫂", next: "kuscheln", effect: "herzen" }
    ]
  },
  burger: {
    text: "Mmmh lecker 😋! Willst du danach noch einen Spaziergang machen? 🍁",
    buttons: [
      { text: "Ja, lass uns gehen 🚶‍♂️", next: "spaziergang", effect: "blaetter" },
      { text: "Nein, lieber spielen 🎮", next: "spiel" }
    ]
  },
  kuscheln: {
    text: "Aww 🥰 Kuscheln ist immer gut! Danach Lust auf einen Spaziergang? 🍁",
    buttons: [
      { text: "Ja 😄", next: "spaziergang", effect: "blaetter" },
      { text: "Lieber Spiel 🎮", next: "spiel" }
    ]
  },
  spiel: {
    text: "Haha, kleines Fun-Moment: Rate mal, was ich gerade gedacht habe! 😜",
    buttons: [
      { text: "Du denkst an mich? ❤️", next: "lieblingsmoment" },
      { text: "Hmm… ein Geheimnis 🤫", next: "lieblingsmoment" }
    ]
  },
  spaziergang: {
    text: "Schön spazieren zu gehen 🍂… Jetzt war’s mein Lieblingsmoment heute 🥰",
    buttons: [
      { text: "Aww 💕", next: "ende2" },
      { text: "Haha 😎", next: "ende2" }
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
    text: "Danke, dass du bis hierher mitgemacht hast! Du bist wirklich besonders. 🍂💌",
    buttons: [
      { text: "Ende 🌸", next: null },
      { text: "Abbrechen ❌", next: null }
    ]
  }
};

let currentStep = "start";

// --------- Anzeige ----------
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
  currentStep = next;
  const msg = document.getElementById("message");
  msg.classList.remove("fade-in");
  setTimeout(()=>showStep(effect),150);
}

// --------- Canvas Herbstblätter + Effekte ----------
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const leaves = [];
const flying = [];
for(let i=0;i<50;i++){
  leaves.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    size: Math.random()*20+10,
    dy: Math.random()*1+0.5,
    dx: (Math.random()-0.5)*0.5,
    angle: Math.random()*Math.PI*2,
    color: `hsla(${30+Math.random()*20},70%,50%,0.7)`
  });
}

function triggerEffect(type){
  const count = 10;
  for(let i=0;i<count;i++){
    flying.push({
      x: canvas.width/2,
      y: canvas.height/2,
      dx: (Math.random()-0.5)*3,
      dy: (Math.random()-1.5)*3,
      size: Math.random()*20+10,
      type: type
    });
  }
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // Blätter fallen
  leaves.forEach(l=>{
    l.y += l.dy;
    l.x += l.dx;
    l.angle += 0.01;
    if(l.y>canvas.height) l.y=-20;
    if(l.x>canvas.width) l.x=0;
    ctx.save();
    ctx.translate(l.x,l.y);
    ctx.rotate(l.angle);
    ctx.fillStyle = l.color;
    ctx.beginPath();
    ctx.moveTo(0,-l.size/2);
    ctx.lineTo(l.size/4,l.size/2);
    ctx.lineTo(-l.size/4,l.size/2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  });

  // Antwort Effekte
  for(let i=flying.length-1;i>=0;i--){
    const f = flying[i];
    f.x += f.dx;
    f.y += f.dy;
    f.dy += 0.05;
    ctx.save();
    ctx.translate(f.x,f.y);
    ctx.fillStyle = f.type==="burger"?"#c44": f.type==="herzen"?"#f55":"#a52";
    ctx.font = `${f.size}px sans-serif`;
    const emoji = f.type==="burger"?"🍔":f.type==="herzen"?"❤️":"🍂";
    ctx.fillText(emoji,0,0);
    ctx.restore();
    if(f.y>canvas.height+50 || f.x<-50 || f.x>canvas.width+50) flying.splice(i,1);
  }

  requestAnimationFrame(animate);
}

window.addEventListener('resize',()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;});

animate();
showStep();
