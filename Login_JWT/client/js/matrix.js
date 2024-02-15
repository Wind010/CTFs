// Adapted from Author:  https://codepen.io/ismail9k/pen/eZoGyz


// Select the canvas
var matrix = document.getElementById("matrix");

// Get canvas context
var ctx = matrix.getContext('2d');

// Configurations
var fontSize = 20,
    color = '#00FF98',
    background = 'rgba(34, 34, 41, 0.2)',
    speed = 50;
	charSet = "CTF JWT PURPOSE";
	charSet = charSet.split('');

// Calculations
var columns, rows, drops;

// Initialize the matrix
function initMatrix() {
    // Make canvas fill the screen
    matrix.width = window.innerWidth;
    matrix.height = window.innerHeight;

    columns = Math.floor(matrix.width / fontSize);
    rows = Math.floor(matrix.height / fontSize);

    // One drop per column, row set randomly
    drops = [];
    for (var column = 0; column < columns; column++) {
        drops[column] = getRandom(0, rows);
    }

    // Set font size
    ctx.font = fontSize + "px Courier New";
}

// Returns a random integer between min (included) and max (included)
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Draw function
function draw() {
    // Clear the screen with opacity of 0.05
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, matrix.width, matrix.height);

    // For each column / drop
    for (var column = 0; column < drops.length; column++) {
        ctx.fillStyle = color;
        // Pick a random character
        var char = charSet[getRandom(0, charSet.length - 1)];
        // Draw the character
        ctx.fillText(char, column * fontSize, drops[column] * fontSize);
        // Randomly reset drop back to top row
        if (Math.random() > 0.98) {
            drops[column] = 0;
        }

        drops[column]++; // Move drop down a row
    }
}

// Resize matrix when the window is resized
function resizeMatrix() {
    initMatrix();
    draw();
}

// Initialize the matrix and draw
initMatrix();
draw();

// Run draw function at regular intervals
setInterval(draw, speed);

// Add event listener for window resize
window.addEventListener('resize', resizeMatrix);
