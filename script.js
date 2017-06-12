
var ship = new Image();
var turnSpd = 0.2;
var pwr = 0.6;
var h, w, px, py, canv, con;
var left = right = up = down = space = false;
var vy = vx = burnFrames = angle = 0;
var shotWait=20;
var shots = [];
window.onload=function(){
  canv = document.getElementById('canvas');
  h = canv.height = window.innerHeight;
  w = canv.width = window.innerWidth;
  px = w/2;
  py = h/2;
  con = canv.getContext('2d');
  ship.src = "ship.svg";
  con.fillRect(0,0, canv.width, canv.height);
  document.addEventListener('keydown', keyPush);
  document.addEventListener('keyup',keyUp);
  setInterval(game, 1000/30);
};

function game(){
  con.fillStyle='#222';
  con.fillRect(0,0, canv.width, canv.height);
  con.save();
  if(up){
    vy -= pwr*Math.cos(angle);
    vx += pwr*Math.sin(angle);
    if(burnFrames<1){
      ship.src='burningShip.svg';
      burnFrames++;
    }else if (burnFrames<2){
      ship.src='ship.svg';
      burnFrames++;
    }else{
      burnFrames=0;
    }
  }else{
    ship.src='ship.svg';
    burnFrams=0;
  }
  con.translate(px, py);
  con.rotate(angle);
  con.drawImage(ship, -15, -20);
  con.restore();
  console.log(shots);
  shots.forEach(function(shot, index){
    con.fillStyle = "#ddd";
    con.fillRect(shot.x, shot.y, 2, 2);
    shot.x+=shot.vx;
    shot.y+=shot.vy;
    if(shot.x<-3 || shot.x>w+3 || shot.y<-3 || shot.y>h+3){
      shots.splice(index, 1);
    }
  });
  con.fillStyle = "#222";

  px+=vx;
  py+=vy;
  if(px>w+10) px = -10;
  if(px<-10) px = w+10;
  if(py>h+10) py = -10;
  if(py<-10) py = h+10;
  if(left) angle-=turnSpd;
  if(right) angle+=turnSpd;
  if(space){
    if(shotWait > 4){
      var yvel = -33*Math.cos(-angle);
      var xvel = -33*Math.sin(-angle);
      var ypos = py-30*Math.cos(-angle);
      var xpos = px-30*Math.sin(-angle);
      shotWait=0;
      shots.push({x:xpos, y:ypos, vx:xvel, vy:yvel});
    }else{
      shotWait++;
    }
  }else{
    shotWait=20;
  }
  if(vy>30) vy=30;
  else if(vy<-30) vy=-30;
  if(vx>30) vx=30;
  else if(vx<-30) vx=-30;
  con.stroke();
}

function keyUp(e){
  var key = e.which;
  switch(key){
    case 37: left = false; break;
    case 38: up = false; break;
    case 39: right = false; break;
    case 32: space = false; break;
  }
}

function keyPush(e){
  var key = e.which;
  switch(key){
    case 37: left = true; break;
    case 38: up = true; break;
    case 39: right = true; break;
    case 32: space = true; break;
    case 40: vy = vx = 0;
  }
}

function shoot(){

}
