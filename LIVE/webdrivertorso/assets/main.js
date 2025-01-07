
let vol = new Tone.Volume(-12).toDestination();

let redOsc = new Tone.Oscillator({
  frequency: 523.25,
  type: "sine",
}).connect(vol);

let blueOsc = new Tone.Oscillator({
  frequency: 523.25,
  type: "sine",
}).connect(vol);

function randomFloat(from, to) {
  return from + Math.random() * (to - from);
}

function changeFreq(osc) {
  osc.frequency.rampTo(randomFloat(100, 1000), 0); // Smooth frequency changes
}

function changeFreqs() {
  changeFreq(redOsc);
  changeFreq(blueOsc);
}

function randomiseRect(classname) {
  var rect = document.querySelector('.' + classname);
  if (!rect) {
    console.warn(`Element with class ${classname} not found`);
    return;
  }
  var rect = document.querySelector('.' + classname);
  let xpos = randomFloat(0, window.innerWidth);
  let ypos = randomFloat(0, window.innerHeight);
  let width = randomFloat(1, window.innerWidth - xpos);
  let height = randomFloat(1, window.innerHeight - ypos);

  let st = `top:${ypos}px;left:${xpos}px;width:${width}px;height:${height}px;`; // Fixed CSS style
  rect.setAttribute('style', st);
}

function randomiseRects() {
  randomiseRect('red');
  randomiseRect('blue');
}

function syncAudioAndVisual() {
  changeFreqs(); // Fixed typo
  randomiseRects();
}

const mainloop = new Tone.Loop((time) => {
  syncAudioAndVisual(); // Trigger sync function
}, "1b").start(0);

document.addEventListener('DOMContentLoaded', function () {
  // Create a start button
  var p = document.querySelector('p')

  document.addEventListener("click", () => {
    p.remove();
    Tone.start(); // This needs user interaction
    redOsc.start();
    blueOsc.start();
    Tone.getTransport().start();
  });
});

window.addEventListener('unload', () => {
  redOsc.stop();
  blueOsc.stop();
  Tone.getTransport().stop();
  Tone.stop();
});