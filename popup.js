var port = chrome.runtime.connect();

var slide = document.getElementById('vol-slider');
var label = document.getElementById('vol-label');
var btn = document.getElementById('vol-button');

port.onMessage.addListener(function (msg) {
  slide.value = parseInt(msg);
  label.innerText = "Volume: " + Math.round(msg * 100) + "%";
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

btn.onclick = function () {
  chrome.runtime.sendMessage({
    type: 'reset',
    target: 'offscreen'
  });
  
  slide.value = 1;
  label.innerText = "Volume: 100%";
}
