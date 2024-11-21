//Giving values for elements from the html file, specifically the contrast slider
const contrastSlider = document.getElementById("contrast");
const contrastValueText = document.getElementById("contrast-value");

//Giving values for elements from the html file, specifically the contrast slider
const brightnessSlider = document.getElementById("brightness");
const brightnessValueText = document.getElementById("brightness-value");

//Select the error message container
const errorMessage = document.getElementById("error-message");

function applyFilters(contrast, brightness) {
  //Query the tab that the user is active on
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0]; //mark it as active in the array

    //check if the url is restricted or not
    if (tab.url.startsWith("chrome://") || tab.url.startsWith("https://chrome.google.com")) {
      //display an error message if it is restricted
      errorMessage.innerText = "Cannot adjust settings on this page.";
      errorMessage.style.display = "block"; //how the error message
      return;
    }

    //hide the error message if the url is not restricted
    errorMessage.style.display = "none";

    //injecting a script to apply filters
    chrome.scripting.executeScript({
      target: { tabId: tab.id }, //specifying to the active tab
      func: (contrast, brightness) => {
        //executing the function and giving it values
        document.body.style.filter = `contrast(${contrast}%) brightness(${brightness}%)`;
      },
      args: [contrast, brightness], //pass contrast and brightness as arguments
    });
  });
}

// event listener for any changes made to the contrast slider
contrastSlider.addEventListener("input", (e) => {
  const contrastValue = e.target.value; //get the new value of the slider
  contrastValueText.innerText = `${contrastValue}%`; //displaying the new value

  //update and apply new value to the filter
  applyFilters(contrastValue, brightnessSlider.value);
});

//event listener for any changes made to the brightness slider
brightnessSlider.addEventListener("input", (e) => {
  const brightnessValue = e.target.value; //get the new value of the slider
  brightnessValueText.innerText = `${brightnessValue}%`; //displaying the new value

  //update and apply new value to the filter
  applyFilters(contrastSlider.value, brightnessValue);
});