const steps = [
  { text: "Hey Vanessa lass uns mal was klarstellen 😏", buttons: ["Ja, was denn!", "Hmm… okay 😅"] },
  { text: "Wir wollen nach Straßburg auf den Weihnachtsmarkt", buttons: ["Oh ja! 😄", "Ja klar, klingt toll"] },
  { text: "Wichtig: Wer fährt?", buttons: ["ich fahre", "Du  fährst"] },
  { text: "Haha keine Sorge — Niklas fährt.", buttons: ["Okay, super!", "lässt sich das verhindern?"] },
  { text: "Wie soll das verhindert werden", buttons: ["Niklas Führerschein verbrennen","Niklas Autoschlüssel verstecken"] },
  { text: "Jemand hat die Schlüssel versteckt — aber Niklas findet immer alles. Ergebnis: Das hat nicht geklappt. 😂", buttons: ["Etwas anderes versuchen","Perfekt - dann wär das geklärt"] },
  { text: "Jemand wollte Niklas Führerschein verbrennen - aber ein Führerschein brennt nicht. Ergebnis: Das hat nicht geklappt. 😂", buttons: ["Etwas anderes versuchen","Perfekt - dann wär das geklärt"] },
  { text: "Alles klar - dann ist der Plan: Weihnachtsmarkt, Straßburg, wir kommen", buttons: ["Ein Notfallpaket buchen","Jaaa, let's go"] },
  { text: "Wähle dein Notfallpaket", buttons: ["Zusätzliche Bremse auf Beifahrerseite","Einen Helm","Snacks"] },
  { text: "Genau... ", buttons: ["SNACKS"] },
  { text: "Das wird schön - und denk dran: 'Nein gabs hier nie.'", buttons: ["Nochmal 🔁","ich freu mich"] },
  { text: "Bis bald!", buttons: ["Neustart"] }
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
  switch (choice) {
    // Einstieg
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
      step = 7; // direkt zu Plan
      break;

    case "lässt sich das verhindern?":
      step = 4; // zur Auswahl der Verhinderung
      break;

    // Verhinderung
    case "Niklas Führerschein verbrennen":
      step = 6;
      break;

    case "Niklas Autoschlüssel verstecken":
      step = 5;
      break;

    case "Etwas anderes versuchen":
      step = 4;
      break;

    case "Perfekt - dann wär das geklärt":
      step = 7;
      break;

    // Plan & Notfallpaket
    case "Ein Notfallpaket buchen":
      step = 8;
      break;

    case "Jaaa, let's go":
      step = 10; // führt jetzt korrekt zur „Das wird schön…“
      break;

    case "Zusätzliche Bremse auf Beifahrerseite":
    case "Einen Helm":
    case "Snacks":
      step = 9;
      break;

    case "SNACKS":
      step = 10;
      break;

    // Ende
    case "Nochmal 🔁":
    case "Neustart":
      step = 0;
      break;

    case "ich freu mich":
      step = 11;
      break;

    default:
      step++;
      break;
  }

  showStep();
}

document.addEventListener("DOMContentLoaded", showStep);
