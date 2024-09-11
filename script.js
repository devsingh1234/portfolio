document.addEventListener('DOMContentLoaded', function () {
    const textContainer = document.getElementById('textContainer');
    const circle = document.getElementById('circle');
    const originalText = "DIVYANSH";
    const changedText = "DEVELOPER";
    const radius = 150;

    // Split the text into individual <span> elements, keeping spaces intact
    textContainer.innerHTML = originalText
        .split('')
        .map((letter, index) => {
            if (letter === ' ') {
                return `<span class="letter space" data-index="${index}">&nbsp;</span>`;
            }
            return `<span class="letter" data-index="${index}">${letter}</span>`;
        })
        .join('');

    const letters = document.querySelectorAll('.letter');

    // Common function to handle both mouse and touch movement
    function handleMove(x, y) {
        circle.style.left = `${x - radius}px`;
        circle.style.top = `${y - radius}px`;
        circle.style.display = 'block';

        letters.forEach((letter, index) => {
            const letterRect = letter.getBoundingClientRect();
            const letterX = letterRect.left + letterRect.width / 2;
            const letterY = letterRect.top + letterRect.height / 2;
            const distance = Math.sqrt((letterX - x) ** 2 + (letterY - y) ** 2);

            if (distance < radius) {
                letter.textContent = changedText[index] || '';
                letter.style.filter = 'invert(1)';
            } else {
                letter.textContent = originalText[index] || '';
                letter.style.filter = 'invert(0)';
            }
        });
    }

    // Mouse move event
    textContainer.addEventListener('mousemove', function (event) {
        handleMove(event.clientX, event.clientY);
    });

    // Touch move event for mobile
    textContainer.addEventListener('touchmove', function (event) {
        const touch = event.touches[0];
        handleMove(touch.clientX, touch.clientY);
    });

    // Hide circle and reset letters when the mouse or touch leaves
    function resetText() {
        circle.style.display = 'none';
        letters.forEach((letter, index) => {
            letter.textContent = originalText[index];
            letter.style.filter = 'invert(0)';
        });
    }

    textContainer.addEventListener('mouseleave', resetText);
    textContainer.addEventListener('touchend', resetText);
});
