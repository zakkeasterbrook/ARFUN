// Get the model-viewer element
const viewer = document.getElementById('sturgeonViewer');

// Event listener to ensure AR starts when ready
viewer.addEventListener('ar-status', (event) => {
    if (event.detail.status === 'session-started') {
        console.log('AR session started successfully');
        startModelAnimation();
    } else if (event.detail.status === 'failed') {
        console.warn('AR session failed to start');
    }
});

// Function to position the model directly in front of the user in AR
function startModelAnimation() {
    let posX = 0; // Initial position on the X-axis
    let direction = 1; // Start moving forward

    function animateModel() {
        posX += 0.01 * direction; // Move the model along the X-axis

        // Bounce back when reaching certain bounds
        if (posX > 1 || posX < -1) {
            direction *= -1; // Reverse direction
        }

        // Update model's position attributes
        viewer.setAttribute('camera-target', `${posX}m 1m 0m`); // Adjust the position dynamically

        // Loop the animation
        requestAnimationFrame(animateModel);
    }

    // Start the model movement animation
    animateModel();
}
