document.addEventListener("DOMContentLoaded", function () {
    const expand_btn = document.querySelector(".expand-btn");
    const sidebarLinks = document.querySelectorAll(".sidebar-links a");
    const searchInput = document.querySelector(".search__wrapper input");
    const percentageTags = document.querySelectorAll(".percentage-tag");
    const percentageTags1 = document.querySelectorAll(".percentage-tag1");
    const percentageTags2 = document.querySelectorAll(".percentage-tag2");
    const circlePath = document.getElementById("dynamic-circle");
    const circlePath1 = document.getElementById("dynamic-circle1");
    const circlePath2 = document.getElementById("dynamic-circle2");

    // Check if the expand button exists
    if (expand_btn) {
        expand_btn.addEventListener("click", () => {
            document.body.classList.toggle("collapsed");
        });
    } else {
        console.error("Expand button not found.");
    }

    // Update the 'active' class based on the clicked link
    sidebarLinks.forEach((elem) => {
        elem.addEventListener("click", function () {
            const hrefLinkClick = elem.href;
            sidebarLinks.forEach((link) => {
                if (link.href === hrefLinkClick) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            });
        });
    });

    // Remove the collapsed class when the search input is focused
    if (searchInput) {
        searchInput.addEventListener("focus", () => {
            document.body.classList.remove("collapsed");
        });
    } else {
        console.error("Search input not found.");
    }

    // Function to generate a random percentage between 60 and 100
    function generateRandomPercentage() {
        return Math.floor(Math.random() * 41) + 60; // Generates a random number between 60 and 100
    }

    // Function to generate a random temperature between 30 and 50
    function generateRandomTemperature() {
        return (Math.random() * 5 + 30).toFixed(1); // Generates a random number between 30 and 35
    }
    

    // Function to generate a random blood pressure value between 85 and 97
    function generateRandomBloodPressure() {
        return Math.floor(Math.random() * 6) + 90; // Generates a random number between 90 and 95
    }
    

    // Function to generate a random heart rate value between 60 and 180 BPM
    function generateRandomHeartRate() {
        return Math.floor(Math.random() * 11) + 100; // Generates a random number between 100 and 110 BPM
    }
    

    // Function to update the percentage tags, temperature, blood pressure, and heart rate
    function updateValues() {
        // Generate percentages for each path
        const percentage1 = generateRandomPercentage();
        const percentage2 = generateRandomPercentage();
        const percentage3 = generateRandomPercentage();

        console.log("Updating percentages: ", percentage1, percentage2, percentage3);

        // Update all elements with the class 'percentage-tag'
        percentageTags.forEach((element) => {
            element.textContent = percentage1 + "%";
        });

        // Update all elements with the class 'percentage-tag1'
        percentageTags1.forEach((element) => {
            element.textContent = percentage2 + "%";
        });

        // Update all elements with the class 'percentage-tag2'
        percentageTags2.forEach((element) => {
            element.textContent = percentage3 + "%";
        });

        // Update stroke-dasharray for the first SVG path
        if (circlePath) {
            const strokeLength = circlePath.getTotalLength();
            const dashLength = (percentage1 / 100) * strokeLength;
            circlePath.style.strokeDasharray = `${dashLength}, ${strokeLength - dashLength}`;
        } else {
            console.error("Could not find the SVG path element with ID 'dynamic-circle'.");
        }

        // Update stroke-dasharray for the second SVG path
        if (circlePath1) {
            const strokeLength1 = circlePath1.getTotalLength();
            const dashLength1 = (percentage2 / 100) * strokeLength1;
            circlePath1.style.strokeDasharray = `${dashLength1}, ${strokeLength1 - dashLength1}`;
        } else {
            console.error("Could not find the SVG path element with ID 'dynamic-circle1'.");
        }

        // Update stroke-dasharray for the third SVG path
        if (circlePath2) {
            const strokeLength2 = circlePath2.getTotalLength();
            const dashLength2 = (percentage3 / 100) * strokeLength2;
            circlePath2.style.strokeDasharray = `${dashLength2}, ${strokeLength2 - dashLength2}`;
        } else {
            console.error("Could not find the SVG path element with ID 'dynamic-circle2'.");
        }

        // Update heart rate with random value in BPM
        const heartRate = generateRandomHeartRate();
        const heartRateElement = document.getElementById("heart-rate");
        if (heartRateElement) {
            heartRateElement.textContent = heartRate + "bpm";
        } else {
            console.error("Could not find the heart rate element.");
        }

        // Update temperature
        const temperature = generateRandomTemperature();
        const temperatureElement = document.getElementById("temperature");
        if (temperatureElement) {
            temperatureElement.textContent = temperature + "°C";
        } else {
            console.error("Could not find the temperature element.");
        }

        // Update blood pressure
        const bloodPressure = generateRandomBloodPressure();
        const bloodPressureElement = document.getElementById("blood-pressure");
        if (bloodPressureElement) {
            bloodPressureElement.textContent = bloodPressure + "%";
        } else {
            console.error("Could not find the blood pressure element.");
        }
    }

    // Update the values at intervals
    setInterval(updateValues, 1000); // Updates every 1 second for percentage and blood pressure
    setInterval(() => {
        const temperatureElement = document.getElementById("temperature");
        if (temperatureElement) {
            temperatureElement.textContent = generateRandomTemperature() + "°C";
        }
    }, 10000); // Updates temperature every 10 seconds

    // Initial call to set the values on page load
    updateValues();
});









