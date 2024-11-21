//offscreen document is what actually controls the volume, as well as receives messages from the rest of the extension
var media, output, source;

chrome.runtime.onMessage.addListener(async (message) => { //listens for messages from other javascript files
  if (message.target === 'offscreen') {
    switch (message.type) {
      case 'start-streaming':
        start(message.data);
        break;
      case 'reset':
        volume(1); //reset to 100% volume
        break;
      case 'change-vol':
        volume(message.data);
        break;
      default: //if the message is not valid 
        throw new Error('Unrecognized message:', message.type);
    }
  }
});

async function start(streamId) {

  media = await navigator.mediaDevices.getUserMedia({
    audio: {
      mandatory: {
        chromeMediaSource: 'tab',
        chromeMediaSourceId: streamId
      }
    },
    video: false //still works on things like YouTube
  });

  // Continue to play the captured audio to the user.
  output = new AudioContext();
  source = output.createMediaStreamSource(media);
  // Create a gain node.
  gainNode = output.createGain();
  gainNode.gain.value = 1;
  // Connect the gain node to the destination.
  source.connect(gainNode).connect(output.destination);
}

//commented out in case i want to use it
// async function stop() {
//   media.getAudioTracks()[0].stop();
//   output.close();
// }

async function volume(vol) {
  gainNode.gain.value = vol;
}