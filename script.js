// --- Google Sheets Web-App URL hier einfügen ---
const SHEET_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

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

// --- Initiale Anzeige ---
function showStep() {
  const msg = document.getElementById("message");
  msg.innerHTML = `
    <h1>${steps[step].text}</h1>
    <div class="buttons">
      ${steps[step].buttons.map((b,i) => `<button onclick="nextStep(${i})">${b}</button>`).join("")}
    </div>`;
  msg.classList.add("fade-in");
}

showStep();

// --- Nächster Schritt & Klick speichern ---
function nextStep(index) {
  const buttonText = steps[step].buttons[index];

  // Klick an Google Sheets senden
  fetch(SHEET_URL, {
    method: "POST",
    body: JSON.stringify({ step: step, button: buttonText, user: 'anon' }),
    headers: { "Content-Type": "application/json" }
  });

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
