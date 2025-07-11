let w = 600;
let h = 500;
let m = 1.20;
let c0;
let c2;
let r;
let steps;

function setup() {

  
  let rgb0 = color( 160, 242, 249 ); // LIGHT BLUE
  let rgb1 = color( 235, 196, 53 ); // YELLOW
  let rgb2 = color( 217, 125, 141 ); // PINK
  let rgb3 = color( 111, 112, 248 ); // CORNFLOWER
  let rgb4 = color( 49, 102, 73 ); // FOREST GREEN
  let rgb5 = color( 250, 184, 28 ); // ORANGE


  c0 = rgb2;
  c2 = rgb4;



  steps = 45;
  r = Math.sqrt( ( h * h ) + ( w * w ) );
  
  const myCanvas = createCanvas( w, h);
  myCanvas.parent( 'box' );
};

function draw() {

  background( c2 );
  

  fill( c2 );
  stroke( c0 );

  // my_circle( );

  push();
  // beginClip( { invert: true } );
  beginClip( );

  mask();
  // canvas.getContext( '2d' ).clip();
  
  fill( c2 );
  stroke( c0 );
  // stroke( c1 );
  endClip();
  my_circle( );

  
  pop();
  noFill();
  // strokeWeight( 4 );
  // stroke( c1 );
  // circle( w/1.76, h/2, h*m );
  noLoop();
};

function mask() {
  push();
  // fill( color( 238, 111, 17 ) );

  strokeWeight(0)
  noFill();
  circle( w/1.76, h/2, h*m );
  // rect( (w/8/2), h/2-(h/4/2), w-w/8, h/4)
  // circle( w-w/3, h/2, h/2 );


  pop();
}

function my_circle(){
  // noFill();

  for ( let i = 0; i < steps; i++ ) {
    if ( i+1 < steps ) {
      strokeWeight( ( 4 / steps ) * i );
      rotate( -i*.0014 )
      circle( (w - (r/(steps + w/6)) * i)-w/1.5, h/2, r - ( r / (steps - 1) ) * i );
      
      // rotate( i*.0004 )

      // strokeWeight( ( steps / 2 ) / i );
      // stroke( c1 );
      // circle( (w + (r/(steps + w/10)) * i)-w/2, h/2, r - ( r / (steps - 1) ) * i );
    }
  };

}