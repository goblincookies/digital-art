let w = 600;
let h = 500;
let c1;
let c2;
let r;
let steps;

function setup() {
  // PINK
  c1 = color( 245, 123, 145 );
  // YELLOW
  c2 = color( 235, 196, 53 );

  steps = 75;
  r = Math.sqrt( ( h * h ) + ( w * w ) );
  
  const myCanvas = createCanvas( w, h);
  myCanvas.parent( 'box' );
};

function draw() {

  background( c2 );
  fill( c1 );
  stroke( c2 );
  
  for( let i = 0; i < steps; i++ ) {
    strokeWeight( ( 4 / steps ) * i );
    circle( (w - (r/(steps + w/5)) * i)-w/3, h/2, r - ( r / (steps - 1) ) * i );
  }
};


// function setup() {
//   const myCanvas = createCanvas(800, 800);
//   myCanvas.parent("box");

// }

// function draw() {
//   background(245);
  
// }
