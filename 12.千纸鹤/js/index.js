birds = [];
let numBirds = 50;

class Bird{
  constructor(){
    this.pos   = [random(width), random(height)];
    this.size  = pow(random(), 2)*80 + 40;
    this.angle = random(PI/16) + PI/8;
    this.speed = this.size/600;
    this.hue   = random();
    
    let p = [
      [0, 0],
      [random(.00, .10),  random(.1, .4)], //beak
      [random(.10, .50), -random(.1, .2)], //head
      [random(.50, .80),  random(.1, .3)], //body
      [random(.80, 1.0), -random(.2, .4)], //tail
      [1, 0],
      [random(.30, .40), 0],               //wing base 1
      [random(.80, .90), 0],               //wing base 2
      [random(.50, .65), -random(.4, .6)], //wing tip 1
      [random(.65, .70), -random(.4, .6)], //wing tip 2
    ];
    
    this.triangles = [ 
      //   idx,     idx,     idx, color              , isWing
      [...p[0], ...p[1], ...p[2], randColor(this.hue), false], //head
      [...p[3], ...p[4], ...p[5], randColor(this.hue), false], //tail
      [...p[6], ...p[7], ...p[8], randColor(this.hue), true ], //back wing
      [...p[0], ...p[2], ...p[3], randColor(this.hue), false], //body 1
      [...p[2], ...p[3], ...p[5], randColor(this.hue), false], //body 2
      [...p[6], ...p[7], ...p[9], randColor(this.hue), true ], //front wing
    ]
  }
  render(){
    push();
    let p = this.pos;
    translate(...p);
    scale(this.size);
    strokeWeight(1/this.size);
    
    p[0] += cos(this.angle+PI)*this.speed*20;
    p[1] += sin(this.angle+PI)*this.speed*20;
    if (p[0] < -this.size  ) p[0] += width +this.size;
    if (p[1] < -this.size/2) p[1] += height+this.size/2;
    
    let s = cos(frameCount*this.speed)
    rotate(this.angle);
    this.triangles.map(t => {
      fill(...(t[6]))
      if (t[7]) triangle(...t.slice(0, 5), t[5]*s);
      else      triangle(...t);
    })
    
    pop();
  }
}

function randColor(base = 0, amt=.2){
  return [(base+random(amt)-amt/2)%1, .2 + random(amt), .8 + random(amt)];
}

function setup (){
  pixelDensity(1);
  createCanvas();
  colorMode(HSB, 1, 1, 1);
  windowResized();
}

function init(){
  birds = [];
  for (let i = 0; i < numBirds; i++) birds.push(new Bird());
  birds = birds.sort((a,b) => a.size - b.size);
}

function draw(){
  background(0, .5);
  birds.map(b => b.render());
}

function mousePressed(){windowResized();}
function windowResized(){
  resizeCanvas(windowWidth, windowHeight); 
  init();
}