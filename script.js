document.addEventListener('DOMContentLoaded', function () {
    const textContainer = document.getElementById('textContainer');
    const circle = document.getElementById('circle');
    const originalText = "DIVYANSH";
    const changedText = "DEVLOPER"; // Exact replacement without extra spaces
    const radius = 150; // Radius for effect

    // Split the text into individual <span> elements, keeping spaces intact
    textContainer.innerHTML = originalText
        .split('')
        .map((letter, index) => {
            // Check if the letter is a space, and add a non-breaking space (&nbsp;)
            if (letter === ' ') {
                return `<span class="letter space" data-index="${index}">&nbsp;</span>`;
            }
            return `<span class="letter" data-index="${index}">${letter}</span>`;
        })
        .join('');

    const letters = document.querySelectorAll('.letter');

    textContainer.addEventListener('mousemove', function (event) {
        const { clientX: x, clientY: y } = event;

        // Move the circle with the mouse
        circle.style.left = `${x - radius}px`;
        circle.style.top = `${y - radius}px`;
        circle.style.display = 'block';

        letters.forEach((letter, index) => {
            const letterRect = letter.getBoundingClientRect();
            const letterX = letterRect.left + letterRect.width / 2;
            const letterY = letterRect.top + letterRect.height / 2;
            const distance = Math.sqrt((letterX - x) ** 2 + (letterY - y) ** 2);

            // If the letter is within the radius, replace the text and invert color
            if (distance < radius) {
                // Ensure spaces are handled correctly during hover
                if (originalText[index] === ' ') {
                    letter.innerHTML = '&nbsp;'; // Preserve the space
                } else if (changedText[index]) {
                    letter.textContent = changedText[index]; // Replace with "SOFTWARE ENGINEER" characters
                } else {
                    letter.textContent = ''; // Clear any extra characters from the original text
                }
                letter.style.filter = 'invert(1)'; // Invert colors
            } else {
                // Ensure spaces are handled correctly when reverting
                if (originalText[index] === ' ') {
                    letter.innerHTML = '&nbsp;'; // Restore the space
                } else {
                    letter.textContent = originalText[index]; // Revert to original text
                }
                letter.style.filter = 'invert(0)'; // Reset to original colors
            }
        });
    });

    textContainer.addEventListener('mouseleave', function () {
        circle.style.display = 'none'; // Hide the circle when mouse leaves
        letters.forEach((letter, index) => {
            if (originalText[index] === ' ') {
                letter.innerHTML = '&nbsp;'; // Restore the space
            } else {
                letter.textContent = originalText[index]; // Reset to original text
            }
            letter.style.filter = 'invert(0)'; // Reset all letters to original colors
        });
    });
});
