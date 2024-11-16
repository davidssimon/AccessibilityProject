// check if high contrast is enabled when content loads
window.addEventListener("DOMContentLoaded", () => {
    const isHighContrast = localStorage.getItem("highContrast") === "true";
    if (isHighContrast) {
        document.body.classList.add("high-contrast");
        document.getElementById("contrast-toggle").textContent = "Disable";
    }
});

// CONTRAST TOGGLE
document.getElementById("contrast-toggle").addEventListener("click", function() {
    const isHighContrast = document.body.classList.toggle("high-contrast");
    this.textContent = isHighContrast ? "Disable" : "Enable";
    localStorage.setItem("highContrast", isHighContrast ? "true" : "false");
});

// WGAC SCREEN
document.getElementById("wgac-check").addEventListener("click", function () {
    const isHighContrast = localStorage.getItem("highContrast") === "true";
    document.body.innerHTML = `
        <div class="wgac-screen ${isHighContrast ? 'high-contrast' : ''}">
            <h2>WGAC Standards Check</h2>
            <ul id="wgac-standards-list"></ul>
            <span id="back-arrow" class="back-arrow">
                <i class="fas fa-arrow-left"></i>
            </span>
        </div>
    `;

    const standards = [
        { name: "Sample #1", pass: true },
        { name: "Sample #2", pass: true },
        { name: "Sample #3", pass: false },
        { name: "Sample #4", pass: true },
        { name: "Sample #5", pass: false },
    ];

    const list = document.getElementById("wgac-standards-list");
    standards.forEach((standard) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${standard.name}</span>
            <span class="${standard.pass ? "pass" : "fail"}">
                ${standard.pass ? "PASS" : "FAIL"}
            </span>
        `;
        list.appendChild(listItem);
    });

    document.getElementById("back-arrow").addEventListener("click", () => {
        location.reload();
    });
});

// VOICE CONTROL SCREEN
document.getElementById("voice-controls").addEventListener("click", function () {
    const isHighContrast = localStorage.getItem("highContrast") === "true";
    document.body.innerHTML = `
        <div class="voice-control-screen ${isHighContrast ? 'high-contrast' : ''}">
            <h2>Voice Control Commands</h2>
            <ul id="voice-commands-list">
                <li>Example #1</li>
                <li>Example #2</li>
                <li>Example #3</li>
                <li>Example #4</li>
            </ul>
            <span id="back-arrow" class="back-arrow">
                <i class="fas fa-arrow-left"></i>
            </span>
        </div>
    `;
    document.getElementById("back-arrow").addEventListener("click", () => {
        location.reload();
    });
});



