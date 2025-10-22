// 🌙 Mond erzeugen
function createMoon() {
  const moon = document.createElement("div");
  moon.id = "moon";
  moon.style.position = "fixed";
  moon.style.right = "50px";
  moon.style.top = "50px";
  moon.style.width = "80px";
  moon.style.height = "80px";
  moon.style.background = "radial-gradient(circle at 30% 30%, #fff, #ccc)";
  moon.style.borderRadius = "50%";
  moon.style.boxShadow = "0 0 30px rgba(255,255,255,0.5)";
  document.body.appendChild(moon);
}
createMoon();

// ⭐ Viele Sterne erzeugen
function createStar() {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.position = "absolute";
  star.style.left = Math.random() * 100 + "vw";
  star.style.top = Math.random() * 80 + "vh"; // obere 80% des Bildschirms
  const size = Math.random() * 2 + 1;
  star.style.width = size + "px";
  star.style.height = size + "px";
  star.style.background = "white";
  star.style.borderRadius = "50%";
  star.style.opacity = Math.random();
  document.body.appendChild(star);

  // Flimmern
  setInterval(() => {
    star.style.opacity = Math.random();
  }, Math.random() * 3000 + 1000);
}

// Mehr Sterne beim Start erzeugen
for (let i = 0; i < 150; i++) {
  createStar();
}

// 🌠 Sternschnuppen erzeugen
function createShootingStar() {
  const shootingStar = document.createElement("div");
  shootingStar.classList.add("shooting-star");
  shootingStar.style.left = Math.random() * 100 + "vw";
  shootingStar.style.top = Math.random() * 30 + "vh"; // obere Hälfte
  shootingStar.style.width = "2px";
  shootingStar.style.height = "80px";
  shootingStar.style.background = "linear-gradient(white, transparent)";
  shootingStar.style.position = "absolute";
  shootingStar.style.transform = "rotate(45deg)";
  shootingStar.style.opacity = 0.8;
  shootingStar.style.transition = "all 1s linear";
  document.body.appendChild(shootingStar);

  // Bewegung nach rechts unten
  setTimeout(() => {
    shootingStar.style.left = parseFloat(shootingStar.style.left) + 200 + "px";
    shootingStar.style.top = parseFloat(shootingStar.style.top) + 200 + "px";
    shootingStar.style.opacity = 0;
  }, 50);

  // Entfernen nach Animation
  setTimeout(() => shootingStar.remove(), 1000);
}

// Intervalle
setInterval(createStar, 300);        // Sterne kontinuierlich
setInterval(createShootingStar, 3000); // Sternschnuppen alle paar Sekunden


const steps = [
  { 
    text: "Hey… darf ich dich was fragen? 😏", 
    buttons: ["Ja, natürlich!", "Hmm… okay 😅"] 
  },
  { 
    text: "Super! Was machen wir hier eigentlich?", 
    buttons: ["Weiß nicht 😅", "Frag was anderes 🙃"] 
  },
  { 
    text: "Na gut 😄 Ich wollte dich ein bisschen entführen… virtuell... erstmal... ", 
    buttons: ["Ohh wohin?", "Ich bin dabei 😎"] 
  },
  { 
    text: "Wie wär’s mit Gleis9? 🍔🍸", 
    buttons: ["Erzähl mir mehr ", "Ich lass mich überraschen 🤭", "Oder lieber was anderes?"] 
  },
  { 
    text: "Etwas anderes? 😏 knutschen? 😂", 
    buttons: ["Haha, zurück zu Gleis9 lieber 😆", "Burger klingt besser 🍔"] 
  },
  { 
    text: "Okay also Gleis9 – in Ravensburg, so Lounge-Bar-mäßig", 
    buttons: ["Klingt perfekt ✨", "Ich nehm nen Drink 🍸"] 
  },
  { 
    text: "Und Burger. Schön. Mit Pommes. Und du gegenüber. 😉", 
    buttons: ["Oh wow 😍", "Jetzt hab ich Hunger 😂"] 
  },
  { 
    text: "Ich hab gehört, gutes Essen verbindet… oder war’s Knutschen? 😏", 
    buttons: ["Beides! 😂", "Haha du Charmeur 😌"] 
  },
  { 
    text: "Dann also Burger essen 🍔", 
    buttons: ["Deal 🤝", "Bin dabei"] 
  },
  { 
    text: "Haha, das war witzig 😂", 
    buttons: ["Weiter 😌"] 
  },
  { 
    text: "Aber ehrlich… du hättest doch Lust, oder? 😏", 
    buttons: ["Vielleicht… 😇", "Kommt drauf an 😉"] 
  },
  { 
    text: "Ich nehm das als Ja 😁", 
    buttons: ["Frech! 😅", "Haha erwischt 😄"] 
  },
  { 
    text: "Dann also: Date im Gleis9. Du bringst gute Laune mit, ich den Hunger", 
    buttons: ["Abgemacht 😍", "Nur wenn du Nachtisch bringst 😋"] 
  },
  { 
    text: "Ende? Naja, eher ein Anfang 😌", 
    buttons: ["Freue mich", "Ich will mehr 😍"] 
  },
  { 
    text: "Mal schauen was ich dir noch an Links schicken kann", 
    buttons: ["Nochmal starten 🔁", "Okay, du hast gewonnen ❤️"] 
  },
  { 
    text: "Bis bald! Freue mich ", 
    buttons: ["Nochmal starten 🔁"] 
  }
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
  // --- LOGISCHE SPRÜNGE UND SCHLEIFEN ---
  
  // Step 3: Gleis9-Auswahl
  if (step === 3) {
    if (choice === "Oder lieber was anderes?") {
      step = 4; // springe zu Knutschen
    } else {
      step = 5; // alle anderen Buttons → Lounge-Bar Beschreibung
    }
  } 
  // Step 4: Knutschen
  else if (step === 4) {
    if (choice === "Haha, zurück zu Gleis9 lieber 😆") {
      step = 5; // zurück zum Lounge-Bar-Step
    } else if (choice === "Burger klingt besser 🍔") {
      step = 5; // weiter zur Lounge-Bar Beschreibung
    }
  } 
  // Neustart
  else if (choice.includes("Nochmal") || choice.includes("Neustart")) {
    step = 0;
  } 
  // alle anderen Schritte linear
  else {
    step++;
  }

  // Sicherheitscheck
  if (step >= steps.length) step = steps.length - 1;

  showStep();
}

// Start
showStep();
