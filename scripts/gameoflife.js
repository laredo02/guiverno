const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const cellSize = 10;
const rows = canvas.height / cellSize;
const cols = canvas.width / cellSize;

let grid = createGrid();
let interval;

// Initialize grid with random cells
function createGrid() {
    const arr = [];
    for (let y = 0; y < rows; y++) {
        arr[y] = [];
        for (let x = 0; x < cols; x++) {
            arr[y][x] = Math.random() > 0.7 ? 1 : 0;
        }
    }
    return arr;
}

// Draw the grid
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            ctx.fillStyle = grid[y][x] ? 'black' : 'white';
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

// Compute the next generation
function nextGeneration() {
    const newGrid = createEmptyGrid();
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const neighbors = countNeighbors(x, y);
            if (grid[y][x] === 1) {
                newGrid[y][x] = (neighbors === 2 || neighbors === 3) ? 1 : 0;
            } else {
                newGrid[y][x] = (neighbors === 3) ? 1 : 0;
            }
        }
    }
    grid = newGrid;
    drawGrid();
}

// Count alive neighbors
function countNeighbors(x, y) {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
                count += grid[ny][nx];
            }
        }
    }
    return count;
}

// Create empty grid
function createEmptyGrid() {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
}

// Start/stop simulation
document.getElementById('startBtn').addEventListener('click', () => {
    if (!interval) interval = setInterval(nextGeneration, 200);
});

document.getElementById('stopBtn').addEventListener('click', () => {
    clearInterval(interval);
    interval = null;
});

// Initial draw
drawGrid();
