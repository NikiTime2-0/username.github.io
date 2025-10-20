const steps = [
  { text: "Hey… darf ich dir was fragen? 😏", buttons: ["Ja, natürlich!", "Hmm… okay 😅"] },
  { text: "Super! Lust auf ein kleines Abenteuer heute?", buttons: ["Oh ja! 😄", "Vielleicht später 🤔"] },
  { text: "Haha, toll! Ich hab schon was geplant…", buttons: ["Erzähl mir! 😎", "Überrasch mich! 😋"] },
  { text: "Perfekt 😍 Ich dachte, wir könnten…", buttons: ["Burger essen 🍔", "Gemütlich kuscheln 🫂"] },
  { text: "Oh, damit hab ich nicht gerechnet! 😳", buttons: ["Burger essen 🍔"] },
  { text: "Haha, das war witzig 😂", buttons: ["Weiter 😌"] },
  { text: "Vielleicht später? Kein Problem! 🔄", buttons: ["Nochmal starten 🔄"] },
  { text: "Ende! Deshalb klickt man nicht auf fremde Links 😂", buttons: ["Neustart 🔁"] }
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
  void msg.offsetWidth; // trigger reflow
  msg.classList.add("fade-in");
}

function nextStep(choice) {
  // Neue saubere Logik
  if (choice === "Vielleicht später 🤔") step = 6;
  else if (choice === "Gemütlich kuscheln 🫂") step = 4;
  else if (choice === "Burger essen 🍔") {
    if (step === 3) step = 4; // direkt zum „Oh, damit hab ich nicht gerechnet!“
    else step = 5;             // danach weiter wie geplant
  }
  else if (choice.includes("Neustart") || choice.includes("Nochmal")) step = 0;
  else step++;
  showStep();
}

// Direkt beim Laden den ersten Schritt anzeigen
showStep();
