var transformState = {
  angle: 0,
  scale: 1,
  x: 0,
  y: 0
};

var gestureArea = document.getElementById('gesture-area');
var scaleElement = document.getElementById('scale-element');
var currentGesture = {
  startAngle: 0,
  startScale: 1,
  startX: 0,
  startY: 0
};

function applyTransform() {
  scaleElement.style.transform = `
    translate(${transformState.x}px, ${transformState.y}px)
    rotate(${transformState.angle}deg)
    scale(${transformState.scale})
  `;
}

interact(gestureArea)
  .gesturable({
    listeners: {
      start(event) {
        currentGesture.startAngle = event.angle;
        currentGesture.startScale = event.scale;
      },
      move(event) {
        var angleDiff = event.angle - currentGesture.startAngle;
        var scaleDiff = event.scale / currentGesture.startScale;
        
        transformState.angle = angleDiff + transformState.angle;
        transformState.scale = scaleDiff * transformState.scale;
        
        applyTransform();
        currentGesture.startAngle = event.angle;
        currentGesture.startScale = event.scale;
      },
      end(event) {
        // Values are already updated in move()
      }
    }
  })
  .draggable({
    listeners: { 
      start(event) {
        currentGesture.startX = transformState.x;
        currentGesture.startY = transformState.y;
      },
      move(event) {
        transformState.x = currentGesture.startX + event.dx;
        transformState.y = currentGesture.startY + event.dy;
        applyTransform();
      }
    }
  });

// Initialize
applyTransform();