export default class Explosion {
  constructor(x, y, size){
    this.img = new Image()
    this.img.src = './assets/boom.png'
    this.spriteWidth = 200
    this.spriteHeight = 179
    
    this.audio = new Audio()
    this.audio.src = './assets/boom.wav'

    this.x = x
    this.y = y
    this.size = size

    this.timeSinceLastFrame = 0
    this.frameInterval = 100
    this.frame = 0

    this.markedForDeletion = false
  }

  update(deltaTime){
    if(this.frame === 0) this.audio.play()

    this.timeSinceLastFrame += deltaTime
    if(this.timeSinceLastFrame > this.frameInterval){
      this.frame++
      this.timeSinceLastFrame = 0
    }

    if(this.frame > 5){
      this.markedForDeletion = true
    }
  }

  draw(ctx){
    ctx.drawImage(this.img, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.size, this.size)
  }
}