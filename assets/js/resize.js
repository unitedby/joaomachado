var angleScale = {
  angle: 0,
  scale: 1
}
var gestureArea = document.getElementById('gesture-area')
var scaleElement = document.getElementById('scale-element')

interact(gestureArea)
  .gesturable({
    listeners: {
      start (event) {
        angleScale.angle -= event.angle

      },
      move (event) {
        // document.body.appendChild(new Text(event.scale))
        var currentAngle = event.angle + angleScale.angle
        var currentScale = event.scale * angleScale.scale

        scaleElement.style.transform =
          'rotate(' + currentAngle + 'deg)' + 'scale(' + currentScale + ')'

        // uses the dragMoveListener from the draggable demo above
        dragMoveListener(event)
      },
      end (event) {
        angleScale.angle = angleScale.angle + event.angle
        angleScale.scale = angleScale.scale * event.scale

      }
    }
  })
  .draggable({
    listeners: { move: dragMoveListener }
  })

