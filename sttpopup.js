document.getElementById("voice-controls").addEventListener("click", function() {
    // Open the second popup
    let url = chrome.runtime.getURL("sttpopup.html"); // Adjust if needed
    window.open(url, "_blank", "width=400,height=300");
});