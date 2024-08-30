// Function to move the model in 3D space
const viewer = document.getElementById('sturgeonViewer');

// Wait for the model to load
viewer.addEventListener('load', () => {
    console.log('Model is ready and AR mode is supported');
    moveModel();
});

// Function to animate the model's position
function moveModel() {
    let posX = 0;
    let direction = 1; // Start moving forward

    function animate() {
        // Update position
        posX += 0.02 * direction; // Adjust speed as needed

        // Check boundaries and reverse direction if needed
        if (posX > 2 || posX < -2) { // Move between -2m and +2m
            direction *= -1;
        }

        // Apply position to the model
        viewer.setAttribute('camera-target', `${posX}m 1m 0m`); // Keep y at 1m for height, adjust if necessary
        viewer.setAttribute('camera-orbit', `${posX}m 1m 0m`);

        // Continue the animation
        requestAnimationFrame(animate);
    }

    // Start the animation
    animate();
}
