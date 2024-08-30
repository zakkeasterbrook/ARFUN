// Reference to the model viewer element
const viewer = document.getElementById('sturgeonViewer');

// Ensure AR starts correctly when the user interacts
viewer.addEventListener('ar-status', (event) => {
    if (event.detail.status === 'session-started') {
        console.log('AR session started');
        moveModel();
    }
});

// Function to animate the model's position
function moveModel() {
    let posX = 0;
    let direction = 1; // Movement direction

    function animate() {
        // Update position along the X axis
        posX += 0.01 * direction; // Adjust the speed of movement

        // Reverse direction if the model goes beyond set boundaries
        if (posX > 1 || posX < -1) { // Move within -1m to +1m range
            direction *= -1;
        }

        // Apply position to the model
        viewer.setAttribute('camera-target', `${posX}m 1m 0m`); // Y is kept constant at 1m height

        // Continue the animation
        requestAnimationFrame(animate);
    }

    // Start the animation
    animate();
}
