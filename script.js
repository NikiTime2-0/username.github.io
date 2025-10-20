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
    if (step < steps.length) {
      msg.innerHTML = `
        <h1>${steps[step].text}</h1>
        <div class="buttons">
          ${steps[step].buttons.map(b => `<button onclick="nextStep('${b}')">${b}</button>`).join("")}
        </div>`;
      msg.classList.add("fade-in");
    } else {
      step = 0;
      showStep();
    }
  }, 200);
}

function nextStep(choice) {
  // Logik für Verzweigungen
  if (choice === "Vielleicht später 🤔") step = 6;
  else if (choice === "Gemütlich kuscheln 🫂") step = 4;
  else if (choice === "Burger essen 🍔" && step === 4) step = 5;
  else if (choice.includes("Neustart") || choice.includes("Nochmal")) step = 0;
  else step++;
  showStep();
}
