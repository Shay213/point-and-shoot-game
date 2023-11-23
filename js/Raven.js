export default class Raven {
  constructor(canvas) {
    this.img = new Image()
    this.img.src = './assets/raven.png'
    this.spriteWidth = 271
    this.spriteHeight = 194

    this.width = this.spriteWidth * 0.5
    this.height = this.spriteHeight * 0.5

    this.x = canvas.width
    this.y = Math.random() * (canvas.height - this.height)
    this.directionX = Math.random() * 5 + 3
    this.directionY = Math.random() * 5 - 2.5

    this.frame = 0
    this.maxFrame = 4
    this.timeSinceFlap = 0
    this.flapInterval = 100
  }

  update(deltaTime){
    this.x -= this.directionX

    this.timeSinceFlap += deltaTime
    if(this.timeSinceFlap > this.flapInterval){
      this.frame = this.frame > this.maxFrame ? 0 : this.frame + 1
      this.timeSinceFlap = 0
    }
  }

  draw(ctx){
    ctx.strokeRect(this.x, this.y, this.width, this.height)
    ctx.drawImage(this.img, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
  }

  isOffScreen(){
    return this.x < 0 - this.width
  }
}