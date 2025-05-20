document.querySelectorAll('.gesture-area').forEach(gestureArea => {
  // Initialize all scale elements
  const elements = Array.from(gestureArea.querySelectorAll('.scale-element'));
  
  elements.forEach(element => {
      // Get element dimensions for proper centering
      const rect = element.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      const state = {
          x: 0,
          y: 0,
          angle: 0,
          scale: 1,
          startX: 0,
          startY: 0,
          startAngle: 0,
          startScale: 1
      };

      // Set transform origin to center
      element.style.transformOrigin = 'center center';
      
      // Apply initial transform
      updateTransform();

      // Make element draggable
      interact(element).draggable({
          listeners: {
              start(event) {
                  state.startX = state.x;
                  state.startY = state.y;
              },
              move(event) {
                  state.x = state.startX + event.dx;
                  state.y = state.startY + event.dy;
                  updateTransform();
              }
          }
      });

      // Make element gesturable (scale/rotate)
      interact(element).gesturable({
          listeners: {
              start(event) {
                  state.startAngle = state.angle;
                  state.startScale = state.scale;
              },
              move(event) {
                  // Calculate new scale with center origin
                  const newScale = state.startScale * event.scale;
                  
                  // Calculate position adjustment to maintain center scaling
                  const scaleRatio = (newScale - state.scale) / state.scale;
                  const offsetX = (width / 2) * scaleRatio;
                  const offsetY = (height / 2) * scaleRatio;
                  
                  // Update state
                  state.x -= offsetX;
                  state.y -= offsetY;
                  state.angle = state.startAngle + event.da;
                  state.scale = newScale;
                  
                  updateTransform();
              }
          }
      });

      function updateTransform() {
          element.style.transform = `
              translate(${state.x}px, ${state.y}px)
              rotate(${state.angle}deg)
              scale(${state.scale})
          `;
      }
  });
});