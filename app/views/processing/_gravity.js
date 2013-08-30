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
    // force=PVector(mouseX,mouseY).normalize.mult(3);
  }
  void step(float t){ // t represents the time step
    t=t/60;
    PVector a=PVector.div(force,(mass));
    vel.add(PVector.mult(a,t));
    pos.add(PVector.mult(vel,t));
    force=new PVector(0,0);
             
    vel.x=vel.x + -(vel.x/100);  //viscous drag force
    vel.y=vel.y + -(vel.y/100);  //depenedent on v not v^2
  
    pos.x =(pos.x+1)%WIDTH;
    pos.y =(pos.y+1)%HEIGHT;

  } 
  void display(){
    noStroke();
    fill(col[0]*(vel.mag()/10)%255,col[1]*(vel.mag()/10)%255,col[2]*(vel.mag()/10)%255);
    ellipseMode(CENTER);
    ellipse(pos.x,pos.y,rad,rad);
  }
}





  ArrayList<Ball> balls = new ArrayList<Ball>();
  final int time = 1;
  boolean pressed=false;
  final int WIDTH=400;
  final int HEIGHT=250;
  int mx,my;
  
void setup(){
  frameRate(60);
  size(WIDTH,HEIGHT);
  int x=(int)random(20)+1;
  for(int i=0; i<x; i++){
    balls.add(new Ball((int)random(WIDTH),(int)random(HEIGHT),(int)random(20)+5,(int)random(2000)));
  }
}

void draw(){
  int m = millis();
  size(WIDTH,HEIGHT);
    background(51);

  for (Ball b : balls){
    if(pressed){
      PVector pos= new PVector(mouseX,mouseY);
      b.updateF(pos, 50000);
    }
    b.step((float)time);
    b.display();
  }
  stroke(255);
  delay((int)(1-(m-millis())));
}

// checks to see if mouse is pressed
void mousePressed(){
    ellipse(mouseX, mouseY,10,10);
  pressed=true;
}
//sets pressed=false when mouse released
void mouseReleased(){
  pressed=false;
}


