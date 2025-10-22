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
