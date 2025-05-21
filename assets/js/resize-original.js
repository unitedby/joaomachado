document.querySelectorAll('.gesture-area').forEach((gestureArea) => {
    const scaleElement = gestureArea.querySelector('.scale-element');
    const transformState = {
        angle: 0,
        scale: 1,
        x: 0,
        y: 0
    };
    
    const currentGesture = {
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
  
    // Gesture handling for pinch-to-zoom and rotation
    interact(gestureArea)
        .gesturable({
            listeners: {
                start(event) {
                    currentGesture.startAngle = event.angle;
                    currentGesture.startScale = event.scale;
                },
                move(event) {
                    const angleDiff = event.angle - currentGesture.startAngle;
                    const scaleDiff = event.scale / currentGesture.startScale;
                    
                    transformState.angle += angleDiff;
                    transformState.scale *= scaleDiff;
                    
                    applyTransform();
                    currentGesture.startAngle = event.angle;
                    currentGesture.startScale = event.scale;
                }
            }
        })
        .draggable({
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ],
            autoScroll: true,
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
                // Removed the end event listener that displayed text
            }
        });
  
    applyTransform(); // Initialize the transformation
});