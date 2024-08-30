// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);

// Set background color to resemble underwater
scene.background = new THREE.Color(0x003366);

// Add lighting to simulate underwater lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light for general illumination
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0x88aaff, 1, 100); // Blueish light to simulate water
pointLight.position.set(0, 10, 10);
scene.add(pointLight);

// Add fog to create an underwater effect
scene.fog = new THREE.FogExp2(0x003366, 0.1); // Exponential fog for a deeper water feel

// Load the fish model using GLTFLoader
const loader = new THREE.GLTFLoader();
loader.load('models/sturgeon.glb', function (gltf) {
    const fish = gltf.scene;
    fish.position.set(0, 0, -10); // Start position of the fish
    fish.scale.set(0.5, 0.5, 0.5); // Adjust scale as needed
    scene.add(fish);

    // Fish animation variables
    const fishSpeed = 0.05;
    let direction = 1; // 1 means moving forward, -1 means moving backward

    // Animate the fish with a swimming motion
    const animate = function () {
        requestAnimationFrame(animate);

        // Move the fish forward along the z-axis
        fish.position.z += fishSpeed * direction;

        // Reverse direction when the fish reaches certain boundaries
        if (fish.position.z > 5) {
            direction = -1; // Move backward
        } else if (fish.position.z < -10) {
            direction = 1; // Move forward
        }

        // Rotate the fish slightly to simulate natural swimming
        fish.rotation.y += 0.01 * direction;

        renderer.render(scene, camera);
    };
    animate();
}, undefined, function (error) {
    console.error('Error loading the model', error);
});

// Set camera position
camera.position.z = 5;

// Handle window resize to keep the aspect ratio correct
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Optional: Add floating particles or bubbles for more immersion
const bubbleGeometry = new THREE.SphereGeometry(0.05, 16, 16);
const bubbleMaterial = new THREE.MeshPhongMaterial({ color: 0x99ccff, transparent: true, opacity: 0.6 });
for (let i = 0; i < 100; i++) {
    const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
    bubble.position.set(
        (Math.random() - 0.5) * 20, // X position
        (Math.random() - 0.5) * 10, // Y position
        (Math.random() - 0.5) * 20  // Z position
    );
    scene.add(bubble);
}

// Make bubbles slowly rise to the top, simulating underwater bubbles
function animateBubbles() {
    scene.traverse((object) => {
        if (object.isMesh && object.geometry.type === "SphereGeometry") {
            object.position.y += 0.01; // Move bubbles upwards
            if (object.position.y > 5) object.position.y = -5; // Reset position when it goes too high
        }
    });
    requestAnimationFrame(animateBubbles);
}
animateBubbles();
