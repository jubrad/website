// The next line is needed if running in JavaScript Mode with Processing.js

//@pjs preload="dog.jpg"; 

preload='dog.jpg'

PImage img;
int smallPoint, largePoint;

void setup() {
  img = loadImage("dog.jpg");
  size(img.width,img.height);
  smallPoint = 4;
  largePoint = 40;
  imageMode(CENTER);
  noStroke();
  background(255);
}

void draw() { 
  float pointillize = map(mouseX, 0, width, smallPoint, largePoint);
  int x = int(random(img.width));
  int y = int(random(img.height));
  color pix = img.get(x, y);
  fill(pix, 128);
  ellipse(x, y, pointillize, pointillize);
}
