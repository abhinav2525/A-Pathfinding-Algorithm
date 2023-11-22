var cols = 5; // 5 x 5 grid
var rows = 5; // 5 x 5 grid
var grid = new Array(cols); // 2D array
var openSet = []; // array of Spots
var closedSet = []; // array of Spots
var start; // Spot object
var end; // Spot object

var w, h; // width and height of each spot

// Spot object
class Spot {
  constructor(i, j) {

    this.x = i; // x position
    this.y = j; // y position
    this.f = 0; // f = g + h
    this.g = 0; // distance from start
    this.h = 0; // distance from end


    // show function
    this.show = function (color) {
      fill(color);
      noStroke(0);
      rect(this.x * w, this.y * h, w - 1, h - 1); // -1 to see grid
    };
  }
}


function setup() {
  // put setup code here
  createCanvas(400, 400);
  console.log("A*");

  w = width / cols;
  h = height / rows;
  // 2D array
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }
  // 2D array of Spot objects
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  console.log(grid);

  // Start and end
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];

  openSet.push(start);
  console.log(openSet);
}

function draw() {
  // put drawing code here
  if (openSet.length > 0) {
    // we can keep going

  } else {
    // no solution
  }
  background(0);

  // draw grid
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j].show(color(255));// show all spots
    }
  }

  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0)); // show closed set
  }

  for (var i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0)); // show open set
  }
}
