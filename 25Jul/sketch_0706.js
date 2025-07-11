let w = 600;
let h = 500;
let m = 1.05;
let c1;
let c2;
let r;
let steps;

function setup() {
  // PINK
  // c2 = color( 245, 123, 145 );
  c2 = color( 217, 125, 141 );
  // YELLOW
  c1 = color( 235, 196, 53 );

  steps = 75;
  r = Math.sqrt( ( h * h ) + ( w * w ) );
  
  const myCanvas = createCanvas( w, h);
  myCanvas.parent( 'box' );
};

function draw() {

  background( c2 );
  
  fill( c2 );
  stroke( c1 );

  // for ( let n = 0; n < 1000; n++ ) {
  //   let w_ = Math.random()*100;
  //   let h_ = Math.random()*50;

  //   rect( Math.random()*w-w_/2, Math.random()*h - h_/2, w_, h_ );
  // };
  
  fill( c1 );
  stroke( c2 );
  // clip( mask );
  push();
  mask();
  canvas.getContext( '2d' ).clip();
  
  for ( let i = 0; i < steps; i++ ) {
    strokeWeight( ( 4 / steps ) * i );
    circle( (w - (r/(steps + w/5)) * i)-w/3, h/2, r - ( r / (steps - 1) ) * i );
  };
  
  pop();
  noFill();
  strokeWeight( 3 );
  stroke( c1 )
  circle( w/2, h/2, h*m );

  // fill( c1 );
  // rect( 50, 200, 425, 15 );
  // mask();
  noLoop();
};

function mask() {
  push();
  // fill( color( 238, 111, 17 ) );

  // noStroke();
  // strokeWeight
  // noFill();
  circle( w/2, h/2, h*m );
  // scale( 0.5 );
  // torus( 30, 15 );
  pop();
}