const steps = [
  {
    text: "Hey… darf ich dich was fragen?",
    buttons: ["Ja", "Na gut"]
  },
  {
    text: "Ich wollte fragen, ob wir etwas zusammen unternehmen wollen?",
    buttons: ["Ja, gerne!", "Klar"]
  },
  {
    text: "Das freut mich 🥰 … ich möchte auch etwas unternehmen!",
    buttons: ["Burger essen gehen 🍔", "Kuscheln 🫂"]
  },
  {
    text: "Cool 😎! Das war gerade mein Lieblingsmoment heute.",
    buttons: ["Aww 💕", "Weiter"]
  },
  {
    text: "Danke, dass du das gelesen hast. Du bist wirklich besonders.",
    buttons: ["Ende 🌸", "Abbrechen ❌"]
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
}

function nextStep(index) {
  step++;
  const msg = document.getElementById("message");
  msg.classList.remove("fade-in");
  setTimeout(() => {
    if (step < steps.length) {
      showStep();
    } else {
      msg.innerHTML = "<h1>💌 Ende 💌<br><small>(aber vielleicht fängt ja etwas Neues an)</small></h1>";
      msg.classList.add("fade-in");
    }
  }, 300);
}

// initial anzeigen
showStep();
