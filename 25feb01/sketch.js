let points = [];

function setup() {
  const myCanvas = createCanvas(800, 800);
  myCanvas.parent("box");

  for(let i=0; i <100; i++) {
    points[i] = createVector(random(width), random(height));
  }

}

function draw() {
  background(245);

  for (let v of points){
    stroke(0);
    strokeWeight(4);
    point(v.x, v.y);
  }
  
}
