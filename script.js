// Yes I now use quotes instead of double quotes lol
document.onkeydown = (e) => {
  switch (e.key) {
    case 'ArrowLeft':
      player1.Xdir = -0.2
      break;
    case 'ArrowUp':
      player1.Ydir = -0.2
      break;
    case 'ArrowRight':
      player1.Xdir = 0.2
      break;
    case 'ArrowDown':
      player1.Ydir = 0.2
      break;
    case ' ':
      for(let i=0;i<bullets.length;i++){
        if(bullets[i]==null){
          bullets[i]=new Bullet(player1)
          bullets[i].sound[0].play()
          player1.bullets-=1
          break;
        }
      }
      break;
  }
}
document.onkeyup = (e) => {
  switch (e.key) {
    case 'ArrowLeft':
      player1.Xdir = 0
      break;
    case 'ArrowUp':
      player1.Ydir = 0
      break;
    case 'ArrowRight':
      player1.Xdir = 0
      break;
    case 'ArrowDown':
      player1.Ydir = 0
      break;
    case 'Space':

    break;
  }
}
let canvas = document.getElementById('Canvas')
canvas.width = 500
canvas.height = 500
let ctx = canvas.getContext('2d')
let GameOver = false
let upbtn1 = document.getElementById('up1')
//------------------------------------------------------------
//I had to set these to global variables
//------------------------------------------------------------
let panel = document.createElement('div')
panel.id = 'SettingsPanel'
let player1Color = 'green'
//------------------------------------------
let MusicLoaded = false
let Music = document.createElement('audio')
Music.src = 'Music1.wav'
Music.preload = 'metadata'
let MusicLenght = null
Music.onloadedmetadata = ()=>{
  MusicLenght = Music.duration
  MusicLoaded=true
}
let ResetMusic = undefined
let SpacePNG = document.createElement('img')
SpacePNG.src = 'Space.png'
let SpacePNGloaded = false
SpacePNG.onload = ()=>{
  SpacePNGloaded = true
}
//------------------------------------------------------------
//buttons & the settings panel
//------------------------------------------------------------
let SettingsBtn = document.getElementById('Settingsbtn')
SettingsBtn.onclick = ()=>{
  if(window.innerWidth>window.innerHeight){
    panel.style.borderWidth = '1vh'
    panel.style.fontSize = '2vh'
  }
  else{
    panel.style.borderWidth = '1vw'
    panel.style.fontSize = '2vw'
  }
  let ConsolePanel = document.createElement('div')
    ConsolePanel.style.position = 'absolute'
    ConsolePanel.style.right = '2%'
    ConsolePanel.style.bottom = '2%'
    ConsolePanel.style.width = '40%'
    ConsolePanel.style.height = '40%'
    ConsolePanel.style.backgroundColor = 'black'
    ConsolePanel.style.border = 'inset'
    ConsolePanel.style.borderColor = 'darkgrey'
    ConsolePanel.style.borderWidth = '1%'
    ConsolePanel.style.color = 'lightgreen'
    ConsolePanel.style.overflow = 'auto'
    let ConsolePanelTitle = document.createElement('h1')
    ConsolePanelTitle.style.textAlign = 'center'
    ConsolePanelTitle.innerText = 'Console'
    ConsolePanelTitle.style.border = 'dashed'
    ConsolePanelTitle.style.borderWidth = '1%'
    ConsolePanelTitle.style.borderColor = 'green'
    ConsolePanel.appendChild(ConsolePanelTitle)
  let ExitSettings = document.createElement('button')
    ExitSettings.innerText = 'Exit'
    ExitSettings.style.width = '5%'
    ExitSettings.style.height = '5%'
    ExitSettings.style.position = 'absolute'
    ExitSettings.style.right = 0
    ExitSettings.onclick = ()=>{
      panel.remove()
      window.removeEventListener('resize')
    }
  let SelectMusic = document.createElement('select')
    for(let i=1;i<=2;i++){
      let Select = document.createElement('option')
      Select.innerText = `Music${i}`
      Select.value=i
      SelectMusic.appendChild(Select)
    }
    SelectMusic.onchange = ()=>{
      MusicLenght = Music.duration
      Music.src = `Music${SelectMusic.value}.wav`
    }
  let MusicTitle = document.createElement('h1')
    MusicTitle.innerText = 'Music Settings'
  let OnMusicToggle = document.createElement('button')
    OnMusicToggle.innerText = 'on'
    OnMusicToggle.disabled = true
    OnMusicToggle.onclick = ()=>{
      OnMusicToggle.disabled = !OnMusicToggle.disabled
      OffMusicToggle.disabled = !OffMusicToggle.disabled
      Music.pause()
      Music.currentTime = 0
      ResetMusic = null
    }
  let OffMusicToggle = document.createElement('button')
    OffMusicToggle.innerText = 'off'
    OffMusicToggle.disabled = false
    OffMusicToggle.onclick = ()=>{
      OnMusicToggle.disabled = !OnMusicToggle.disabled
      OffMusicToggle.disabled = !OffMusicToggle.disabled
      if(MusicLoaded){
        Music.play()
      }
      else{
        ConsolePanel.appendChild(document.createTextNode('> Wait for the audio to load'))
      }
      ResetMusic = setInterval(()=>{
        Music.currentTime = 0
      },Math.floor(MusicLenght*1000))
    }
  let MusicPanel = document.createElement('div')
    MusicPanel.style.overflow = 'auto'
    MusicPanel.style.textAlign = 'center'
    MusicPanel.style.width = '30%'
    MusicPanel.style.height = '30%'
    MusicPanel.style.position = 'absolute'
    MusicPanel.style.left = '2%'
    MusicPanel.style.top = '2%'
    MusicPanel.style.background = 'linear-gradient(black,darkgrey,grey)'
    MusicPanel.style.border = 'inset'
    MusicPanel.style.borderColor = 'black'
    MusicPanel.appendChild(MusicTitle)
    MusicPanel.appendChild(document.createElement('br'))
    MusicPanel.appendChild(document.createTextNode('Music Toggle: '))
    MusicPanel.appendChild(OnMusicToggle)
    MusicPanel.appendChild(OffMusicToggle)
    MusicPanel.appendChild(document.createElement('br'))
    MusicPanel.appendChild(document.createTextNode('Music: '))
    MusicPanel.appendChild(SelectMusic)
  let PlayerSettings =  document.createElement('div')
    PlayerSettings.style.overflow = 'auto'
    PlayerSettings.style.width = '50%'
    PlayerSettings.style.height = '50%'
    PlayerSettings.style.position = 'absolute'
    PlayerSettings.style.left = '2%'
    PlayerSettings.style.bottom = '2%'
    PlayerSettings.style.background = 'linear-gradient(black,black,darkgrey,black,black)'
    PlayerSettings.style.border = 'inset'
    PlayerSettings.style.borderColor = 'black'
    let PlayerSettingsTitle = document.createElement('h1')
    PlayerSettingsTitle.innerText = 'PlayerSettigns'
    PlayerSettingsTitle.style.position = 'absolute'
    PlayerSettingsTitle.style.right = 0
    PlayerSettingsTitle.style.zIndex = 99999
    let ShowPlayer = document.createElement('canvas')
      let ShowPlayerCTX = ShowPlayer.getContext('2d')
      ShowPlayer.style.position = 'absolute'
      ShowPlayer.style.left = '2%'
      ShowPlayer.style.top = '2%'
      ShowPlayer.width = 500
      ShowPlayer.height = 500
      window.addEventListener('resize',ResizePlayerShowCanvas)
      function ResizePlayerShowCanvas(){
        if(window.innerHeight>window.innerWidth){
          ShowPlayer.style.width = `${((98/100)*window.innerWidth)/4}px`
          ShowPlayer.style.height = `${((98/100)*window.innerWidth)/4}px`
        }
        else{
          ShowPlayer.style.width = `${((98/100)*window.innerHeight)/4}px`
          ShowPlayer.style.height = `${((98/100)*window.innerHeight)/4}px`
        }
      }
      ResizePlayerShowCanvas()
      ShowPlayer.style.border = 'inset'
      ShowPlayer.style.borderColor = 'grey'
      ShowPlayerCTX.beginPath()
      if(SpacePNGloaded){
        ShowPlayerCTX.drawImage(SpacePNG,0,0,500,500)
      }
      else{
        ConsolePanel.appendChild(document.createTextNode('> Wait for the Space Background to load ad exit then '))
      }
      ShowPlayerCTX.beginPath()
      ShowPlayerCTX.moveTo(125,125)
      ShowPlayerCTX.lineTo(375,250)
      ShowPlayerCTX.lineTo(125,375)
      ShowPlayerCTX.fillStyle = player1Color
      ShowPlayerCTX.fill()
      let PlayerColorInput = document.createElement('div')
      PlayerColorInput.style.textAlign = 'center'
      PlayerColorInput.style.position = 'absolute'
      PlayerColorInput.style.left = '15%'
      PlayerColorInput.style.top = '75%'
      PlayerColorInput.style.width = '45%'
      PlayerColorInput.style.height = '20%'
      PlayerColorInput.style.backgroundColor = 'grey'
      let InputRed = document.createElement('input')
        InputRed.style.width = '15%'
        InputRed.style.height = '15%'
        InputRed.type = 'number'
        InputRed.max='255'
        InputRed.min='0'
      let InputGreen = document.createElement('input')
        InputGreen.style.width = '15%'
        InputGreen.style.height = '15%'
        InputGreen.type = 'number'
        InputGreen.max='255'
        InputGreen.min='0'
      let InputBlue = document.createElement('input')
        InputBlue.style.width = '15%'
        InputBlue.style.height = '15%'
        InputBlue.type = 'number'
        InputBlue.max='255'
        InputBlue.min='0'
    let UpdatePlayerColor = document.createElement('button')
      UpdatePlayerColor.onclick = ()=>{
        player1Color=`rgb(${InputRed.value},${InputGreen.value},${InputBlue.value})`
        player1.color = player1Color
        ShowPlayerCTX.beginPath()
        ShowPlayerCTX.moveTo(125,125)
        ShowPlayerCTX.lineTo(375,250)
        ShowPlayerCTX.lineTo(125,375)
        ShowPlayerCTX.fillStyle = player1Color
        ShowPlayerCTX.fill()
      }
      UpdatePlayerColor.innerText = 'Update'
      UpdatePlayerColor.style.position = 'absolute'
      UpdatePlayerColor.style.top = '75%'
      UpdatePlayerColor.style.width = '15%'
      UpdatePlayerColor.style.height = '20%'
      PlayerColorInput.appendChild(document.createTextNode('rgb('))
      PlayerColorInput.appendChild(InputRed)
      PlayerColorInput.appendChild(document.createTextNode(','))
      PlayerColorInput.appendChild(InputGreen)
      PlayerColorInput.appendChild(document.createTextNode(','))
      PlayerColorInput.appendChild(InputBlue)
      PlayerColorInput.appendChild(document.createTextNode(')'))
    PlayerSettings.appendChild(PlayerSettingsTitle)
    PlayerSettings.appendChild(UpdatePlayerColor)
    PlayerSettings.appendChild(ShowPlayer)
    PlayerSettings.appendChild(PlayerColorInput)
    PlayerSettings.appendChild(PlayerColorInput)
  panel.appendChild(ExitSettings)
  panel.appendChild(ConsolePanel)
  panel.appendChild(MusicPanel)
  panel.appendChild(PlayerSettings)
  document.body.appendChild(panel)
}
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
    document.getElementById('Stats1').style.fontSize = '3vh'
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
    document.getElementById('Stats1').style.fontSize = '3vw'
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
let space = 0
let space2 = 0
let speed1 = 1
let speed2 = 0.2
let MaxSize = 12
let timeBefore = performance.now()
let timepassed = performance.now() - timeBefore
//Player, asteroids, PowerUps, & stuff
//This is for something im adding in the future
function setHP(asteroid){
  if(asteroid.hp<=25){
    asteroid.hp = 1
  }
  else if(asteroid.hp<=50){
    asteroid.hp = 2
  }
  else{
    asteroid.hp = 3
  }
}
class asteroid {
  constructor() {
    this.height = Math.round(Math.random()*75)
    this.width = this.height
    space += this.width*2
    this.x = 500 + space
    this.y = Math.round(Math.random()*(500-this.width))
    this.hp
    this.Twidth = (this.width * speed1) * 0.2
    this.Theight = this.height - 2
    this.TrailX = this.x + this.width
    this.TrailY = this.y + 1
    this.img1 = document.createElement('img')
    this.img1.src = 'Asteroid.png'
  }
  updatePos(deltatime) {
    this.x -= (speed1/10)*deltatime
    this.Twidth = (this.width * speed1) * 0.2
    this.Theight = this.height - 2
    this.TrailX = this.x + this.width
    this.TrailY = this.y + 1
    if (this.x < 0-this.width-this.Twidth) {
      this.resetPos()
    }
    ctx.beginPath()
    ctx.drawImage(this.img1,this.x, this.y, this.width, this.height)
    ctx.beginPath()
    ctx.rect(this.TrailX, this.TrailY, this.Twidth, this.Theight)
    ctx.fillStyle = 'yellow'
    ctx.fill()
  }
  resetPos(){
    this.height = Math.round(Math.random()*100)
    this.width = this.height
    this.x = 500+this.width
    this.y = Math.round(Math.random()*(500-this.width))
    this.Twidth = (this.width * speed1) * 0.2
    this.Theight = this.height - 2
    this.TrailX = this.x + this.width
    this.TrailY = this.y + 1
  }
}
class player {
  constructor(color) {
    this.sheild = false
    this.sheildHp = 0
    this.inv = false
    this.invTime = 0
    this.width = 45
    this.height = 45
    this.x = 0
    this.y = 0
    this.hp = 10
    this.Xdir = 0
    this.Ydir = 0
    this.bullets = 3
    this.color = color
    this.blinks = 0
    this.hide = false
    this.sound = [document.createElement('audio'),document.createElement('audio')]
      this.sound[0].src = 'explosion.wav'
      this.sound[1].src = 'explosionEnd.wav'
    this.ShowHitBox = true
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
    if(this.collision()&&this.sheild){
      if(Timers[1]==null){
        if(this.hp>0){
          this.sound[0].play()
        }
        this.sheildHp-=1
        this.inv = true
        Timers[1] = new timer(2,()=>{
          this.inv=false
          Timers[1]=null
        })
      }
      this.Blink()
    }
    else if(this.collision()){
      if(Timers[1]==null){
        if(this.hp>0){
          this.sound[0].play()
        }
        this.hp-=1
        this.inv = true
        Timers[1] = new timer(2,()=>{
          this.inv=false
          Timers[1]=null
        })
      }
      this.Blink()
    }
    if (this.hp <= 0) {
      GameOver = true
      this.sound[1].play()

    }
    if (this.sheildHp > 0) {
      this.sheild = true
    }
    else{
      this.sheild = false
    }
    this.DrawPlayer()
  }
  collision() {
    for (let i = 0; i < asteroids.length; i++) {
      if(!(this.y + this.height < asteroids[i].y ||
        this.y > asteroids[i].y + asteroids[i].height ||
        this.x + this.width < asteroids[i].x ||
        this.x > asteroids[i].x + asteroids[i].width)){
          UpdateText()
          return true;
      }
    }
  }
  Blink(){
    if(Timers[2]==null){
      Timers[2]= new timer(0.1,()=>{
        player1.blinks+=1
        if(player1.blinks<=20){
          if(player1.hide==false){
            player1.hide=true
          }
          else{
            player1.hide=false
          }
        }
        else{
          player1.hide=false
          player1.blinks=0
          Timers[2]=null
        }
      })
    }
  }
  DrawPlayer(){
    if(this.sheild){
      ctx.beginPath()
      ctx.arc(this.x+(this.width/2),this.y+(this.height/2),this.width/1.5,0,2*Math.PI)
      ctx.fillStyle = '#002880'
      ctx.fill()
      ctx.beginPath()
      ctx.arc(this.x+(this.width/2),this.y+(this.height/2),this.width/3,0,2*Math.PI)
      ctx.fillStyle = 'cyan'
      ctx.fill()
    }
    if(!this.hide){
      ctx.beginPath()
      ctx.moveTo(this.x + this.width, this.y + (this.height / 2));
      ctx.lineTo(this.x, this.y + this.height);
      ctx.lineTo(this.x, this.y);
      ctx.fillStyle = this.color
      ctx.fill()
    }
    if (this.ShowHitBox) {
      ctx.beginPath();
      ctx.strokeStyle = 'white';
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}
class PowerUp{
  constructor(){
    this.type = Math.floor(Math.random()*3)
    /* 
    0=sheild
    1=slow
    2=speed
    */
   this.width = 45
   this.height = 45
   space2+=this.width*(Math.ceil(Math.random()*6))
   this.x=500+space2
   this.y=Math.round(Math.random()*(500-this.width))
   this.color
   this.img = document.createElement('img')
   this.sound = document.createElement('audio')
   this.sound.src = 'PowerUp.wav'
   switch (this.type) {
    case 0:
      this.color='blue'
      this.img.src = 'Sheild.png'
      break;
     case 1:  
      this.color='orange'
      this.img.src='SlowDown.png'
       break;
     case 2:
      this.color='red'
      this.img.src='SpeedUp.png'
       break;
    default:
      this.color='green'
      break;
    }
  }
  updatePos(deltatime){
    this.x-=speed2*deltatime
    if(this.x<= 0-this.width){
      this.resetPos()
    }
    if(this.collision()){
      this.sound.play()
      switch (this.type) {
        case 0:
          player1.sheildHp+=1
          player1.sheild=true
          break;
         case 1:
          speed1-=1
          speed1=parseFloat(speed1.toFixed(1))
          if(speed1<1){
            speed1=1
          }
          UpdateText()
           break;
         case 2:
          speed1+=1
          speed1=parseFloat(speed1.toFixed(1))
          UpdateText()
           break;
        default:
          this.color='green'
          break;
      }
      this.resetPos()
    }
    ctx.beginPath()
    ctx.drawImage(this.img,this.x, this.y, this.width, this.height)
    ctx.fillStyle=this.color
    ctx.fill()
  }
  collision(){
      if(!(this.y + this.height < player1.y ||
        this.y > player1.y + player1.height ||
        this.x + this.width < player1.x ||
        this.x > player1.x + player1.width)){
          return true
      }
      else{
        return false
      }
   }
  changeType(){
    this.type = Math.floor(Math.random()*3)
    switch (this.type) {
      case 0:
        this.color='blue'
        this.img.src = 'Sheild.png'
        break;
       case 1:
        this.color='orange'
        this.img.src='SlowDown.png'
         break;
       case 2:
        this.color='red'
        this.img.src='SpeedUp.png'
         break;
      default:
        this.color='green'
        break;
      }
  }
  resetPos(){
    this.x= 1000+(this.width*(Math.ceil(Math.random()*8)))
    this.y = Math.round(Math.random()*(500-this.width))
    this.changeType()
  }
}
class timer{
  constructor(interval,action,hide){
    this.x=500
    this.interval = interval
    this.action = action
    this.hide = true
  }
  updatePos(deltatime){
    this.x-=(0.5/this.interval)*deltatime
    if(this.x<=0){
      this.x=500
      this.action()
    }
    if(!this.hide){
      ctx.beginPath()
      ctx.rect(this.x,50,50,50)
      ctx.fillStyle = 'red'
      ctx.fill()
    }
  }
}
class Bullet{
  constructor(owner){
    this.x = owner.x+owner.width
    this.y = owner.y+(owner.height/2)
    this.endX = this.x+150
    this.width = 5
    this.height = 5
    this.shot = true
    this.owner = owner
    this.sound = [document.createElement('audio'),document.createElement('audio')]
    this.sound[0].src = 'laserShoot.wav'
    this.sound[1].src = 'explosion.wav'
  }
  updatePos(deltatime){
    if(this.shot){
      if(this.x>=canvas.width||this.x>=this.endX){
        this.shot=false
        this.owner.bullets+=1
      }
      this.x+=0.2*deltatime
      ctx.beginPath()
      ctx.rect(this.x,this.y,this.width,this.height)
      ctx.fillStyle = 'red'
      ctx.fill()
      this.collision()
    }
  }
  collision(){
    for (let i = 0; i < asteroids.length; i++) {
      if(!(this.y + this.height < asteroids[i].y ||
        this.y > asteroids[i].y + asteroids[i].height ||
        this.x + this.width < asteroids[i].x ||
        this.x > asteroids[i].x + asteroids[i].width)){
          asteroids[i].resetPos()
          this.sound[1].play()
          this.shot = false
          this.owner.bullets+=1
          return true;
      }
    }
  }
}
let player1 = new player('green')
let asteroids = []
for (let i = 0; i < 6; i++) {
  asteroids.push(new asteroid())
}
for (let i = 0; i < 6; i++) {
  asteroids[i].hp = setHP(asteroids[i])
}
let PowerUps = []
for (let i = 0; i < 4; i++) {
  PowerUps.push(new PowerUp())
}
let bullets = []
for (let i = 0; i < player1.bullets; i++) {
  bullets.push(null)
}
let Timers = [null,null,null]
/*
  ----------
  Timer List
  ----------
  1.) speed increse
  2.) Player invisibility
  3.) Player Blink
 */
Timers[0]=(new timer(5,()=>{
  speed1+=0.1
  speed1=parseFloat(speed1.toFixed(1))
  UpdateText()
}))
ctx.font = '10px Arial'
//Drawing each frame
let draw = null//setInterval(drawing,0)
window.onload = ()=>{
  draw = setInterval(drawing,0)
}
function drawing() {
  try{
  timepassed = performance.now() - timeBefore
  timeBefore = performance.now()
  ctx.mozImageSmoothingEnabled = false
  ctx.msImageSmoothingEnabled = false
  ctx.imageSmoothingEnabled = false
  UpdateText()
  ctx.beginPath();
  ctx.rect(0, 0, 500, 500);
  ctx.fillStyle = 'black';
  ctx.fill();
  player1.updatePos(timepassed)
  for (let i = 0; i < asteroids.length; i++) {
    asteroids[i].updatePos(timepassed);
  }
  for (let i = 0; i < PowerUps.length; i++) {
    PowerUps[i].updatePos(timepassed);
  }
  for (let i = 0; i < bullets.length; i++) {
    if(bullets[i]!=null){
      if(bullets[i].shot==false){
        bullets[i]=null
      }
      else{
        bullets[i].updatePos(timepassed);
      }
    }
  }
  for (let i = 0; i < Timers.length; i++) {
    if(Timers[i]!=null){
      Timers[i].updatePos(timepassed);
    }
  }
  player1.DrawPlayer()
  if (GameOver == true) {
    DrawGameOver()
  }
  else{
    //window.requestAnimationFrame(draw)
  }
  }
  catch(err){
    document.writeln(`An error has occured\nINFO:\n${err}`)
    clearInterval(draw)
  }
}
function UpdateText(){
  document.getElementById('Stats1').innerText = (`hp: ${player1.hp}`)
  document.getElementById('Stats1').appendChild(document.createElement('br'))
  document.getElementById('Stats1').appendChild(document.createTextNode(`Sheid hp: ${player1.sheildHp}`))
  document.getElementById('Stats1').appendChild(document.createElement('br'))
  document.getElementById('Stats1').appendChild(document.createTextNode(`Bullets: ${player1.bullets}`))
  document.getElementById('Stats1').appendChild(document.createElement('hr'))
  document.getElementById('Stats1').appendChild(document.createTextNode(`Speed: ${speed1}`))
  document.getElementById('Stats1').appendChild(document.createElement('br'))
  document.getElementById('Stats1').appendChild(document.createTextNode(`Fps: ${Math.floor(1000/timepassed)}`))
}
function DrawGameOver() {
  clearInterval(draw)
  let oof = document.createElement('audio')
  oof.src = 'explosionEnd.wav'
  oof.play()
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
  draw = setInterval(drawing,0)
  space = 40
  space2 = 20
  speed1 = 1
  speed2 = 0.1
  GameOver = false
  player1 = new player('green')
  for (let i = 0; i <= 5; i++) {
    asteroids[i] = new asteroid()
  }
  for (let i = 0; i <= 5; i++) {
    PowerUps[i] = new PowerUp()
  }
  for (let i = 0; i <= 5; i++) {
    Timers[i] = null
  }
  Timers[0]=(new timer(5,()=>{
    speed1+=0.1
    speed1=parseFloat(speed1.toFixed(1))
  }))
  setInterval(draw,0)
}
//window.requestAnimationFrame(draw)
