
// const startButton = document.getElementById("start");
// const pauseButton = document.getElementById("pause");
// const resumeButton = document.getElementById("resume");
// const skipButton = document.getElementById("skip");
// const voicesSelect = document.getElementById("voices");
// const pitchSlider = document.getElementById("pitch");
// const rateSlider = document.getElementById("rate");
// const pitchValue = document.getElementById("pitchValue");
// const rateValue = document.getElementById("rateValue");

// let utterance;
// let speechSynthesisActive = false;
// let isPaused = false;
// let voices = [];

// startButton.addEventListener("click", () => {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     chrome.scripting.executeScript(
//       {
//         target: { tabId: tabs[0].id },
//         function: extractText,
//       },
//       (result) => {
//         const text = result[0].result;
//         if (text) {
//           startSpeech(text);
//         } else {
//           console.error("Failed to extract text.");
//         }
//       }
//     );
//   });
// });

// pauseButton.addEventListener("click", () => {
//   pauseSpeech();
// });

// resumeButton.addEventListener("click", () => {
//   resumeSpeech();
// });

// skipButton.addEventListener("click", () => {
//   skipSpeech();
// });

// function startSpeech(text) {
//   if (speechSynthesisActive) return; // Prevent starting a new speech if it's already active

//   speechSynthesisActive = true;
//   utterance = new SpeechSynthesisUtterance(text);

//   // Set the selected voice
//   const selectedVoice = voicesSelect.value;
//   const voice = voices.find(v => v.name === selectedVoice);
//   utterance.voice = voice;

//   // Set the pitch and rate from the sliders
//   utterance.pitch = parseFloat(pitchSlider.value);
//   utterance.rate = parseFloat(rateSlider.value);

//   utterance.onend = () => {
//     speechSynthesisActive = false;
//   };

//   window.speechSynthesis.speak(utterance);
// }

// function pauseSpeech() {
//   if (speechSynthesisActive && !isPaused) {
//     window.speechSynthesis.pause();
//     isPaused = true;
//   }
// }

// function resumeSpeech() {
//   if (speechSynthesisActive && isPaused) {
//     window.speechSynthesis.resume();
//     isPaused = false;
//   }
// }

// function skipSpeech() {
//   if (speechSynthesisActive) {
//     window.speechSynthesis.cancel();
//     speechSynthesisActive = false;
//   }
// }

// function extractText() {
//   const pageText = document.body.innerText.trim();
//   if (!pageText) {
//     const paragraphs = document.querySelectorAll('p');
//     return Array.from(paragraphs).map(p => p.innerText).join("\n");
//   }
//   return pageText;
// }

// // Populate the voices dropdown
// function populateVoices() {
//   voices = window.speechSynthesis.getVoices();
//   voicesSelect.innerHTML = ''; // Clear the existing options

//   voices.forEach(voice => {
//     const option = document.createElement('option');
//     option.value = voice.name;
//     option.textContent = voice.name;
//     voicesSelect.appendChild(option);
//   });

//   // Set default voice
//   if (voices.length > 0) {
//     voicesSelect.value = voices[0].name;
//   }
// }

// // Load voices when available
// if (window.speechSynthesis.onvoiceschanged !== undefined) {
//   window.speechSynthesis.onvoiceschanged = populateVoices;
// } else {
//   populateVoices();
// }

// // Update pitch and rate values when sliders are changed
// pitchSlider.addEventListener("input", () => {
//   pitchValue.textContent = pitchSlider.value;
// });

// rateSlider.addEventListener("input", () => {
//   rateValue.textContent = rateSlider.value;
// });
