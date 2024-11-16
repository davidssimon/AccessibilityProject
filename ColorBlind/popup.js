// Select the contrast slider and its label
const contrastSlider = document.getElementById("contrast");
const contrastValueText = document.getElementById("contrast-value");

// Select the brightness slider and its associated label
const brightnessSlider = document.getElementById("brightness");
const brightnessValueText = document.getElementById("brightness-value");

// Select the error message container
const errorMessage = document.getElementById("error-message");

/**
 * Function to apply contrast and brightness filters to the current webpage
 * @param {number} contrast - Contrast value (percentage)
 * @param {number} brightness - Brightness value (percentage)
 */
function applyFilters(contrast, brightness) {
  // Query the currently active tab in the current window
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0]; // Get the active tab's details

    // Check if the tab's URL is restricted
    if (tab.url.startsWith("chrome://") || tab.url.startsWith("https://chrome.google.com")) {
      // Display an error message if the tab is restricted
      errorMessage.innerText = "Cannot adjust settings on this page.";
      errorMessage.style.display = "block"; // Show the error message
      return;
    }

    // Hide the error message if the URL is valid
    errorMessage.style.display = "none";

    // Inject a script into the active tab to apply the filters
    chrome.scripting.executeScript({
      target: { tabId: tab.id }, // Specify the active tab
      func: (contrast, brightness) => {
        // Function executed in the tab's context
        document.body.style.filter = `contrast(${contrast}%) brightness(${brightness}%)`;
      },
      args: [contrast, brightness], // Pass contrast and brightness as arguments
    });
  });
}

// Event listener for changes to the contrast slider
contrastSlider.addEventListener("input", (e) => {
  const contrastValue = e.target.value; // Get the current value of the slider
  contrastValueText.innerText = `${contrastValue}%`; // Update the displayed value

  // Apply the updated contrast and the current brightness
  applyFilters(contrastValue, brightnessSlider.value);
});

// Event listener for changes to the brightness slider
brightnessSlider.addEventListener("input", (e) => {
  const brightnessValue = e.target.value; // Get the current value of the slider
  brightnessValueText.innerText = `${brightnessValue}%`; // Update the displayed value

  // Apply the updated brightness and the current contrast
  applyFilters(contrastSlider.value, brightnessValue);
});
