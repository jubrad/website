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
  public void stop(){
    //    //drag force dependent on speed
        vel.x=vel.x + -(vel.x)/30;  
        vel.y=vel.y + -(vel.y)/30; 
  }
  
  public void updateF(PVector fpos, int mass){
    fpos.sub(pos); //gives direction of force
    float d=fpos.mag();
    fpos.mult(mass/(d*d+1));
    force.add(fpos);
  }
  
  public void step(){
     //updates velocity and positon based on force
    //not real physics don't worry
    force.mult(.01);
    vel.x=vel.x+force.x;
    vel.y=vel.y+force.y;
    pos.x=pos.x+vel.x;
    pos.y=pos.y+vel.y;
    
    

//    //drag force dependent on speed
//    vel.x=vel.x + -(vel.x)/35;  
//    vel.y=vel.y + -(vel.y)/35; 
  }
  
  public void display(){
    float speed=vel.mag()*3.0;
    fill(col[0]*speed,col[1]*speed,col[2]*speed);
    ellipseMode(CENTER);
    ellipse(pos.x,pos.y,rad,rad);
    force.x=0;
    force.y=0;
  }
}

public class Well{
PVector pos;
int mass;
  public void setMass(int mass){
    this.mass=(int)mass/10;
  }
  public void setPos(int x, int y){
    pos=new PVector(x,y);
  }
  public void display(){
    float sqr=(float)Math.sqrt(mass);
    for(float i=.5;i<=20;i=i+.5){
      fill(255,255,255,(255)*mass/(i*i+1)/200 );
      noStroke();
      ellipse(pos.x,pos.y,(i*i*sqr)+1,(i*i*sqr)+1);
      stroke(0);
    }
    
  }

}

Ball[] balls;

boolean pressed=false;

final int WIDTH= 500;
final int HEIGHT= 300;
ArrayList<Well> wells=new ArrayList<Well>();

void setup(){
  size(WIDTH,HEIGHT);
  int x=(int)random(200)+1;
  balls=new Ball[x];
  smooth();
  for(int i=0; i<x; i++){
    PVector pos = new PVector(random(WIDTH),random(HEIGHT));
    balls[i]=(new Ball(pos,(int)random(35)));
  }
}

void draw(){
  background(42);
  if (mousePressed){
    wells.get(wells.size()-1).setPos(mouseX,mouseY);
    wells.get(wells.size()-1).mass+=2;
  }
  for(Well w: wells){
    for(Ball b:balls){
      b.updateF(w.pos.get(),w.mass);
    }
    fill(10);
    w.display();
    
  }
  for (Ball b : balls){
    b.step();
    b.display();
  }
  
}

void mousePressed(){
  Well well=new Well();
  well.setPos(mouseX,mouseY);
  well.setMass(1);
  wells.add(well);
}
void mouseReleased(){
  pressed=false;
}
void keyPressed(){
  if (keyCode==32){
    for (Ball b : balls){
      b.stop();
    }
  }
  else if(key== 'c' || key == 'C'){
    wells=new ArrayList<Well>();
  }
  else if(key== 'u' || key == 'U'){
    wells.remove(wells.size()-1);
  }
}