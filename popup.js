var port = chrome.runtime.connect();
port.postMessage({ action: 'start' });

var slide = document.getElementById('slide');
var label = document.getElementById('label');

port.postMessage({ action: 'give value' });
port.onMessage.addListener(function (msg) {
  slide.value = parseInt(msg);
});

slide.addEventListener('input', function () {
  chrome.runtime.sendMessage({
    type: 'change-vol',
    target: 'offscreen',
    data: this.value
  });

  var rounded = Math.round(this.value * 100);
  label.innerText = "Volume: " + rounded + "%";
});

button.onclick = function () {
  chrome.runtime.sendMessage({
    type: 'stop-streaming',
    target: 'offscreen'
  });
  window.close();
}