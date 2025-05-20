var angleScale = {
  angle: 0,
  scale: 1
};
var gestureArea = document.getElementById('gesture-area');
var scaleElement = document.getElementById('scale-element');
var currentGesture = {
  startAngle: 0,
  startScale: 1
};

interact(gestureArea)
  .gesturable({
    listeners: {
      start(event) {
        // Store the initial values at gesture start
        currentGesture.startAngle = event.angle;
        currentGesture.startScale = event.scale;
      },
      move(event) {
        // Calculate the difference from the start of the gesture
        var angleDiff = event.angle - currentGesture.startAngle;
        var scaleDiff = event.scale / currentGesture.startScale;
        
        // Apply the difference to the stored values
        var currentAngle = angleScale.angle + angleDiff;
        var currentScale = angleScale.scale * scaleDiff;

        scaleElement.style.transform =
          'rotate(' + currentAngle + 'deg)' + 
          'scale(' + currentScale + ')';
      },
      end(event) {
        // Update the persistent values with the total change
        angleScale.angle += event.angle - currentGesture.startAngle;
        angleScale.scale *= event.scale / currentGesture.startScale;
      }
    }
  })
  .draggable({
    listeners: { move: dragMoveListener }
  });