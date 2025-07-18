/*
library used: https://github.com/TrevorSundberg/h264-mp4-encoder
a simple example exporting mp4 with p5js.
custom animation loop, not using draw(), fixed-length animation.
*/
let cwidth = 640
let cheight = 360
let button
let checkbox
const frate = 30 // frame rate
const numFrames = 100 // num of frames to record
let recording = true

function setup() {
    createCanvas(cwidth, cheight)
    frameRate(frate)
    button = createButton('record')
    button.mousePressed(record)
    checkbox = createCheckbox(' preview only')
    checkbox.style('display', 'inline')
    checkbox.changed(() => {
        recording = !recording
    })
    anim(0) // display first frame
}
function anim(count) {
    background(220)
    textSize(128)
    textAlign(CENTER, CENTER)
    text(count, width / 2, height / 2)
}
function record() {
    HME.createH264MP4Encoder().then(async encoder => {
        encoder.outputFilename = 'test'
        encoder.width = cwidth
        encoder.height = cheight
        encoder.frameRate = frate
        encoder.kbps = 50000 // video quality
        encoder.groupOfPictures = 10 // lower if you have fast actions.
        encoder.initialize()
        for (let i = 0; i < numFrames; i++) {
            anim(i)
            encoder.addFrameRgba(drawingContext.getImageData(0, 0, canvas.width, canvas.height).data)
            await new Promise(resolve => window.requestAnimationFrame(resolve))
        }
        encoder.finalize()
        if (recording) {
            const uint8Array = encoder.FS.readFile(encoder.outputFilename);
            const anchor = document.createElement('a')
            anchor.href = URL.createObjectURL(new Blob([uint8Array], { type: 'video/mp4' }))
            anchor.download = encoder.outputFilename
            anchor.click()
        }
        encoder.delete()
    })
}