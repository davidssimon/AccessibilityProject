const stupidthing = document.getElementById('dumbshit');
stupidthing.onclick=textToSpeech;
const textStorage = document.getElementById('textInput');

function textToSpeech(){
    window.speechSynthesis.cancel();
    let text = textStorage.value;
    let speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}