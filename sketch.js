//Travelling salesman
var cities = [];
var totalCities = 5;
var sequence = [];
var totalPermutations;
var count = 0;
var recordDistance;

var bestest;
function setup() 
{
  createCanvas(1536, 749);
  for (var i = 0; i < totalCities; i++)
  {
      var v = createVector(random(width), random(height / 2));
      cities[i] = v;
      sequence[i] = i;
  }

  var d = calcDistance(cities, sequence);
  recordDistance = d;
  bestest = sequence.slice();

  totalPermutations = factorial(totalCities);
  console.log(totalPermutations);
}

function draw() 
{
  background(0);
  // frameRate(5);
  // Printing the city dots for result
  fill(255, 0, 0);
  for (var i = 0; i < sequence.length; i++)
  {
    ellipse (cities[i].x, cities[i].y, 8, 8);
  }
  // Printing the city path for result
  stroke(255, 0, 0);
  strokeWeight(4);
  noFill();
  beginShape();
  for (var i = 0; i < cities.length; i++)
  {
    var n = bestest[i];
    vertex (cities[n].x, cities[n].y);
  }
  endShape();

  translate(0, height / 2);
    // Printing the city dots for on-going
  fill(255);
  for (var i = 0; i < sequence.length; i++)
  {
    ellipse (cities[i].x, cities[i].y, 8, 8);
  }
  // Printing the city path for on-going
  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for (var i = 0; i < cities.length; i++)
  {
    var n = sequence[i];
    vertex (cities[n].x, cities[n].y);
  }
  endShape();

  var d = calcDistance(cities, sequence);
  if (d < recordDistance)
  {
    recordDistance = d;
    bestest = sequence.slice();
  }
  textSize(32);
  fill(255);
  var percent = 100 * (count / totalPermutations) + 0.84;
  text(nf(percent, 0, 2) + "% completed", 20, height / 2 - 50); // nf = numberformat
  nextSequence();
}

function swap(a, i, j)
{ 
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDistance(points, sequence)
{
  var sum = 0;
  for (var i = 0; i < sequence.length - 1; i++)
  {
    var cityAIndex = sequence[i];
    var cityA = points[cityAIndex];
    var cityBIndex = sequence[i+1];
    var cityB = points[cityBIndex];
    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}


function nextSequence()
{
  count++;
  // STEP 1 of the algorithm
  var largestI = -1;
  for (var i = 0; i < sequence.length - 1; i++) {
    if (sequence[i] < sequence[i + 1]) {
      largestI = i;
    }
  }
  if (largestI == -1) {
    noLoop();
    console.log('finished');
  }

  // STEP 2
  var largestJ = -1;
  for (var j = 0; j < sequence.length; j++) {
    if (sequence[largestI] < sequence[j]) {
      largestJ = j;
    }
  }

  // STEP 3
  swap(sequence, largestI, largestJ);

  // STEP 4: reverse from largestI + 1 to the end
  var endArray = sequence.splice(largestI + 1);
  endArray.reverse();
  sequence = sequence.concat(endArray);
}

function factorial(n)
{
  if (n == 1)
    return 1;

  else
    return n * factorial(n-1);
}