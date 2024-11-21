const startStopButton = document.getElementById('startStopButton');
const resultDiv = document.getElementById('result');
const SpeechRecognition = window.SpeechRecongition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.continuous = true;
let listening = false;
let transcript = ' ';
var result ="";
var command = false;
var word = transcript.substring(transcript.lastIndexOf(" "),transcript.length);

var commandPath = "";
var commandWordBank_First = [
    "start", 
    "stop",
    "change",
    "restore",
    "list",
];

var commandWordBank_Second = [
    "read", 
    "write",
    "text",
]

var commandWordBank_third = [
    "size",
    "color",
    "font",
]

recognition.onresult = (event) => {
    transcript = ' ';
    word = transcript.substring(transcript.lastIndexOf(" "),transcript.length-1);

    for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
    }
    
    resultDiv.innerHTML = transcript;

    if(transcript.substring(transcript.lastIndexOf(" "),transcript.length)==" command"){
        command=true;
    }

    if(command){
        commandWords(transcript);
    }

    if(transcript.substring(transcript.lastIndexOf(" "),transcript.length)==" over"){
        command=false;
    }
};

recognition.onerror = (event) => {
    console.error("Speech recognition error", event)
}

recognition.onend = () => {
    listening = false;
    command=false;
    startStopButton.textContent = 'Start Listening'
}

startStopButton.addEventListener('click', () => {
    if (listening) {
        recognition.stop();
        listening = false;
        startStopButton.textContent = 'Start Listening'
    } else {
        recognition.start();
        listening = true;
        startStopButton.textContent = 'Stop Listening'
    }
})


function commandWords(word){
    var shortWord = word.substring(word.lastIndexOf("command"),word.length);
    //console.log(commandWordBank[0]);
    for(i=0;i<commandWordBank_First.length;i++){
        if(searchSequence(shortWord, "command "+commandWordBank_First[i])){
            shortWord = shortWord.substring(shortWord.lastIndexOf(commandWordBank_First[i]),shortWord.length);
            switch(shortWord){
                case "start read":
                    break;
                case "start write":
                    break;
                case "stop read":
                    break;
                case "stop write":
                    break;
                case "change text font":
                    break;
                case "change text size":
                    break;
                case "change text color":
                    break;
                case "restore text font":
                    break;
                case "restore text size":
                    break;
                case "restore text color":
                    break;
                case "list":
                    break;
                case "volume up":
                    break;
                case "volume down":
                    break;
                default:
                    break;
            }
        }
    }
    if(searchSequence(shortWord, "over")){
        console.log(shortWord);
    }
}

function searchSequence(shortWord, sequence) {
    return shortWord.includes(sequence);
}
