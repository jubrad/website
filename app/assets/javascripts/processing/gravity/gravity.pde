  
  ArrayList<Ball> balls = new ArrayList<Ball>();
  final int time = 1;
  boolean pressed=false;
  final int WIDTH=1000;
  final int HEIGHT=600;
  
void setup(){
  size(WIDTH,HEIGHT);
  int x=(int)random(1000);
  for(int i=0; i<x; i++){
    balls.add(new Ball((int)random(WIDTH),(int)random(HEIGHT),(int)random(40),(int)random(2000)));
  }
}

void draw(){
  int m = millis();
  size(1000,600);
    background(51);

  for (Ball b : balls){
    if(pressed){
      PVector pos= new PVector(mouseX,mouseY);
      b.updateF(pos, 50000);
    }
    b.step(time);
    b.display();
  }
  stroke(255);
  delay((int)(1-(m-millis())));
}

void mousePressed(){
  pressed=true;
}
void mouseReleased(){
  pressed=false;
}

public class Ball{
 // int[] col={random(255),random(255),random(255)};
  float[] col={random(5),random(5),random(5)};
  PVector startingPos;
  PVector pos;
  int rad=0;
  int mass=1;
  PVector force =new PVector(0,0);
  PVector vel =  new PVector(0,0);
  public Ball(int x, int y,int r){
    startingPos=new PVector(x,y);
    pos=startingPos.get();
    rad=r;
  }
  public Ball(int x, int y,int r,int m){
    mass=m;
    startingPos=new PVector(x,y);
    pos=startingPos.get();
    rad=r;
  }
  void updateVelocity(PVector x){
  vel.add(x);
  }
  
  void updateF(PVector fpos, int fmass){
    PVector fVect = PVector.sub(fpos,pos);
    fVect.normalize();
    float d= this.pos.dist(fpos);
    fVect.mult((mass*fmass)/(d+10));
    force=(fVect);
  }
  void step(float t){ // x represents the time step
    t=t/60;
    PVector a=PVector.div(force,(mass));
    vel.add(PVector.mult(a,t));
    pos.add(PVector.mult(vel,t));
    force=new PVector(0,0);
                              
    vel.x=vel.x + -(vel.x/100);  //viscous drag force
    vel.y=vel.y + -(vel.y/100);
  } 
  void display(){
    noStroke();
    fill(col[0]*(vel.mag()/10)%255,col[1]*(vel.mag()/10)%255,col[2]*(vel.mag()/10)%255);
    ellipseMode(CENTER);
    ellipse(pos.x,pos.y,rad,rad);
  }
}
