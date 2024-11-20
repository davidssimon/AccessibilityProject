var ismagnifying = false;
annihilateMagnifier();

document.getElementById('myButton').addEventListener('click', function () {
    ismagnifying = !ismagnifying;
    if (ismagnifying) {
        magnifying();
    } else {
        annihilateMagnifier();
    }
});


function magnifying() {
    // Get slider elements
    var slider1 = document.getElementById("range1");
    var slider2 = document.getElementById("range2");
    var slider3 = document.getElementById("range3");
    var sliderMoved = false;

    // Function to initialize magnification for images
    function magnify(img, zoom) {
        var glass, w, h, bw;


        // Remove existing magnifier if one exists
        var existingGlass = img.parentElement.querySelector('.img-magnifier-glass');
        if (sliderMoved) {
            existingGlass?.remove();
        }


        // Create a wrapper div around the image
        var container = document.createElement("DIV");
        container.setAttribute("class", "img-magnifier-container");


        // Wrap the image in the container
        img.parentElement.insertBefore(container, img);
        container.appendChild(img);


        // Create magnifier glass
        glass = document.createElement("DIV");
        glass.setAttribute("class", "img-magnifier-glass");


        // Insert magnifier glass into the container
        container.appendChild(glass);


        // Set background properties for the magnifier glass
        glass.style.backgroundImage = "url('" + img.src + "')";
        glass.style.backgroundRepeat = "no-repeat";
        glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";


        bw = 3; // Border width
        w = glass.offsetWidth / 2; // Glass width
        h = glass.offsetHeight / 2; // Glass height


        // Initially hide the magnifier glass
        glass.classList.add('hidden'); // Add a class to hide magnifier initially


        // Execute a function when the mouse moves over the image or magnifier
        glass.addEventListener("mousemove", moveMagnifier);
        img.addEventListener("mousemove", moveMagnifier);


        // Also handle touch screens
        glass.addEventListener("touchmove", moveMagnifier);
        img.addEventListener("touchmove", moveMagnifier);


        // Hide magnifier when the mouse leaves the image or magnifier
        img.addEventListener("mouseleave", hideMagnifier);
        container.addEventListener("mouseleave", hideMagnifier);


        // Function to move the magnifier
        function moveMagnifier(e) {
            var pos, x, y;


            // Prevent any other actions that may occur when moving over the image
            e.preventDefault();


            // Get the cursor's x and y positions relative to the container
            pos = getCursorPos(e, container);
            x = pos.x;
            y = pos.y;


            // Prevent the magnifier glass from being positioned outside the container
            if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
            if (x < w / zoom) { x = w / zoom; }
            if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
            if (y < h / zoom) { y = h / zoom; }


            // Set the position of the magnifier glass
            glass.style.left = (x - w) + "px";
            glass.style.top = (y - h) + "px";


            // Display what the magnifier glass "sees"
            glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";

            // Get slider3 value and apply the transform to scale the glass
            var glassSize = (slider3.value * 0.1) + 1; // Scale based on slider3 value
            glass.style.transform = 'scale(' + glassSize + ')';  // Apply scaling transform
        }


        // Function to get the cursor position relative to the container, accounting for page scroll
        function getCursorPos(e, container) {
            var rect = container.getBoundingClientRect(); // Get the bounding rectangle of the container


            var x = e.pageX - rect.left - window.scrollX; // Adjust for page scroll
            var y = e.pageY - rect.top - window.scrollY;


            return { x: x, y: y };
        }


        // Function to hide the magnifier when the mouse leaves the image or the container
        function hideMagnifier() {
            glass.classList.add('hidden'); // Add 'hidden' class to hide the magnifier
        }


        // Function to show the magnifier when the mouse enters the image
        img.addEventListener("mouseenter", function () {
            if (ismagnifying) {
                glass.classList.remove('hidden'); // Remove the 'hidden' class to show the magnifier
                img.style.cursor = 'none';
            }
        });
    }


    // Function to initialize magnification for text
    function magnifyText(container, zoom) {
        var glass;
        var text = container.innerText; // Get the raw text
        container.innerHTML = ''; // Clear the content


        // Create the glass element
        glass = document.createElement('div');
        glass.setAttribute('class', 'magnifier-glass');
        document.body.appendChild(glass);


        // Create a new text container with span elements for each word, preserving spaces
        var words = text.split(/(\s+)/); // Split by spaces but keep the spaces
        words.forEach(function (word) {
            if (word.trim() !== '') {
                var wordSpan = document.createElement('span');
                wordSpan.classList.add('magnifier-word');
                wordSpan.innerText = word; // Preserve the word or space
                container.appendChild(wordSpan);
            } else {
                // Add a space as an inline element to preserve spacing
                container.appendChild(document.createTextNode(' '));
            }
        });


        // Add mouseover and mousemove events to each word
        var wordElements = container.getElementsByClassName('magnifier-word');


        Array.from(wordElements).forEach(function (wordElement, index) {
            wordElement.addEventListener('mouseenter', function (e) {
                // When mouse enters the word, update the current word index
                currentWordIndex = index;
                updateMagnifierContent(wordElement);
                glass.style.visibility = 'visible'; // Show the magnifier glass
                wordElement.style.position = 'relative'; // Adjust positioning for each word
            });


            wordElement.addEventListener('mousemove', function (e) {
                moveMagnifier(e, glass, zoom, wordElement);
            });


            wordElement.addEventListener('mouseleave', function () {
                glass.style.visibility = 'hidden'; // Hide the magnifier glass
            });
        });


        // Function to move the magnifier glass
        function moveMagnifier(e, glass, zoom, wordElement) {
            var rect = wordElement.getBoundingClientRect(); // Get the bounding rect of the word
            var wordLeft = rect.left;
            var wordTop = rect.top;


            // Add scroll offsets to the position to account for page scrolling
            var scrollX = window.scrollX || document.documentElement.scrollLeft;
            var scrollY = window.scrollY || document.documentElement.scrollTop;


            // Calculate the position of the magnifier, accounting for scroll position
            glass.style.left = (wordLeft + scrollX) + 'px';
            glass.style.top = (wordTop + scrollY) + 'px';


            // Get font size in pixels
            var fontSize = window.getComputedStyle(wordElement).fontSize;
            var fontSizePx = parseFloat(fontSize);


            // Set the background image with zoomed-in text
            glass.style.backgroundImage = 'url("data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" style="font-size:' + (fontSizePx * zoom) + 'px;">' + wordElement.innerText + '</div></foreignObject></svg>') + '")';


            // Calculate the magnified size of the word based on the font size and zoom
            var wordWidth = rect.width;
            var wordHeight = rect.height;


            // Set the magnifier glass size (scaled by zoom factor)
            glass.style.width = wordWidth * zoom + 'px';
            glass.style.height = wordHeight * zoom + 'px';
            glass.style.backgroundSize = (wordWidth * zoom) + 'px ' + (wordHeight * zoom) + 'px';
            glass.style.backgroundRepeat = 'no-repeat';
            glass.style.backgroundPosition = 'center center';
        }


        // Variables to track the current word index
        var currentWordIndex = 0;


        // Function to move the magnifier to the word at the current index
        function updateMagnifierContent(wordElement) {
            var rect = wordElement.getBoundingClientRect();
            var scrollX = window.scrollX || document.documentElement.scrollLeft;
            var scrollY = window.scrollY || document.documentElement.scrollTop;
            glass.style.left = (rect.left + scrollX) + 'px';
            glass.style.top = (rect.top + scrollY) + 'px';


            // Update magnifier content to show the new word being zoomed
            var fontSize = window.getComputedStyle(wordElement).fontSize;
            var fontSizePx = parseFloat(fontSize);


            // Update magnifier background image to reflect the word at the new index
            glass.style.backgroundImage = 'url("data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" style="font-size:' + (fontSizePx * zoom) + 'px;">' + wordElement.innerText + '</div></foreignObject></svg>') + '")';


            // Update the magnifier's size
            var wordWidth = rect.width;
            var wordHeight = rect.height;
            glass.style.width = wordWidth * zoom + 'px';
            glass.style.height = wordHeight * zoom + 'px';
            glass.style.backgroundSize = (wordWidth * zoom) + 'px ' + (wordHeight * zoom) + 'px';
            glass.style.backgroundRepeat = 'no-repeat';
            glass.style.backgroundPosition = 'center center';
        }


        // Function to move to the next or previous word based on current index
        function moveRelativeToCurrentIndex(offset) {
            var wordElements = container.getElementsByClassName('magnifier-word');
            var newIndex = currentWordIndex + offset;


            // Ensure the new index is within bounds
            if (newIndex >= 0 && newIndex < wordElements.length) {
                currentWordIndex = newIndex;
                var wordElement = wordElements[currentWordIndex];
                updateMagnifierContent(wordElement);
            }
        }


        // Add keyboard event listener to move magnifier with arrow keys
        document.addEventListener('keydown', function (e) {
            var wordElements = container.getElementsByClassName('magnifier-word');
            if (wordElements.length === 0) return; // No words to navigate


            if (e.key === 'ArrowRight') {
                // Move to the next word relative to current index
                moveRelativeToCurrentIndex(1);
            } else if (e.key === 'ArrowLeft') {
                // Move to the previous word relative to current index
                moveRelativeToCurrentIndex(-1);
            }
        });


        // Initially place the magnifier on the first word
        updateMagnifierContent(wordElements[currentWordIndex]);
    }


    // Apply the magnifier function to all images on the page
    const images = document.querySelectorAll("img");
    images.forEach(img => {
        magnify(img, slider1.value); // Set initial zoom level based on slider1 value
    });


    // Apply the magnifier function to all text blocks (headers and paragraphs)
    const textContainers = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a');
    textContainers.forEach(container => {
        magnifyText(container, slider2.value); // Set initial zoom level based on slider2 value
    });


    // Add event listener to slider1 to update zoom for images
    slider1.addEventListener("input", function () {
        if (ismagnifying) {
            images.forEach(img => {
                sliderMoved = true;
                magnify(img, slider1.value); // Update magnification for images based on slider1
            });
        }
    });


    // Add event listener to slider2 to update zoom for text
    slider2.addEventListener("input", function () {
        if (ismagnifying) {
            textContainers.forEach(container => {
                magnifyText(container, slider2.value); // Update magnification for text based on slider2
            });
        }
    });
}

