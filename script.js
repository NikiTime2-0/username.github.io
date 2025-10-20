const steps = [
  {
    text: "Hey… darf ich dich was fragen? 🤔",
    buttons: ["Ja klar!", "Na gut 😅"]
  },
  {
    text: "Ich hab Lust, dass wir zusammen etwas Lustiges machen! 🎉",
    buttons: ["Auf jeden Fall!", "Klingt gut 😎"]
  },
  {
    text: "Super! Was sollen wir zuerst machen?",
    buttons: ["Burger essen 🍔", "Kuscheln 🫂"]
  },
  {
    text: "Haha, cool 😄! Möchtest du noch was verrücktes ausprobieren?",
    buttons: ["Lust auf einen Spaziergang 🚶‍♂️", "Spiel etwas verrücktes 🎮"]
  },
  {
    text: "Okay, kleiner Fun-Moment: Rate mal, was ich gerade gedacht habe! 😜",
    buttons: ["Du denkst an mich? ❤️", "Hmm… ein Geheimnis 🤫"]
  },
  {
    text: "Du hast richtig geraten! 🥰 Das war echt mein Lieblingsmoment heute.",
    buttons: ["Aww 💕", "Haha, cool 😎"]
  },
  {
    text: "Danke, dass du bis hierher mitgemacht hast! Du bist wirklich besonders.",
    buttons: ["Ende 🌸", "OHJE Abbruch ❌"]
  }
];

let step = 0;

function showStep() {
  const msg = document.getElementById("message");
  msg.innerHTML = `
    <h1>${steps[step].text}</h1>
    <div class="buttons">
      ${steps[step].buttons.map((b,i) => `<button onclick="nextStep(${i})">${b}</button>`).join("")}
    </div>`;
  msg.classList.add("fade-in");
  // kleine Wackel-Animation beim neuen Schritt
  const container = document.querySelector(".container");
  container.style.transform = "scale(0.98)";
  setTimeout(() => { container.style.transform = "scale(1)"; }, 150);
}

function nextStep(index) {
  step++;
  const msg = document.getElementById("message");
  msg.classList.remove("fade-in");
  setTimeout(() => {
    if (step < steps.length) {
      showStep();
    } else {
      msg.innerHTML = "<h1>💌 Ende 💌<br><small>(aber vielleicht fängt ja etwas Neues an 😏)</small></h1>";
      msg.classList.add("fade-in");
    }
  }, 300);
}

// initial anzeigen
showStep();
