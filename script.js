const steps = [
  { text: "Hey Vanessa lass uns mal was klarstellen 😏", buttons: ["Ja, was denn!", "Hmm… okay 😅"] },
  { text: "Wir wollen nach Straßburg auf den Weihnachtsmarkt", buttons: ["Oh ja! 😄", "Ja klar, klingt toll"] },
  { text: "Wichtig: Wer fährt?", buttons: ["ich fahre", "Du  fährst"] },
  { text: "Haha keine Sorge — Niklas fährt.", buttons: ["Okay, super!", "lässt sich das verhindern?"] },
  { text: "Wie soll das verhindert werden", buttons: ["Niklas Führerschein verbrennen","Niklas Autoschlüssel verstecken"] },
  { text: "Jemand hat die Schlüssel versteckt — aber Niklas findet immer alles. Ergebnis: Das hat nicht geklappt. 😂", buttons: ["Etwas anderes versuchen","Perfekt - dann wär das geklärt"] },
  { text: "Alles klar - dann ist der Plan: Weihnachtsmarkt, Straßburg, wir kommen", buttons: ["Ein Notfallpaket buchen","Jaaa, let's go"] },
  { text: "Wähle dein Notfallpaket", buttons: ["Zusätzliche Bremse auf Beifahrerseite","Einen Helm","Snacks"] },
  { text: "Genau... ", buttons: ["SNACKS"] },
  { text: "Das wird schön - und denk dran: 'Nein gabs hier nie.'", buttons: ["Nochmal 🔁","ich freu mich"] }
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
    // Startfragen
    case "Ja, was denn!":
    case "Hmm… okay 😅":
      step = 1;
      break;

    case "Oh ja! 😄":
    case "Ja klar, klingt toll":
      step = 2;
      break;

    // Wer fährt
    case "ich fahre":
    case "Du  fährst":
      step = 3;
      break;

    case "Okay, super!":
      step = 6; // direkt zu Plan: Weihnachtsmarkt
      break;

    case "lässt sich das verhindern?":
      step = 4; // zu "Wie soll das verhindert werden"
      break;

    // Verhindern-Optionen
    case "Niklas Führerschein verbrennen":
      step = 5; // Ergebnis „das hat nicht geklappt“
      break;

    case "Niklas Autoschlüssel verstecken":
      step = 5; // gleicher Gag
      break;

    case "Etwas anderes versuchen":
      step = 4; // zurück zu Verhinderungsoptionen
      break;

    case "Perfekt - dann wär das geklärt":
      step = 6; // weiter zu Plan
      break;

    // Notfallpaket & Spaßzweige
    case "Ein Notfallpaket buchen":
      step = 7;
      break;

    case "Jaaa, let's go":
      step = 9;
      break;

    case "Zusätzliche Bremse auf Beifahrerseite":
    case "Einen Helm":
    case "Snacks":
      step = 8;
      break;

    case "SNACKS":
      step = 9;
      break;

    // Ende / Neustart
    case "Nochmal 🔁":
      step = 0;
      break;

    case "ich freu mich":
      step = 9; // einfach Ende
      break;

    default:
      step++;
      break;
  }

  showStep();
}

// Direkt beim Laden anzeigen
document.addEventListener("DOMContentLoaded", showStep);
