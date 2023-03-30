// Based on the code of the video Reto de Programación # 11: Generación de terreno 
// en 3D con Perlin Noise con Processing https://www.youtube.com/watch?v=IKB1hWWedMk

let w = 1200;
let h = 900;
let scl = 20;
let cols, rows;

let max_min = 100;

let landscape;
let flying = 0;

let max_min_slider, flying_slider, stroke_cb;

function setup() {
  createCanvas(600,600, WEBGL);

  rows = h/scl;
  cols = w/scl;

  landscape = new Array(rows);
  for (let i = 0; i < rows; ++i){
    landscape[i] = new Array(cols);
  }

  stroke("green");
  // noStroke();
  // noFill();

  max_min_slider = createSlider(50, 400, 100);
  max_min_slider.position(10,10);
  // max_min_slider.style('width','80px');
  flying_slider = createSlider(0, 100, 20);
  flying_slider.position(10,30);

  stroke_cb = createCheckbox('label', true);
  stroke_cb.changed(x => stroke_cb.checked() ? stroke("green") : noStroke());
  stroke_cb.position(10,50);

}

function draw() {

  max_min = max_min_slider.value();

  background(0); 
  flying -= flying_slider.value()/1000;
  let yoff = flying;
  for (let y = 0; y < rows; ++y){
    let xoff = 0;
    for (let x = 0; x < cols; ++x){
      landscape[y][x] = map(noise(xoff,yoff), 0, 1, -max_min, max_min);
      xoff += 0.05;
    }
    yoff += 0.05;
  }
  orbitControl();
  rotateX(PI/3);
  translate(-w/2,-h/2);

  for (let y = 1; y < rows-1; ++y){
    beginShape(TRIANGLE_STRIP);
    // stroke(map(y,0,rows,0,255));
    // stroke(0)
    for (let x = 1; x < cols-1; ++x){
      fill(map(landscape[y][x], -max_min, max_min, 0, 255));
      vertex(x*scl, y*scl, landscape[y][x]);
      fill(map(landscape[y+1][x], -max_min, max_min, 0, 255));
      vertex(x*scl, (y+1)*scl, landscape[y+1][x]);
    }
    endShape();
  }

  
}