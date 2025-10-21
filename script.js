// ❄️ Schneefall erzeugen
function createSnow() {
  const snow = document.createElement("div");
  snow.classList.add("snowflake");
  snow.textContent = ["❆","❄️","✻"][Math.floor(Math.random()*3)];
  snow.style.left = Math.random() * 100 + "vw";
  snow.style.fontSize = Math.random() * 12 + 10 + "px";
  snow.style.animationDuration = Math.random()*3 + 5 + "s";
  snow.style.opacity = Math.random()*0.8 + 0.2;
  document.body.appendChild(snow);
  setTimeout(()=> snow.remove(), 8000);
}
setInterval(createSnow, 250);

// 💬 Dialog
const steps = [
  { text: "Hey Vanessa lass uns mal was klarstellen 😏", buttons: ["Ja, was denn!", "Hmm… okay 😅"] },
  { text: "Wir wollen nach Straßburg auf den Weihnachtsmarkt 🎄", buttons: ["Oh ja! 😄", "Ja klar, klingt toll"] },
  { text: "Wichtig: Wer fährt? 🚗", buttons: ["ich fahre", "Du  fährst"] },
  { text: "Haha keine Sorge — Niklas fährt 🚗.", buttons: ["Okay, super!", "lässt sich das verhindern?"] },
  { text: "Wie soll das verhindert werden", buttons: ["Niklas Führerschein verbrennen","Niklas Autoschlüssel verstecken"] },
  { text: "Jemand hat die Schlüssel versteckt — aber Niklas findet immer alles. Ergebnis: Das hat nicht geklappt. 😂", buttons: ["Etwas anderes versuchen","Perfekt - dann wär das geklärt"] },
  { text: "Jemand wollte Niklas Führerschein verbrennen - aber ein Führerschein brennt nicht. Ergebnis: Das hat nicht geklappt. 😂", buttons: ["Etwas anderes versuchen","Perfekt - dann wär das geklärt"] },
  { text: "Alles klar - dann ist der Plan: Weihnachtsmarkt, Straßburg, wir kommen 🎄", buttons: ["Ein Notfallpaket buchen","Jaaa, let's go"] },
  { text: "Wähle dein Notfallpaket", buttons: ["Zusätzliche Bremse auf Beifahrerseite","Einen Helm","Snacks"] },
  { text: "Genau... 🎄", buttons: ["SNACKS"] },
  { text: "Das wird schön - und denk dran: 'Nein gabs hier nie.' 🎄", buttons: ["Nochmal 🔁","ich freu mich"] },
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
  void msg.offsetWidth;
  msg.classList.add("fade-in");
}

function nextStep(choice) {
  switch(choice){
    case "Ja, was denn!":
    case "Hmm… okay 😅": step = 1; break;
    case "Oh ja! 😄":
    case "Ja klar, klingt toll": step = 2; break;
    case "ich fahre":
    case "Du  fährst": step = 3; break;
    case "Okay, super!": step = 7; break;
    case "lässt sich das verhindern?": step = 4; break;
    case "Niklas Führerschein verbrennen": step = 6; break;
    case "Niklas Autoschlüssel verstecken": step = 5; break;
    case "Etwas anderes versuchen": step = 4; break;
    case "Perfekt - dann wär das geklärt": step = 7; break;
    case "Ein Notfallpaket buchen": step = 8; break;
    case "Jaaa, let's go": step = 10; break;
    case "Zusätzliche Bremse auf Beifahrerseite":
    case "Einen Helm":
    case "Snacks": step = 9; break;
    case "SNACKS": step = 10; break;
    case "Nochmal 🔁":
    case "Neustart": step = 0; break;
    case "ich freu mich": step = 11; break;
    default: step++;
  }
  showStep();
}

// Lade den ersten Step
document.addEventListener("DOMContentLoaded", showStep);
