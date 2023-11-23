var cols = 25; // 5 x 5 grid
var rows = 25; // 5 x 5 grid
var grid = new Array(cols); // 2D array
var openSet = []; // array of Spots
var closedSet = []; // array of Spots
var start; // Spot object
var end; // Spot object
var w, h; // width and height of each spot
var path = []; // array of Spots
var noSolution = false;

// remove element from array
function removeElementFromArray(arr, element) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === element) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  // Euclidean distance
  // var d = dist(a.i, a.j, b.i, b.j);
  // Manhattan distance
  var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}

// Spot object
class Spot {
  constructor(i, j) {
    this.i = i; // i position
    this.j = j; // j position
    this.f = 0; // f = g + h
    this.g = 0; // distance from start
    this.h = 0; // distance from end
    this.neighbors = []; // array of Spot objects
    this.previous = undefined; // previous Spot object
    this.wall = false; // is it a wall?

    if (random(1) < 0.3) {
      this.wall = true;
    }

    // show function
    this.show = function (color) {
      fill(color);
      if (this.wall) {
        fill(0);
      }
      noStroke(0);
      rect(this.i * w, this.j * h, w - 1, h - 1); // -1 to see grid
    };

    // add neighbors
    this.addNeighbors = function (grid) {
      var i = this.i;
      var j = this.j;
      // check if neighbor exists
      if (i < cols - 1) {
        this.neighbors.push(grid[i + 1][j]);
      }
      if (i > 0) {
        this.neighbors.push(grid[i - 1][j]);
      }
      if (j > 0) {
        this.neighbors.push(grid[i][j - 1]);
      }
      if (j < rows - 1) {
        this.neighbors.push(grid[i][j + 1]);
      }
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

  // add neighbors
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  console.log(grid);

  // Start and end
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;

  openSet.push(start);
  console.log(openSet);
}

function draw() {
  // put drawing code here
  if (openSet.length > 0) {
    // find the lowest f
    var lowestIndex = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) {
        lowestIndex = i;
      }
    }

    var current = openSet[lowestIndex];

    if (current === end) {
      noLoop();
      console.log("DONE!");
    }

    // remove current from openSet
    removeElementFromArray(openSet, current);
    // add current to closedSet
    closedSet.push(current);

    // check neighbors
    var neighbors = current.neighbors;

    // loop through neighbors
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      // check if neighbor is not in closedSet and is not a wall
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        var tempG = current.g + 1;
        // check if neighbor is in openSet
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
          }
        } else {
          neighbor.g = tempG;
          openSet.push(neighbor);
        }

        // calculate heuristic
        neighbor.h = heuristic(neighbor, end);
        // calculate f
        neighbor.f = neighbor.g + neighbor.h;

        // set previous
        neighbor.previous = current;
      }
    }
  } else {
    // no solution
    console.log("No solution");
    noSolution = true;
    noLoop();
  }
  background(0);

  // draw grid
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j].show(color(255)); // show all spots
    }
  }

  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0)); // show closed set
  }

  for (var i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0)); // show open set
  }

  if (!noSolution) {
    // Find the path
    path = [];

    var temp = current; // last spot
    path.push(temp);

    // loop through previous
    while (temp.previous) { // getting type error
      path.push(temp.previous);
      temp = temp.previous;
    }
  }
 
  // show path
  for (var i = 0; i < path.length; i++) {
    path[i].show(color(0, 0, 255)); // show path
  }
}
