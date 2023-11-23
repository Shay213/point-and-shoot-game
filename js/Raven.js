export default class Raven {
  constructor(canvas) {
    this.canvas = canvas

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

    this.randomColors = [getRGBValue(), getRGBValue(), getRGBValue(), 255]
    this.color = `rgb(${this.randomColors[0]}, ${this.randomColors[1]}, ${this.randomColors[2]})`

    this.markedForDeletion = false
  }

  update(deltaTime){
    if(this.y < 0 || this.y > canvas.height - this.height){
      this.directionY *= -1
    }

    this.x -= this.directionX
    this.y += this.directionY

    this.timeSinceFlap += deltaTime
    if(this.timeSinceFlap > this.flapInterval){
      this.frame = this.frame > this.maxFrame ? 0 : this.frame + 1
      this.timeSinceFlap = 0
    }

    if(this.x < 0 - this.width){
      this.markedForDeletion = true
    }
  }

  draw(ctx, collisionCtx){
    collisionCtx.fillStyle = this.color
    collisionCtx.fillRect(this.x, this.y, this.width, this.height)
    ctx.drawImage(this.img, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
  }

  hit(colorArr){
    if(isSameArr(this.randomColors, colorArr)){
      this.markedForDeletion = true
      return true
    }
    return false
  }

  isOffScreen(){
    return this.x < 0 - this.width
  }
}

function getRGBValue(){
  return Math.floor(Math.random() * 255)
}

function isSameArr(arr1, arr2){
  return JSON.stringify(arr1) === JSON.stringify(arr2)
}