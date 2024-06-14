const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const rows = 10;
const cols = 10;
const cellSize = 50;
const randomCells = [];
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

for (let i = 0; i < 10; i++) {
  const randomIndex = Math.floor(Math.random() * cells.length);
  randomCells.push(cells.splice(randomIndex, 1)[0]);
}

console.log(randomCells); // de nieuwe array met 10 willekeurige objecten

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



