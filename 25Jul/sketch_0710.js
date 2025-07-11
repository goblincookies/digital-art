let w = 600;
let h = 500;
let m = 1.20;

let json;
let palette
let c = [];

function preload(){
  json = loadJSON( './palette.json' );
}

function setup() {
  colorMode( HSB );
  setColors();

  steps = 45;
  r = Math.sqrt( ( h * h ) + ( w * w ) );
  
  const myCanvas = createCanvas( w, h);
  myCanvas.parent( 'box' );
};

function draw() {
  // setColors()
  background( getColor( 2 ) );

  const divisions_w = 1 + randInt( 5 );
  const divisions_h = 1 + randInt( 5 );
  let n = 0;
  for ( let div_w = 0; div_w < divisions_w; div_w ++  ) {
    for ( let div_h = 0; div_h < divisions_h; div_h ++  ) {
      push();
      beginClip( );
      let x_ = div_w*(w/divisions_w);
      let y_ = div_h*(h/divisions_h);
      let w_ = w/divisions_w;
      let h_ = h/divisions_h;
      
      drawRect( x_, y_, w_, h_ );
      endClip();
      drawRect( x_, y_, w_, h_ );
      drawCirc( x_, y_, w_, h_ );
      pop();
      n++;
    };
  };

  noLoop();
};

function drawRect( x, y, w, h ){
  noStroke();
  fill( getColorRand() );
  rect( x, y, w, h );
};


function drawCirc( x, y, w, h ) {
  let s = 2.0;
  noFill();
  
  if( randInt( 2 ) ) {
    x += w/2;
    s = 1.2;
  } else {
    x = x + randInt( w );
  };
  
  if( randInt( 2 ) ) {
    // x += w/2;
    y += h/2;
    s = 1.2;
  } else {
    y = y + randInt( h );
  };

  let c = 8 + randInt( 15 );
  console.log( 'so many circles!', c );

  let step = Math.min( w, h ) / (c+1);
  console.log( step, ':steps' );

  for ( let i = 0; i < c; i++ ){
    strokeWeight( c / (i+1) );
    circle( x, y, Math.min( w, h ) * s - ( step * i ) );
    stroke( getColorRand() );
  };
};

function genMask() {
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

  for ( let i = 0; i < steps; i++ ) {
    if ( i+1 < steps ) {
      strokeWeight( ( 4 / steps ) * i );
      rotate( -i*.0014 )
      circle( (w - (r/(steps + w/6)) * i)-w/1.5, h/2, r - ( r / (steps - 1) ) * i );
    };
  };

};

function randInt( max ){
  return Math.floor( Math.random() * max );
};

function getColor( index ){
  index = index % c.length;
  return c[ index ];
};

function getColorRand( ){
  let index = randInt( c.length );  
  return c[ index ];
};

function setColors(){
  // CHOOSE A RANDOM PALETTE HERE
  palette = json.palette[ randInt( json.palette.length ) ];
  const count = palette.colors.length;
  let colorOptions = Array.from( Array( count ).keys());

  console.log( 'new colors!' );

  for ( let i = 0; i < count; i++ ) {
    const index = colorOptions[ randInt( colorOptions.length ) ];
    colorOptions.splice( index, 1 );
    const hsb = palette.colors[ index ];
    c.push( color( hsb.h, hsb.s, hsb.b ) );
  };

};