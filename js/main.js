import Raven from "./Raven.js"
import drawScore from "./drawScore.js"

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
let timeToNextRaven = 0
let ravenInterval = 500
let lastTime = 0

window.addEventListener('click', (e) => {
  const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1)

  ravens.forEach(raven => {
    const isHit = raven.hit([...detectPixelColor.data])
    isHit && score++
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

  drawScore(ctx, score)
  ravens.forEach(raven => {
    raven.update(deltaTime)
    raven.draw(ctx, collisionCtx)
  })
  ravens = ravens.filter(raven => !raven.markedForDeletion)
  requestAnimationFrame(animate)
}

animate(0)