function annihilateMagnifier() {
    // Remove all magnifier glasses for images
    var existingGlasses = document.querySelectorAll('.img-magnifier-glass');
    existingGlasses.forEach(function (glass) {
        glass.remove(); // Remove the magnifier glass element
    });

    // Reset any images that were wrapped in a magnification container
    var containers = document.querySelectorAll('.img-magnifier-container');
    containers.forEach(function (container) {
        var img = container.querySelector('img');
        if (img) {
            // Restore the image to its original position if it was wrapped
            container.parentElement.insertBefore(img, container);
        }
        container.remove(); // Remove the container div around the image
    });

    // Remove any added magnifier text glasses
    var textGlasses = document.querySelectorAll('.magnifier-glass');
    textGlasses.forEach(function (glass) {
        glass.remove(); // Remove the magnifier glass for text
    });

    // Reset all text elements (just in case any special styling was applied)
    var textContainers = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a');
    textContainers.forEach(function (container) {
        // Remove any special styling added to text containers
        container.innerHTML = container.innerText; // Reset the content to normal text
    });

    // Ensure the cursor is visible for images and text
    var images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.cursor = 'default'; // Set cursor to default for images
    });

    var textContainers = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a');
    textContainers.forEach(function (container) {
        container.style.cursor = 'default'; // Set cursor to default for text containers
    });
}

