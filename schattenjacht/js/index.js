const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const rows = 10;
const cols = 10;
const cellSize = 50;
const randomCells = [];
const treasureCells = [];
let enemyCell;
let userCell;
const cells = [];

function fillCellsWithGreen() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * cellSize;
      const y = row * cellSize;
      cells.push({ row: row, col: col, x: x, y: y });
      
      // Fill the cell with green
      ctx.fillStyle = 'green';
      ctx.fillRect(x, y, cellSize, cellSize);
      
      // Draw the border
      ctx.strokeStyle = 'black';
      ctx.strokeRect(x, y, cellSize, cellSize);
    }
  }
}

fillCellsWithGreen();

// Function to check if a cell is in an array
function cellExists(cell, array) {
  return array.some(c => c.row === cell.row && c.col === cell.col);
}

// Select 10 random cells
for (let i = 0; i < 10; i++) {
  const randomIndex = Math.floor(Math.random() * cells.length);
  randomCells.push(cells.splice(randomIndex, 1)[0]);
}

console.log(randomCells); // de nieuwe array met 10 willekeurige objecten

// Select 10 random treasure cells, ensuring no overlap with randomCells
while (treasureCells.length < 3) {
  const randomIndex = Math.floor(Math.random() * cells.length);
  const selectedCell = cells[randomIndex];
  
  if (!cellExists(selectedCell, randomCells)) {
    treasureCells.push(cells.splice(randomIndex, 1)[0]);
  }
}

// Select a random cell for the enemy, ensuring no overlap with randomCells or treasureCells
while (!enemyCell || cellExists(enemyCell, randomCells) || cellExists(enemyCell, treasureCells)) {
  const randomIndex = Math.floor(Math.random() * cells.length);
  enemyCell = cells[randomIndex];
}

// Select a random cell for the user, ensuring no overlap with randomCells, treasureCells, or enemyCell
while (!userCell || cellExists(userCell, randomCells) || cellExists(userCell, treasureCells) || (enemyCell && (userCell.row === enemyCell.row && userCell.col === enemyCell.col))) {
  const randomIndex = Math.floor(Math.random() * cells.length);
  userCell = cells[randomIndex];
}

function colorRandomCellsBrown() {
  randomCells.forEach(cell => {
    ctx.fillStyle = 'brown';
    ctx.fillRect(cell.x, cell.y, cellSize, cellSize);
    
    // Draw the border again
    ctx.strokeStyle = 'black';
    ctx.strokeRect(cell.x, cell.y, cellSize, cellSize);
  });
}

colorRandomCellsBrown();

function drawTreasures() {
  treasureCells.forEach(cell => {
    ctx.fillStyle = 'gold';
    ctx.fillRect(cell.x, cell.y, cellSize, cellSize);
    
    // Draw the border again
    ctx.strokeStyle = 'black';
    ctx.strokeRect(cell.x, cell.y, cellSize, cellSize);
  });
}

drawTreasures();

function drawEnemy() {
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(enemyCell.x + cellSize / 2, enemyCell.y + cellSize / 2, cellSize / 3, 0, Math.PI * 2);
  ctx.fill();
}

drawEnemy();

function drawUser() {
  ctx.fillStyle = 'blue';
  ctx.beginPath();
  ctx.arc(userCell.x + cellSize / 2, userCell.y + cellSize / 2, cellSize / 3, 0, Math.PI * 2);
  ctx.fill();
}

drawUser();