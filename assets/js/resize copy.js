document.querySelectorAll('.gesture-area').forEach(gestureArea => {
    const elements = Array.from(gestureArea.querySelectorAll('.scale-element'));
    
    elements.forEach(element => {
        const state = {
            x: 0,
            y: 0,
            angle: 0,
            scale: 1,
            startX: 0,
            startY: 0,
            startAngle: 0,
            startScale: 1,
            isGesturing: false
        };
  
        updateTransform();
  
        interact(element).draggable({
            listeners: {
                start(event) {
                    // Don't drag if we're in the middle of a gesture
                    if (state.isGesturing) {
                        event.stopImmediatePropagation();
                        return;
                    }
                    state.startX = state.x;
                    state.startY = state.y;
                },
                move(event) {
                    if (state.isGesturing) return;
                    state.x = state.startX + event.dx;
                    state.y = state.startY + event.dy;
                    updateTransform();
                }
            }
        });
  
        interact(element).gesturable({
            listeners: {
                start(event) {
                    state.isGesturing = true;
                    state.startAngle = state.angle;
                    state.startScale = state.scale;
                },
                move(event) {
                    state.angle = state.startAngle + event.da;
                    state.scale = Math.max(0.1, Math.min(state.startScale * event.scale, 10)); // Limit scale
                    updateTransform();
                },
                end(event) {
                    state.isGesturing = false;
                }
            }
        });
  
        function updateTransform() {
            element.style.transform = `
                translate(${state.x}px, ${state.y}px)
                rotate(${state.angle}deg)
                scale(${state.scale})
            `;
            // Improve performance on mobile
            element.style.willChange = 'transform';
        }
    });
  });