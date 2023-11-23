import Raven from "./Raven.js"
import drawScore from "./drawScore.js"
import Explosion from "./Explosion.js"

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
ctx.font = '50px Impact'

// Collision canvas
const collisionCanvas = document.getElementById('collisionCanvas')
const collisionCtx = collisionCanvas.getContext('2d')

collisionCanvas.width = window.innerWidth
collisionCanvas.height = window.innerHeight

let score = 0
let ravens = []
let explosions = []
let timeToNextRaven = 0
let ravenInterval = 500
let lastTime = 0
let gameOver = false

window.addEventListener('click', (e) => {
  const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1)

  ravens.forEach(raven => {
    const isHit = raven.hit([...detectPixelColor.data])
    if(isHit){
      explosions.push(new Explosion(raven.x, raven.y, raven.width))
      score++
    }
  })
})

function animate(timestamp){
  collisionCtx.clearRect(0, 0, collisionCanvas.width, collisionCanvas.height)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  let deltaTime = timestamp - lastTime
  lastTime = timestamp
  timeToNextRaven += deltaTime

  if(timeToNextRaven > ravenInterval){
    ravens.push(new Raven(canvas))
    timeToNextRaven = 0
  }

  drawScore(ctx, score);
  [...ravens, ...explosions].forEach(obj => {
    obj.update(deltaTime)
    obj.draw(ctx, collisionCtx)
    // check if raven is off screen
    if(obj?.isOffScreen()){
      gameOver = true
    }
  });
  ravens = ravens.filter(raven => !raven.markedForDeletion)
  explosions = explosions.filter(explosion => !explosion.markedForDeletion)

  gameOver ? drawGameOver() : requestAnimationFrame(animate)
}

function drawGameOver(){
  ctx.textAlign = 'center'
  ctx.fillStyle = 'black'
  ctx.fillText(`GAME OVER, your score is: ${score}`, canvas.width * 0.5, canvas.height * 0.5)
  ctx.fillStyle = 'white'
  ctx.fillText(`GAME OVER, your score is: ${score}`, canvas.width * 0.5 + 3, canvas.height * 0.5 + 3)
}

animate(0)