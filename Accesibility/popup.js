// Select all range input elements (brightness and contrast sliders)
const rangeInput = document.querySelectorAll('input[type="range"]'); 

// Select all elements that display the value of each slider
const value = document.querySelectorAll('.value'); 

// Select the main content container to apply filter effects
const container = document.querySelector('.container'); 

// set default values for brightness and contrast
let brightness = 100; 
let contrast = 100; 

// Loop through each slider to add event listeners and update displayed values
for (let i = 0; i < rangeInput.length; i++) {
	// Set the initial display of the slider value
	value[i].textContent = rangeInput[i].value; 
	
	// Add an input event listener to update values in real-time
	rangeInput[i].addEventListener('input', () => {
		// Update the displayed slider value when the slider is adjusted
		value[i].textContent = rangeInput[i].value; 

		// Update brightness or contrast based on which slider is being changed
		if (rangeInput[i].id === "bright") { 
			brightness = rangeInput[i].value; 
		}
		if (rangeInput[i].id === "contrast") { 
			contrast = rangeInput[i].value; 
		}

		// Apply both brightness and contrast adjustments to the container
		container.style.filter = `brightness(${brightness}%) contrast(${contrast}%)`; 
	});
}