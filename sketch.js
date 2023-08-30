const height = 500;
const width = 500;
let play = false;
let slider;
class Grid {
    columns = 0;
    rows = 0;
    constructor(boxWidth) {
        this.boxWidth = boxWidth;
        this.rows = height / this.boxWidth;
        this.columns = width / this.boxWidth;
    }
}

let grid = new Grid(20);
let gridArray = createGrid(grid.columns, grid.rows);
function setup() {
    createCanvas(width, height);
    createStartButton();
    createResetButton();
    createSpeedSlider()
    randomAssign();
}

function draw() {
    background(150);
    frameRate(slider.value() + 1);
    
    for (let x = 0; x < width; x += grid.boxWidth) {
		for (let y = 0; y < height; y += grid.boxWidth) {
			stroke(0);
			strokeWeight(1);
			line(x, 0, x, height);
			line(0, y, width, y);
		}
	}

    for (let i = 0; i < grid.columns; i++) {
        for (let j = 0; j < grid.rows; j++) {
            if (gridArray[i][j] == 1) {
                fill(255, 234, 0);
                stroke(0);
                rect(i * grid.boxWidth, j * grid.boxWidth, grid.boxWidth , grid.boxWidth );
            }
        }
    }
    if (play) {
        let newGridArray = createGrid(grid.columns, grid.rows);

        for (let i = 0; i < grid.columns; i++) {
            for (let j = 0; j < grid.rows; j++) {
                let count = checkSurroundings(i, j);
                if ((count < 2 || count > 3) && gridArray[i][j] == 1) {
                    newGridArray[i][j] = 0;
                } else if (gridArray[i][j] == 0 && count == 3) {
                    newGridArray[i][j] = 1;
                } else {
                    newGridArray[i][j] = gridArray[i][j];
                }
            }
        }
        gridArray = newGridArray;
    }
}

function checkSurroundings(x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let xCoor = (i + x + grid.columns) % grid.columns;
            let yCoor = (j + y + grid.rows) % grid.rows;
            sum += gridArray[xCoor][yCoor];
        }
    }
    sum -= gridArray[x][y];
    return sum;
}

function createGrid(columns, rows) {
    let array = new Array(columns);
    for (let i = 0; i < columns; i++) {
        array[i] = new Array(rows);
    }
    return array;
}

function randomAssign() {
    for (i = 0; i < grid.columns; i++) {
        for (j = 0; j < grid.rows; j++) {
            gridArray[i][j] = 0;
        }
    }
}

function startPressed() {
    play = true;
}

function resetPressed() {
    play = false;
    gridArray = createGrid(grid.columns, grid.rows);
    randomAssign();
}

function mouseClicked() {
    let xCoor = floor(mouseX / grid.boxWidth);
    let yCoor = floor(mouseY / grid.boxWidth);
    if (gridArray[xCoor][yCoor] == 0 && !play) {
        gridArray[xCoor][yCoor] = 1;
    } else if (gridArray[xCoor][yCoor] == 1 && !play){
        gridArray[xCoor][yCoor] = 0;
    }
}

function createStartButton() {
    startButton = createButton("Start");
    startButton.position(width / 2 - 220, height + 30);
    startButton.size(100, 40);
    startButton.style('font-size: 30px');
    startButton.style('background: #00C8F9');
    startButton.style('font-family: fantasy');
    startButton.mousePressed(startPressed);
}
function createResetButton() {
    resetButton = createButton("Reset");
    resetButton.position(width / 2 - 110, height + 30);
    resetButton.size(100, 40);
    resetButton.style('font-size: 30px');
    resetButton.style('background: #00C8F9');
    resetButton.style('font-family: fantasy');
    resetButton.mousePressed(resetPressed);
}

function createSpeedSlider() {
    slider = createSlider(0, 255, 100);
    slider.position(280, 550);
    slider.style('width', '160px');

    textButton = createButton("Set Speed");
    textButton.position(width / 2 + 70, height + 25);
    textButton.size(80, 20);
    textButton.style('font-size: 12px');
    textButton.style('background: #00C8F9');
    textButton.style('font-family: fantasy');
    textButton.attribute('disabled');
}