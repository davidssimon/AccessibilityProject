    const startStopButton = document.getElementById('startStopButton');
        const resultDiv = document.getElementById('result');
        const stupidthing = document.getElementById('dumbshit');
        stupidthing.onclick=textToSpeech;
        const textStorage = document.getElementById('textInput');
        const SpeechRecognition = window.SpeechRecongition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.interimResults = true;
        recognition.continuous = true;
        let listening = false;
        let transcript = ' ';
        var wordArray = [];
        var remain ='';
        var record = true;
        var result ="";
        var command = false;
        var word = transcript.substring(transcript.lastIndexOf(" "),transcript.length);
        recognition.onresult = (event) => {
            transcript = ' ';
            word = transcript.substring(transcript.lastIndexOf(" "),transcript.length-1);
            for (let i = 0; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
            resultDiv.innerHTML = transcript;
            remain = transcript;
            
            for(i=0;i<wordArray.length;i++){
                wordArray[i] = remain.substring(0,remain.indexOf(" "));
                remain = remain.substring(wordArray[i].length,remain.length);
            }
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
        function commandWords(word){
            var shortWord = word.substring(word.lastIndexOf("command"),word.length);
            console.log(shortWord);
            switch (word){
                case ' stop':
                    record=false;
                    break;
                case ' start':
                    record = true;
                    break;
                case ' read':
                    textToSpeech();
                    break;
                default: 
                    break;
            }
        }