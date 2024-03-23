document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
});

const kite = document.getElementById('kite');

let xPosition = 0;
let yPosition = 0;
let xSpeed = 2; // Adjust for horizontal speed
let ySpeed = 2; // Adjust for vertical speed

function animate() {
    xPosition += xSpeed;
    yPosition += ySpeed;

    if (xPosition <= 0 || xPosition >= window.innerWidth - kite.offsetWidth) {
        xSpeed *= -1; // Reverse direction on horizontal edges
    }

    if (yPosition <= 0 || yPosition >= window.innerHeight - kite.offsetHeight) {
        ySpeed *= -1; // Reverse direction on vertical edges
    }

    kite.style.left = xPosition + 'px';
    kite.style.top = yPosition + 'px';

    requestAnimationFrame(animate); // Continue the loop
}

animate();

// You can expand this script to change more styles or elements for the 'dark-theme' class

