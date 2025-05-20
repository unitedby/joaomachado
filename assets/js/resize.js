document.querySelectorAll('.gesture-area').forEach((gestureArea) => {
  // Store transform states for each scale-element
  const scaleElements = Array.from(gestureArea.querySelectorAll('.scale-element'));
  
  // Initialize transform states for each element
  const elementsData = scaleElements.map((el) => ({
      element: el,
      transformState: {
          angle: 0,
          scale: 1,
          x: 0,
          y: 0
      },
      currentGesture: {
          startAngle: 0,
          startScale: 1,
          startX: 0,
          startY: 0
      }
  }));

  // Track which element is currently being transformed
  let activeElement = null;

  function applyTransform(elementData) {
      const { transformState } = elementData;
      elementData.element.style.transform = `
          translate(${transformState.x}px, ${transformState.y}px)
          rotate(${transformState.angle}deg)
          scale(${transformState.scale})
      `;
  }

  interact(gestureArea)
      .gesturable({
          listeners: {
              start(event) {
                  // Find which scale-element was clicked
                  const clickedElement = event.target.closest('.scale-element');
                  activeElement = elementsData.find(data => data.element === clickedElement);
                  
                  if (activeElement) {
                      activeElement.currentGesture.startAngle = event.angle;
                      activeElement.currentGesture.startScale = event.scale;
                  }
              },
              move(event) {
                  if (!activeElement) return;
                  
                  const { transformState, currentGesture } = activeElement;
                  const angleDiff = event.angle - currentGesture.startAngle;
                  const scaleDiff = event.scale / currentGesture.startScale;
                  
                  transformState.angle += angleDiff;
                  transformState.scale *= scaleDiff;
                  
                  applyTransform(activeElement);
                  currentGesture.startAngle = event.angle;
                  currentGesture.startScale = event.scale;
              }
          }
      })
      .draggable({
          listeners: {
              start(event) {
                  const clickedElement = event.target.closest('.scale-element');
                  activeElement = elementsData.find(data => data.element === clickedElement);
                  
                  if (activeElement) {
                      activeElement.currentGesture.startX = activeElement.transformState.x;
                      activeElement.currentGesture.startY = activeElement.transformState.y;
                  }
              },
              move(event) {
                  if (!activeElement) return;
                  
                  const { transformState, currentGesture } = activeElement;
                  transformState.x = currentGesture.startX + event.dx;
                  transformState.y = currentGesture.startY + event.dy;
                  applyTransform(activeElement);
              }
          }
      });

  // Initialize transforms
  elementsData.forEach(applyTransform);
});