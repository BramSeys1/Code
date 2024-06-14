const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const rows = 10;
const cols = 10;
const cellSize = 50;
const randomCells = [];
let treasures = [];
let enemyCell;
let userCell;
let score = 0; // Initialize score
let gameover = false; // Game over flag
let won = false; // Game won flag
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

// Select 10 random cells as brown cells (walls)
for (let i = 0; i < 10; i++) {
  const randomIndex = Math.floor(Math.random() * cells.length);
  randomCells.push(cells.splice(randomIndex, 1)[0]);
}

console.log(randomCells); // Array with 10 random brown cells

// Select 3 random treasure cells, ensuring no overlap with randomCells
while (treasures.length < 3) {
  const randomIndex = Math.floor(Math.random() * cells.length);
  const selectedCell = cells[randomIndex];
  
  if (!cellExists(selectedCell, randomCells)) {
    treasures.push(cells.splice(randomIndex, 1)[0]);
  }
}

console.log(treasures); // Array with 3 random treasure objects

// Select a random cell for the enemy, ensuring no overlap with randomCells, treasures, or userCell
while (!enemyCell || cellExists(enemyCell, randomCells) || treasures.some(t => t.row === enemyCell.row && t.col === enemyCell.col) || (userCell && (userCell.row === enemyCell.row && userCell.col === enemyCell.col))) {
  const randomIndex = Math.floor(Math.random() * cells.length);
  enemyCell = cells[randomIndex];
}

console.log(enemyCell); // Random enemy object

// Select a random cell for the user, ensuring no overlap with randomCells, treasures, or enemyCell
while (!userCell || cellExists(userCell, randomCells) || treasures.some(t => t.row === userCell.row && t.col === userCell.col) || (enemyCell && (userCell.row === enemyCell.row && userCell.col === enemyCell.col))) {
  const randomIndex = Math.floor(Math.random() * cells.length);
  userCell = cells[randomIndex];
}

console.log(userCell); // Random user object

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
  treasures.forEach(treasure => {
    if (!treasure.collected) {
      ctx.fillStyle = 'gold';
      ctx.fillRect(treasure.x, treasure.y, cellSize, cellSize);
      
      // Draw the border again
      ctx.strokeStyle = 'black';
      ctx.strokeRect(treasure.x, treasure.y, cellSize, cellSize);
    }
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

// Function to update score and HTML display
function updateScore(newScore) {
  score += newScore;
  document.getElementById('score').textContent = score;
  // Check if the user has collected all treasures
  if (score === 3) {
    won = true;
    alert('Congratulations! You collected all treasures and won the game!');
  }
}

// Function to check if the enemy caught the user
function checkGameOver() {
  if (!won && !gameover && enemyCell.row === userCell.row && enemyCell.col === userCell.col) {
    gameover = true;
    alert('Game Over! The enemy caught you.');
  }
}

// Function to move the enemy towards the user
function moveEnemy() {
  if (!gameover && !won) {
    // Determine direction towards the user
    let dx = 0, dy = 0;
    if (enemyCell.col < userCell.col) {
      dx = 1;
    } else if (enemyCell.col > userCell.col) {
      dx = -1;
    }
    if (enemyCell.row < userCell.row) {
      dy = 1;
    } else if (enemyCell.row > userCell.row) {
      dy = -1;
    }

    // Calculate new position
    const newEnemyCell = { row: enemyCell.row + dy, col: enemyCell.col + dx };

    // Check if the new position is valid
    if (newEnemyCell.row >= 0 && newEnemyCell.row < rows && newEnemyCell.col >= 0 && newEnemyCell.col < cols) {
      const newCell = cells.find(cell => cell.row === newEnemyCell.row && cell.col === newEnemyCell.col);
      if (newCell && !cellExists(newCell, randomCells) && !cellExists(newCell, treasures) && (userCell.row !== newEnemyCell.row || userCell.col !== newEnemyCell.col)) {
        enemyCell = newCell;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        fillCellsWithGreen(); // Redraw green cells
        colorRandomCellsBrown(); // Redraw brown cells
        drawTreasures(); // Redraw treasures
        drawEnemy(); // Redraw enemy
        drawUser(); // Redraw user

        checkGameOver(); // Check if game over
      }
    }
  }
}

// Move enemy automatically every 500 milliseconds
setInterval(moveEnemy, 500);

// Event listener for keyboard input
document.addEventListener('keydown', function(event) {
  if (!gameover && !won) {
    const keyCode = event.keyCode;
    let newUserCell = { row: userCell.row, col: userCell.col };

    // Handle arrow key movements
    switch (keyCode) {
      case 37: // Left arrow
        newUserCell.col--;
        break;
      case 38: // Up arrow
        newUserCell.row--;
        break;
      case 39: // Right arrow
        newUserCell.col++;
        break;
      case 40: // Down arrow
        newUserCell.row++;
        break;
      default:
        return;
    }

    // Check if the new cell is within bounds and not a brown cell
    if (newUserCell.row >= 0 && newUserCell.row < rows && newUserCell.col >= 0 && newUserCell.col < cols) {
      const newCell = cells.find(cell => cell.row === newUserCell.row && cell.col === newUserCell.col);
      
      // Check if the user collects a treasure
      const collectedTreasureIndex = treasures.findIndex(t => t.row === newUserCell.row && t.col === newUserCell.col);
      if (collectedTreasureIndex !== -1 && !treasures[collectedTreasureIndex].collected) {
        treasures[collectedTreasureIndex].collected = true; // Mark treasure as collected
        updateScore(1); // Increase score
      }

      // Update user position if the new cell is valid
      if (newCell && !cellExists(newCell, randomCells)) {
        userCell = newCell;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        fillCellsWithGreen(); // Redraw green cells
        colorRandomCellsBrown(); // Redraw brown cells
        drawTreasures(); // Redraw treasures
        drawEnemy(); // Redraw enemy
        drawUser(); // Redraw user

        checkGameOver(); // Check if game over
      }
    }
  }
});
