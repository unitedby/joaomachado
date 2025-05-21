document.addEventListener('DOMContentLoaded', function() {
    var angleScale = {
      angle: 0,
      scale: 1
    };
    
    var gestureArea = document.getElementById('gesture-area');
    var scaleElement = document.getElementById('scale-element');
    
    function dragMoveListener(event) {
      var target = event.target;
      var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
      
      // Get current transform without translation
      var transform = target.style.transform.replace(/translate\(.*?\)/, '');
      
      target.style.transform = 
        transform + 
        ' translate(' + x + 'px, ' + y + 'px)';
      
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }
    
    interact(gestureArea)
      .gesturable({
        listeners: {
          start(event) {
            angleScale.angle -= event.angle;
          },
          move(event) {
            var currentAngle = event.angle + angleScale.angle;
            var currentScale = event.scale * angleScale.scale;
            var x = (parseFloat(scaleElement.getAttribute('data-x')) || 0);
            var y = (parseFloat(scaleElement.getAttribute('data-y')) || 0);
            
            scaleElement.style.transform =
              'translate(' + x + 'px, ' + y + 'px) ' +
              'rotate(' + currentAngle + 'deg) ' + 
              'scale(' + currentScale + ')';
          },
          end(event) {
            angleScale.angle += event.angle;
            angleScale.scale *= event.scale;
          }
        }
      })
      .draggable({
        listeners: { 
          move: dragMoveListener 
        }
      });
  });