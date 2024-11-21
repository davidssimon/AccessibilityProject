document.getElementById("text-to-speech").addEventListener("click", function() {
    // Open the second popup
    let url = chrome.runtime.getURL("ttspopup.html"); // Adjust if needed
    window.open(url, "_blank", "width=400,height=300");
});
