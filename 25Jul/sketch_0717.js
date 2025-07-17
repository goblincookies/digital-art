let w = 600;
let h = 500;
let m = 2.20;
let bkgColorIndex = -1;
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
  r = Math.sqrt( ( h * h * m ) + ( w * w * m ) );
  
  const myCanvas = createCanvas( w, h);
  myCanvas.parent( 'box' );
};

function draw() {
  // setColors()
  background( getColorRandBkg( 2 ) );

  const divisions_w = 1 + randInt( 5 );
  // const divisions_w = 2;
  const divisions_h = 1 + randInt( 5 );
  // const divisions_h = 4;
  let w_ = w/divisions_w;
  let h_ = h/divisions_w; //h/divisions_h;
  let n = 0;
  let c = 30 + randInt( 8 );
  const strokeColor = getColorRand();
  for ( let div_w = 0; div_w < divisions_w+1; div_w ++  ) {
    for ( let div_h = 0; div_h < divisions_h+1; div_h ++  ) {
      push();
      stroke( strokeColor );
      beginClip( );
      let x_ = div_w*(w/divisions_w) + divisions_w * 10;
      let y_ = div_h*(h/divisions_h) + divisions_h * 10;      
      drawClip( x_, y_, w_, h_ );
      endClip();
      drawClip( x_, y_, w_, h_ );
      stroke( strokeColor );
      my_circle();
      // drawCirc( x_, y_, w_, h_, c );
      pop();
      n++;
    };
  };

  noLoop();
};

function drawClip( x, y, w, h ){
  noStroke();
  fill( getColorRand() );
  rect( x, y, w, h );

  // circle( x, y, Math.min( w, h ) );
};


function drawCirc( x, y, w, h, c ) {
  let s = 2.0;
  noFill();

  console.log( 'so many circles!', c );
  let r = Math.min( w, h );

  for ( let i = 0; i < c; i++ ){
    let st = c / (i+1)
    strokeWeight( st );
    circle( x, y, r - ( r / (c - 1) ) * i );
  };
};

function genMask() {
  push();
  // fill( color( 238, 111, 17 ) );

  // strokeWeight(0)

  noFill();
  circle( w/1.76, h/2, h*m );
  // rect( (w/8/2), h/2-(h/4/2), w-w/8, h/4)
  // circle( w-w/3, h/2, h/2 );
  pop();
}

function my_circle(){

  for ( let i = 0; i < steps; i++ ) {
    if ( i+1 < steps ) {
      strokeWeight( ((steps/2) - i )/2 );
      // strokeWeight( ( 4 / steps ) * i );
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

function getColorRandBkg(){
  let index = randInt( c.length );  
  bkgColorIndex = index;
  return c[ index ];
}

function getColorRandNotBkg(){
  let index = randInt( c.length );
  console.log( 'not background:', index, bkgColorIndex );
  if ( index == bkgColorIndex ) {
    index = ( index + 1 ) % c.length;
    console.log( 'new color:', index, bkgColorIndex );
  };
  return c[ index ];  
}

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