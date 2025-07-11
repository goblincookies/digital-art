let w = 600;
let h = 500;
let m = 1;
let c1;
let c2;
let r;
let steps;

function setup() {

  
  c0 = color( 160, 242, 249 ); // LIGHT BLUE
  c1 = color( 235, 196, 53 ); // YELLOW
  c2 = color( 217, 125, 141 ); // PINK
  


  steps = 50;
  r = Math.sqrt( ( h * h ) + ( w * w ) );
  
  const myCanvas = createCanvas( w, h);
  myCanvas.parent( 'box' );
};

function draw() {

  background( c2 );
  

  fill( c2 );
  stroke( c0 );

  my_circle( );

  push();
  mask();
  canvas.getContext( '2d' ).clip();
  
  fill( c1 );
  stroke( c2 );

  my_circle( );
  
  pop();
  noFill();
  noLoop();
};

function mask() {
  push();
  // fill( color( 238, 111, 17 ) );

  // noStroke();
  strokeWeight(0)
  noFill();
  let size = 1.1;
  // translate( w/2, h/2 )
  rotate( 0.2 );
  // translate( -w/2, -h/2 )
  rect( w/2.8, -h/4, w, h*2 );

  pop();
}

function my_circle(){

  for ( let i = 0; i < steps; i++ ) {
    if ( i+1 < steps ) {
      strokeWeight( ( 4 / steps ) * i );
      circle( (w - (r/(steps + w/5)) * i)-w/3, h/2, r - ( r / (steps - 1) ) * i );
    }
  };

}