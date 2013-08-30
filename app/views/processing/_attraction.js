public class Ball{
  int[] col={(int)random(50),(int)random(50),(int)random(50)};
  PVector pos;
  PVector force;
  PVector vel;
  int rad;
  public Ball(PVector position, int radius){
    this.pos=position;
    this.rad=radius;
    vel=new PVector(0,0);
    force=new PVector(0,0);
  }
  public void updateF(PVector fpos, int mass){
    fpos.sub(pos); //gives direction of force
    float d=fpos.mag();
    fpos.mult(mass/(d+10));
    force=fpos.get();
  }
  
  public void step(){
     //updates velocity and positon based on force
    //not real physics don't worry
    vel.x=vel.x+force.x;
    vel.y=vel.y+force.y;
    pos.x=pos.x+vel.x;
    pos.y=pos.y+vel.y;
    force.x=0;
    force.y=0;
    

    //drag force dependent on speed
    vel.x=vel.x + -(vel.x)/35;  
    vel.y=vel.y + -(vel.y)/35; 
  }
  
  public void display(){
    int speed=(int)vel.mag();
    fill(col[0]*speed,col[1]*speed,col[2]*speed);
    ellipseMode(CENTER);
    ellipse(pos.x,pos.y,rad,rad);
  }
}

Ball[] balls;

boolean pressed=false;

final int WIDTH= 500;
final int HEIGHT= 300;

void setup(){
  size(WIDTH,HEIGHT);
  // int x=(int)random(200)+1;
  int x =200;
  balls=new Ball[x];

  for(int i=0; i<x; i++){
    PVector pos = new PVector(random(WIDTH),random(HEIGHT));
    balls[i]=(new Ball(pos,(int)random(35)));
  }
}

void draw(){
  background(42);
  for (Ball b : balls){
    
    if(pressed){
      PVector pos= new PVector(mouseX,mouseY);
      b.updateF(pos, 1);
    }
    b.step();
    b.display();
  }
}
void mousePressed(){
  pressed =true;
}
void mouseReleased(){
  pressed=false;
}