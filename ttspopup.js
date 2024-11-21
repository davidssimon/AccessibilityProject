document.addEventListener("DOMContentLoaded", function() {
    // Grab the button and ttsbuttons div
    const enableButton = document.getElementById("text-to-speech");
    const ttsButtonsDiv = document.getElementById("ttsbuttons");

    if (enableButton && ttsButtonsDiv) {
        enableButton.addEventListener("click", function() {
            if (ttsButtonsDiv.style.display === "none") {
                ttsButtonsDiv.style.display = "block"; // Show TTS controls
            } else {
                ttsButtonsDiv.style.display = "none"; // Hide TTS controls
            }
        });
    } else {
        console.error("One or more elements are missing: enableButton or ttsButtonsDiv.");
    }

    const startButton = document.getElementById("start");
    const pauseButton = document.getElementById("pause");
    const resumeButton = document.getElementById("resume");
    const voicesSelect = document.getElementById("voices");
    const pitchSlider = document.getElementById("pitch");
    const rateSlider = document.getElementById("rate");
    const pitchValue = document.getElementById("pitchValue");
    const rateValue = document.getElementById("rateValue");

    let utterance;
    let speechSynthesisActive = false;
    let isPaused = false;
    let voices = [];

    // Start button
    startButton.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript(
                {
                    target: { tabId: tabs[0].id },
                    function: extractText,
                },
                (result) => {
                    const text = result[0].result;
                    if (text) {
                        startSpeech(text);
                    } else {
                        console.error("Failed to extract text.");
                    }
                }
            );
        });
    });

    // Pause button
    pauseButton.addEventListener("click", () => {
        pauseSpeech();
    });

    // Resume button
    resumeButton.addEventListener("click", () => {
        resumeSpeech();
    });

    function startSpeech(text) {
        if (speechSynthesisActive) return; // Prevent starting a new speech if it's already active

        speechSynthesisActive = true;
        utterance = new SpeechSynthesisUtterance(text);

        //Voices
        const selectedVoice = voicesSelect.value;
        const voice = voices.find(v => v.name === selectedVoice);
        utterance.voice = voice;

        //Pitch
        utterance.pitch = parseFloat(pitchSlider.value);
        utterance.rate = parseFloat(rateSlider.value);

        utterance.onend = () => {
            speechSynthesisActive = false;
        };

        window.speechSynthesis.speak(utterance);
    }

    function pauseSpeech() {
        if (speechSynthesisActive && !isPaused) {
            window.speechSynthesis.pause();
            isPaused = true;
        }
    }

    function resumeSpeech() {
        if (speechSynthesisActive && isPaused) {
            window.speechSynthesis.resume();
            isPaused = false;
        }
    }

    // Extract text from the page
    function extractText() {
        const pageText = document.body.innerText.trim();
        if (!pageText) {
            const paragraphs = document.querySelectorAll('p');
            return Array.from(paragraphs).map(p => p.innerText).join("\n");
        }
        return pageText;
    }

    function populateVoices() {
        voices = window.speechSynthesis.getVoices();
        voicesSelect.innerHTML = '';
        voices.forEach(voice => {
            const option = document.createElement('option');
            option.value = voice.name;
            option.textContent = voice.name;
            voicesSelect.appendChild(option);
        });

        if (voices.length > 0) {
            voicesSelect.value = voices[0].name;
        }
    }

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = populateVoices;
    } else {
        populateVoices();
    }

    pitchSlider.addEventListener("input", () => {
        pitchValue.textContent = pitchSlider.value;
    });

    rateSlider.addEventListener("input", () => {
        rateValue.textContent = rateSlider.value;
    });
});
