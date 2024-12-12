function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr[i].length; j++){
      arr[i][j] = 0;
    }
  }
  return arr;
}


let grid;
let w = 10;
let cols, rows;


function setup(){
  createCanvas(500, 600);
  cols = width / w;
  rows = height / w;
  grid = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      grid[i][j] = 0;
    }
  }
}


function mouseDragged(){
  let col = floor(mouseX / w);
  let row = floor(mouseY / w);

  let matrix = 3;
  let extent = floor(matrix / 2);
  for (let i = -extent; i <= extent; i++){
    for (let j = -extent; j <= extent; j++){
      if (random(1) < 0.5){
        if (col + i >= 0 && col + i < cols && row + j >= 0 && row + j < rows){
          grid[col + i][row + j] = 1;
        }
    }
  }
}

  grid[col][row] = 1;
}

function draw(){
  background(0);

  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      noStroke();
      fill(grid[i][j] * 255,22,31);
      let x = i * w;
      let y = j * w;
      square(x, y, w);
    }
  }

  let nextGrid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      let state = grid[i][j];
      if (state === 1){
        let below = grid[i][j+1];
        let belowR, belowL;

        
        if (i >= 0 && i < cols - 1){
          belowR = grid[i+1][j+1];
        }
        if (i > 0 && i <= cols - 1){
          belowL = grid[i-1][j+1];
        }

        
        if (below === 0){
          nextGrid[i][j+1] = 1;
        }else if (belowR === 0){
          nextGrid[i+1][j+1] = 1;
        }else if (belowL === 0){
          nextGrid[i-1][j+1] = 1;
        }else{
          nextGrid[i][j] = 1;
        }
      }
        
    }
  }
  grid = nextGrid;
}


