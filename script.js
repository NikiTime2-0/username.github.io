const steps = [
  {
    text: "Hey… darf ich dir was fragen?",
    buttons: ["Ja", "Na gut"]
  },
  {
    text: "Magst du mich ein bisschen?",
    buttons: ["Ein bisschen? Ich mag dich sehr!", "Natürlich ❤️"]
  },
  {
    text: "Das freut mich 🥰 … denn ich mag dich auch – ziemlich doll sogar.",
    buttons: ["Weiter 😌"]
  },
  {
    text: "Weißt du was? Dieser kleine Klick war gerade mein Lieblingsmoment heute.",
    buttons: ["Awww 💕"]
  },
  {
    text: "Danke, dass du das gelesen hast. Du bist wirklich besonders.",
    buttons: ["Ende 🌸"]
  }
];

let step = 0;

function nextStep(index) {
  step++;
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
      msg.innerHTML = "<h1>💌 Ende 💌<br><small>(aber vielleicht fängt ja etwas Neues an)</small></h1>";
      msg.classList.add("fade-in");
    }
  }, 300);
}
