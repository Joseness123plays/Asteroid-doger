// Yes I now use quotes instead of double quotes lol
document.onkeydown = (e) => {
  switch (e.keyCode) {
    case 37:
      player1.Xdir = -0.2
      break;
    case 38:
      player1.Ydir = -0.2
      break;
    case 39:
      player1.Xdir = 0.2
      break;
    case 40:
      player1.Ydir = 0.2
      break;
  }
}
document.onkeyup = (e) => {
  switch (e.keyCode) {
    case 37:
      player1.Xdir = 0
      break;
    case 38:
      player1.Ydir = 0
      break;
    case 39:
      player1.Xdir = 0
      break;
    case 40:
      player1.Ydir = 0
      break;
  }
}
let music = document.createElement('audio')
music.loop = true

let canvas = document.getElementById('Canvas')
let ctx = canvas.getContext('2d')
let GameOver = false
let upbtn1 = document.getElementById('up1')
//buttons
upbtn1.ontouchstart = () => {
  player1.Ydir = -0.2
}
upbtn1.ontouchend = () => {
  player1.Ydir = 0
}
upbtn1.onmousedown = () => {
  player1.Ydir = -0.2
}
upbtn1.onmouseup = () => {
  player1.Ydir = 0
}
let downbtn1 = document.getElementById('down1')
downbtn1.ontouchstart = () => {
  player1.Ydir = 0.2
}
downbtn1.ontouchend = () => {
  player1.Ydir = 0
}
downbtn1.onmousedown = () => {
  player1.Ydir = 0.2
}
downbtn1.onmouseup = () => {
  player1.Ydir = 0
}
let leftbtn1 = document.getElementById('left1')
leftbtn1.ontouchstart = () => {
  player1.Xdir = -0.2
}
leftbtn1.ontouchend = () => {
  player1.Xdir = 0
}
leftbtn1.onmousedown = () => {
  player1.Xdir = -0.2
}
leftbtn1.onmouseup = () => {
  player1.Xdir = 0
}
let rightbtn1 = document.getElementById('right1')
rightbtn1.ontouchstart = () => {
  player1.Xdir = 0.2
}
rightbtn1.ontouchend = () => {
  player1.Xdir = 0
}
rightbtn1.onmousedown = () => {
  player1.Xdir = 0.2
}
rightbtn1.onmouseup = () => {
  player1.Xdir = 0
}
//Resizing
let GameControls1 = document.getElementById('GameControls1')
let CanvasWidth
let CanvasHeight
function resize() {
  let RATIO = 16 / 9
  CanvasWidth = window.innerWidth
  CanvasHeight = window.innerHeight
  if (CanvasHeight < CanvasWidth/*/RATIO*/) {
    CanvasWidth = CanvasHeight//*RATIO 
  }
  else {
    CanvasHeight = CanvasWidth///RATIO 
  }
  canvas.style.width = CanvasWidth + 'px'
  canvas.style.height = CanvasHeight + 'px'
  document.getElementById('Stats1').style.width = CanvasWidth + 'px'
  document.getElementById('Stats1').style.left = (window.innerWidth / 2) - (CanvasWidth / 2) + 'px'
  canvas.style.left = (window.innerWidth / 2) - (CanvasWidth / 2) + 'px'
  canvas.style.top = (window.innerHeight / 2) - (CanvasHeight / 2) + 'px'
  if (window.innerWidth > window.innerHeight) {
    GameControls1.style.width = '30vh'
    GameControls1.style.height = '30vh'
    upbtn1.style.fontSize = (3/100*window.innerHeight)+'px'
    downbtn1.style.fontSize = (3/100*window.innerHeight)+'px'
    leftbtn1.style.fontSize = (3/100*window.innerHeight)+'px'
    rightbtn1.style.fontSize = (3/100*window.innerHeight)+'px'
    document.getElementById('Settings').style.width = (10/100*window.innerHeight)+'px'
    document.getElementById('Settings').style.height = (10/100*window.innerHeight)+'px'
  }
  else {
    GameControls1.style.width = '30vw'
    GameControls1.style.height = '30vw'
    upbtn1.style.fontSize = (3/100*window.innerWidth)+'px'
    downbtn1.style.fontSize = (3/100*window.innerWidth)+'px'
    leftbtn1.style.fontSize = (3/100*window.innerWidth)+'px'
    rightbtn1.style.fontSize = (3/100*window.innerWidth)+'px'

  }
}
resize()
window.addEventListener('resize', resize)
let space = 40
let space2 = 20
let speed1 = 0.1
let speed2 = 0.2
let MaxSize = 12
let timeBefore = performance.now()
let timepassed = performance.now() - timeBefore
//Player, asteroids, PowerUps, & stuff
class asteroid {
  constructor() {
    this.height = Math.round(Math.random()*100)
    this.width = this.height
    this.x = 500 + space
    space += this.width*2
    this.y = Math.round(Math.random()*(500-this.width))
    this.Twidth = (this.width * speed1) * 0.2
    this.Theight = this.height - 2
    this.TrailX = this.x + this.width
    this.TrailY = this.y + 1
    this.img1 = document.createElement('img')
    this.img1.src = 'Asteroid.png'
  }
  updatePos(deltatime) {
    this.x -= speed1*deltatime
    this.Twidth = (this.width * speed1) * 0.2
    this.Theight = this.height - 2
    this.TrailX = this.x + this.width
    this.TrailY = this.y + 1
    if (this.x < 0-this.width-this.Twidth) {
      this.height = Math.round(Math.random()*100)
      this.width = this.height
      this.x = 500+this.width
      this.y = Math.round(Math.random()*(500-this.width))
      this.Twidth = (this.width * speed1) * 0.2
      this.Theight = this.height - 2
      this.TrailX = this.x + this.width
      this.TrailY = this.y + 1
    }
    ctx.beginPath()
    ctx.drawImage(this.img1,this.x, this.y, this.width, this.height)
    ctx.beginPath()
    ctx.rect(this.TrailX, this.TrailY, this.Twidth, this.Theight)
    ctx.fillStyle = 'yellow'
    ctx.fill()
  }
}
class player {
  constructor(color) {
    this.sheid = false
    this.sheidHp = 0
    this.inv = false
    this.invTime = 0
    this.width = 45
    this.height = 45
    this.x = 0
    this.y = 0
    this.hp = 20
    this.Xdir = 0
    this.Ydir = 0
    this.color = color
    this.blinkTime = 0
    this.blink = false
    this.ShowHitBox = false
  }
  updatePos(deltatime){
    if(this.x<0){
      this.x=this.x+(-this.x)
    }
    if(this.x+this.width>500){
      this.x=this.x-((this.x+this.width)-500)
    }
    if(this.y<0){
      this.y=this.y+(-this.y)
    }
    if(this.y+this.height>500){
      this.y=this.y-((this.y+this.height)-500)
    }
    if(!((this.x<=0&&this.Xdir<0)||(this.x>=500-this.width&&this.Xdir>0))){
      this.x += this.Xdir*deltatime
    }
    if(!((this.y<=0&&this.Ydir<0)||(this.y>=500-this.height&&this.Ydir>0))){
      this.y += this.Ydir*deltatime
    }
    ctx.beginPath()
    ctx.moveTo(this.x + this.width, this.y + (this.height / 2));
    ctx.lineTo(this.x, this.y + this.height);
    ctx.lineTo(this.x, this.y);
    ctx.fillStyle = this.color
    ctx.fill()
    if (this.ShowHitBox) {
      ctx.beginPath();
      ctx.strokeStyle = 'white';
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
    if (this.inv) {
      this.invTime--
      if (this.invTime <= 0) {
        this.inv = false
        this.invTime = 0
      }
    }
    else if (this.collision()&&this.sheid) {
      this.sheidHp -= 1
      this.inv = true
      this.invTime = 100
    }
    else if (this.collision()) {
      this.hp -= 1
      this.inv = true
      this.invTime = 100
    }
    if (this.hp <= 0) {
      GameOver = true
    }
    if (this.sheidHp == 0) {
      this.sheid = false
    }
  }
  collision() {
    for (let i = 0; i < asteroids.length; i++) {
      if(!(this.y + this.height < asteroids[i].y ||
        this.y > asteroids[i].y + asteroids[i].height ||
        this.x + this.width < asteroids[i].x ||
        this.x > asteroids[i].x + asteroids[i].width)){
          return true;
      }
    }
  }
}
class PowerUp{
  constructor(){
    this.frameWidth = 160
    this.frameHeight = 160
    this.frameX = 0
    this.frameY = 0
    this.width = 45                           
    this.height = 45
    this.x = 500+space2
    space2+=this.width*4
    this.y = Math.round(Math.random()*(500-this.width))
    this.img = document.createElement('img')
    this.img.src = 'Sheild.png'
  }
  updatePos(deltatime){
    this.x-=speed2*deltatime
    if(this.x<= 0-this.width){
      this.x= 500+this.width
      this.y = Math.round(Math.random()*(500-this.width))
    }
    ctx.beginPath()
    ctx.drawImage(this.img,this.frameX,this.frameY,this.frameWidth,this.frameHeight,this.x,this.y,this.width,this.height)
    this.collision()
  }
  collision(){
      if(!(this.y + this.height < player1.y ||
        this.y > player1.y + player1.height ||
        this.x + this.width < player1.x ||
        this.x > player1.x + player1.width)){
          this.frameX+=160
          if(this.frameX>=480){
            this.frameX = 0
          }
          player1.sheidHp+=1
          player1.sheid = true
          this.x= 500+this.width
          this.y = Math.round(Math.random()*(500-this.width))
      }
   }
}
/*class timer{
  constructor(){
    this.x=500
  }
}
let timer1 = {
  x:500,
  updatePos(deltatime){
    this.x-=0.3*deltatime
    if(this.x<=0){
      this.x=500
      console.log("1")
    }
  }
}*/
let player1 = new player('green')
let asteroids = []
for (let i = 0; i < 6; i++) {
  asteroids.push(new asteroid())
}
let PowerUps = []
for (let i = 0; i < 2; i++) {
  PowerUps.push(new PowerUp())
}
ctx.font = '10px Arial'
//Drawing each frame
let draw = drawing
function drawing() {
  timepassed = performance.now() - timeBefore
  timeBefore = performance.now()
  ctx.mozImageSmoothingEnabled = false
  ctx.msImageSmoothingEnabled = false
  ctx.imageSmoothingEnabled = false
  document.getElementById('Stats1').innerText = ('hp: ' + player1.hp + '\nSheid hp: ' + player1.sheidHp)
  document.getElementById('Stats1').appendChild(document.createElement('hr'))
  document.getElementById('Stats1').appendChild(document.createTextNode('Speed: '+Math.floor(speed1*10)))
  document.getElementById('Stats1').appendChild(document.createElement('br'))
  document.getElementById('Stats1').appendChild(document.createTextNode('Fps: '+Math.floor(1000/timepassed)))
  ctx.beginPath();
  ctx.rect(0, 0, 500, 500);
  ctx.fillStyle = 'black';
  ctx.fill();
  timer1.updatePos(timepassed)
  player1.updatePos(timepassed)
  for (let i = 0; i < asteroids.length; i++) {
    asteroids[i].updatePos(timepassed);
  }
  for (let i = 0; i < PowerUps.length; i++) {
    PowerUps[i].updatePos(timepassed);
  }
  if (GameOver == true) {
    DrawGameOver()
  }
  window.requestAnimationFrame(draw)
}
function DrawGameOver() {
  draw = null
  ctx.beginPath()
  ctx.font = '50px "Press Start 2P"'
  ctx.fillStyle = 'red'
  ctx.fillText('!GameOver!',5, 250);
  let Reset = document.createElement('button')
  Reset.innerText = 'Reset'
  Reset.style.position = 'fixed'
  function ResizeResetBtn(Reset){
    if(window.innerWidth>window.innerHeight){
      Reset.style.fontSize = (2.5/100*window.innerHeight)+'px'
      Reset.style.width = 10/100*window.innerHeight + 'px'
      Reset.style.height = 10/100*window.innerHeight + 'px'
    }
    else{
      Reset.style.fontSize = (2.5/100*window.innerWidth)+'px'
      Reset.style.width = 10/100*window.innerWidth + 'px'
      Reset.style.height = 10/100*window.innerWidth + 'px'
    }
    Reset.style.left = window.innerWidth/2 - (5/100*window.innerWidth)/2 +'px'
    Reset.style.top = window.innerHeight/2+'px'
  }
  ResizeResetBtn(Reset)
  window.addEventListener('resize',ResizeResetBtn)
  Reset.onclick = () => {
    Reset.remove()
    ResetGame()
    window.removeEventListener('resize')
  }
  document.body.appendChild(Reset)
}
function ResetGame() {
  draw = drawing
  space = 40
  speed = 0.4
  MaxSize = 12
  GameOver = false
  player1 = new player('green')
  for (let i = 0; i <= 5; i++) {
    asteroids[i] = new asteroid()
  }
  for (let i = 0; i <= 5; i++) {
    PowerUps[i] = new PowerUp()
  }
  draw()
}
window.requestAnimationFrame(draw)
