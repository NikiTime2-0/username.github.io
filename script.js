const steps = [
  { text: "Hey Vanessa lass uns mal was klarstellen 😏", buttons: ["Ja, was denn!", "Hmm… okay 😅"] },
  { text: "Wir wollen nach Straßburg 🎄 auf den Weihnachtsmarkt", buttons: ["Oh ja! 😄", "Ja klar, klingt toll"] },
  { text: "Wichtig: Wer fährt? 🚗", buttons: ["ich fahre", "Du fährst"] },
  { text: "Haha keine Sorge — Niklas fährt. 🚗", buttons: ["Okay, super!", "lässt sich das verhindern?"] },
  { text: "Wie soll das verhindert werden 🎅", buttons: ["Niklas Führerschein verbrennen","Niklas Autoschlüssel verstecken"] },
  { text: "Jemand hat die Schlüssel versteckt — aber Niklas findet immer alles. Ergebnis: Das hat nicht geklappt. 😂", buttons: ["Etwas anderes versuchen","Perfekt - dann wär das geklärt"] },
  { text: "Jemand wollte Niklas Führerschein verbrennen - aber ein Führerschein brennt nicht. Ergebnis: Das hat nicht geklappt. 😂", buttons: ["Neustart"] },
  { text: "Alles klar 🎄 - dann ist der Plan: Weihnachtsmarkt, Straßburg, wir kommen! 🚗", buttons: ["Ein Notfallpaket buchen","Jaaa, let's go"] },
  { text: "Wähle dein Notfallpaket 🎁", buttons: ["Zusätzliche Bremse auf Beifahrerseite","Einen Helm","Snacks"] },
  { text: "Genau... 🎅", buttons: ["SNACKS"] },
  { text: "Das wird schön 🎄 - und denk dran: 'Nein gabs hier nie.'", buttons: ["Nochmal 🔁","ich freu mich"] },
  { text: "Bis bald! 🎄", buttons: ["Neustart"] }
];

let step = 0;

function showStep() {
  const msg = document.getElementById("message");
  msg.innerHTML = `
    <h1>${steps[step].text}</h1>
    <div class="buttons">
      ${steps[step].buttons.map(b => `<button onclick="nextStep('${b}')">${b}</button>`).join("")}
    </div>`;
  msg.classList.remove("fade-in");
  void msg.offsetWidth; // reflow for animation
  msg.classList.add("fade-in");
}

function nextStep(choice) {
  switch (choice) {
    case "Ja, was denn!":
    case "Hmm… okay 😅":
      step = 1;
      break;

    case "Oh ja! 😄":
    case "Ja klar, klingt toll":
      step = 2;
      break;

    case "ich fahre":
    case "Du fährst":
      step = 3;
      break;

    case "Okay, super!":
      step = 7;
      break;

    case "lässt sich das verhindern?":
      step = 4;
      break;

    case "Niklas Führerschein verbrennen":
    case "Niklas Autoschlüssel verstecken":
      step = 5;
      break;

    case "Etwas anderes versuchen":
      step = 4;
      break;

    case "Perfekt - dann wär das geklärt":
      step = 7;
      break;

    case "Ein Notfallpaket buchen":
      step = 8;
      break;

    case "Jaaa, let's go":
      step = 10; // jetzt richtig verlinkt zum "Das wird schön"
      break;

    case "Zusätzliche Bremse auf Beifahrerseite":
    case "Einen Helm":
    case "Snacks":
      step = 9;
      break;

    case "SNACKS":
      step = 10;
      break;

    case "Nochmal 🔁":
      step = 0;
      break;

    case "ich freu mich":
      step = 11;
      break;

    default:
      step++;
      break;
  }

  showStep();
}

// Schneefall-Hintergrund
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let snowflakes = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createSnowflakes(count) {
  for (let i = 0; i < count; i++) {
    snowflakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      d: Math.random() + 0.5
    });
  }
}
createSnowflakes(150);

function drawSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.beginPath();
  for (let flake of snowflakes) {
    ctx.moveTo(flake.x, flake.y);
    ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
  }
  ctx.fill();
  updateSnow();
  requestAnimationFrame(drawSnow);
}

function updateSnow() {
  for (let flake of snowflakes) {
    flake.y += Math.pow(flake.d, 2) + 1;
    flake.x += Math.sin(flake.y * 0.01);
    if (flake.y > canvas.height) {
      flake.y = 0;
      flake.x = Math.random() * canvas.width;
    }
  }
}

drawSnow();
document.addEventListener("DOMContentLoaded", showStep);
