let w = 600;
let h = 500;
let r = 200;
let bkgColorIndex = -1;
let json;
let palette
let delta;
let playHead = 0;
let c = []; // COLOR ARRAY
const renderFrameRate = 30;
const numOfFrames = renderFrameRate * 4;
let recording = false;
let debug = true;
let paused = false;
let circleColor;
let backColor;
let seed;

function preload(){
  json = loadJSON( './palette.json' );
  seed = randInt( 9999 );
  randomSeed( seed );

}

function setup() {
  colorMode( HSB );
  frameRate( renderFrameRate );
  setColors();
  delta = ( w + r + r ) / numOfFrames;
  const myCanvas = createCanvas( w, h);
  myCanvas.drawingContext.miterLimit = 2;
  myCanvas.parent( 'box' );
  backColor = getColorRandBkg();
  circleColor = getColorRandNotBkg();
};

function draw() {
  // setColors()
  // record();
  if ( recording ) {
    record();
    noLoop();
  } else if ( paused ) {
    const frameNumber = 24;
    anim ( frameNumber );
    noLoop();
  } else {
    anim ( playHead );
    playHead += 1;
    playHead = ( playHead + 1 ) % numOfFrames;
  };

};

function anim( f ){
  background( backColor );
  fill( circleColor );
  circle( -r + ( f * delta ), h/2, r, r );

  if ( debug ) { drawFrameNumber( f, seed ); }

};

function record() {
  HME.createH264MP4Encoder()
  .then( async encoder => {
    encoder.outputFilename = 'test';
    encoder.width = w;
    encoder.height = h;
    encoder.renderFrameRate = renderFrameRate;
    encoder.kbps = 10000;
    encoder.groupOfPictures = 10;
    encoder.initialize();
    for ( let frame = 0; frame < numOfFrames; frame ++ ) {
      anim( frame );
      encoder.addFrameRgba( drawingContext.getImageData( 0, 0, canvas.width, canvas.height ).data );
      await new Promise( resolve => window.requestAnimationFrame( resolve ) );
    };
    encoder.finalize();
    if ( recording ) {
      const uint8Array = encoder.FS.readFile( encoder.outputFilename );
      const anchor = document.createElement( 'a' );
      anchor.href = URL.createObjectURL( new Blob( [ uint8Array ], { type: 'video/mp4' } ) );
      anchor.download = encoder.outputFilename;
      anchor.click();
      recording = false;
    };
    encoder.delete();
  });
};

function drawFrameNumber( f, s ){
  console.log( 'drawing frame number' );
  textSize( 12 );
  fill( 'white' );
  stroke( 'black' );
  strokeWeight( 2 );
  text( 'seed: '+ s, 10, 20 );
  text( 'frame: '+ f, 10, 35 );

}

function randInt( max ){
  // return Math.floor( Math.random() * max );
  return Math.floor( random(0, max) );

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