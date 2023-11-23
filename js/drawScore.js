export default function drawScore(ctx, score){
  ctx.fillStyle = 'black'
  ctx.fillText('Score: ' + score, 50, 75)
  ctx.fillStyle = 'white'
  ctx.fillText('Score: ' + score, 53, 78)
}