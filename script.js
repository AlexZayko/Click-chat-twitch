// script.js

let totalClicks = 0;
const clickData = {}; // Stores click count for each area
const radius = 75; // Defines the area of clicks to group together
const maxCircleSize = 150; // Max size of the circle
const minCircleSize = 50;  // Minimum size of the circle

document.body.addEventListener('click', (event) => {
    const x = event.clientX;
    const y = event.clientY;

    // Identify the click location based on the x and y coordinates
    const clickKey = `${Math.floor(x / radius)},${Math.floor(y / radius)}`;

    // Track the number of clicks in this region
    if (!clickData[clickKey]) {
        clickData[clickKey] = 0;
    }

    clickData[clickKey]++;
    totalClicks++;

    // Calculate the percentage of clicks in this region relative to total clicks
    let percentage = (clickData[clickKey] / totalClicks) * 100;

    // Calculate how the percentages should be split across all areas
    const totalPercentage = Object.values(clickData).reduce((acc, clicks) => {
        return acc + (clicks / totalClicks) * 100;
    }, 0);

    // Update each circle to reflect the percentage contribution based on total clicks
    for (let key in clickData) {
        const areaPercentage = (clickData[key] / totalClicks) * 100;
        const circleSize = Math.min(minCircleSize + (areaPercentage / 100) * (maxCircleSize - minCircleSize), maxCircleSize);
        const percentageCircle = document.querySelector(`.percentage[data-key="${key}"]`);

        if (percentageCircle) {
            // Update the existing circle
            percentageCircle.style.width = `${circleSize}px`;
            percentageCircle.style.height = `${circleSize}px`;
            percentageCircle.textContent = `${areaPercentage.toFixed(1)}%`;
        } else {
            // Create a new circle
            const newCircle = document.createElement('div');
            newCircle.classList.add('percentage');
            newCircle.setAttribute('data-key', key);
            document.body.appendChild(newCircle);

            newCircle.style.width = `${circleSize}px`;
            newCircle.style.height = `${circleSize}px`;
            newCircle.textContent = `${areaPercentage.toFixed(1)}%`;
        }
    }

    // Position the new circle directly at the cursor
    const newCircle = document.querySelector(`.percentage[data-key="${clickKey}"]`);
    if (newCircle) {
        newCircle.style.left = `${x}px`;
        newCircle.style.top = `${y}px`;
    }
});
