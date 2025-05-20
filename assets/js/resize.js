document.querySelectorAll('.gesture-area').forEach(gestureArea => {
  const elements = Array.from(gestureArea.querySelectorAll('.scale-element .draggable-item'));
  
  elements.forEach(element => {
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

      updateTransform();

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

      interact(element).gesturable({
          listeners: {
              start(event) {
                  state.startAngle = state.angle;
                  state.startScale = state.scale;
              },
              move(event) {
                  state.angle = state.startAngle + event.da;
                  state.scale = state.startScale * event.scale;
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