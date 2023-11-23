import Raven from "./Raven.js"

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let ravens = []
let timeToNextRaven = 0
let ravenInterval = 500
let lastTime = 0

function animate(timestamp){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  let deltaTime = timestamp - lastTime
  lastTime = timestamp
  timeToNextRaven += deltaTime

  if(timeToNextRaven > ravenInterval){
    ravens.push(new Raven(canvas))
    timeToNextRaven = 0
  }

  ravens.forEach(raven => {
    raven.update()
    raven.draw(ctx)
  })
  ravens = ravens.filter(raven => !raven.isOffScreen())

  requestAnimationFrame(animate)
}

animate(0)