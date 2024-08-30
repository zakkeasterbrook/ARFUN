// Reference to the model viewer element
const viewer = document.getElementById('sturgeonViewer');

// Wait for the model to be ready
viewer.addEventListener('ar-status', (event) => {
    if (event.detail.status === 'session-started') {
        console.log('AR session started');
        moveModel();
    }
});

// Function to move the model in AR space
function moveModel() {
    let posX = 0;
    let direction = 1; // Movement direction

    function animate() {
        // Update position along the X axis
        posX += 0.02 * direction; // Adjust the speed of movement

        // Reverse direction if the model goes beyond set boundaries
        if (posX > 1 || posX < -1) { // Move within -1m to +1m range
            direction *= -1;
        }

        // Set the new position in 3D space
        viewer.setAttribute('ar-placement', `floor`);
        viewer.setAttribute('camera-target', `${posX}m 1m 0m`);

        // Repeat the animation
        requestAnimationFrame(animate);
    }

    // Start the animation
    animate();
}
