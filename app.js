// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);

// Set background color to resemble underwater
scene.background = new THREE.Color(0x003366);

// Add lighting to simulate underwater lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0x88aaff, 1, 100);
pointLight.position.set(0, 10, 10);
scene.add(pointLight);

// Add fog to create an underwater effect
scene.fog = new THREE.FogExp2(0x003366, 0.1);

// Load the fish model using GLTFLoader
const loader = new THREE.GLTFLoader();
loader.load(
    'models/sturgeon.glb', 
    function (gltf) {
        const fish = gltf.scene;
        fish.position.set(0, 0, -10);
        fish.scale.set(0.5, 0.5, 0.5);
        scene.add(fish);

        // Fish animation variables
        const fishSpeed = 0.05;
        let direction = 1;

        // Animate the fish with a swimming motion
        const animate = function () {
            requestAnimationFrame(animate);

            fish.position.z += fishSpeed * direction;

            if (fish.position.z > 5) {
                direction = -1;
            } else if (fish.position.z < -10) {
                direction = 1;
            }

            fish.rotation.y += 0.01 * direction;

            renderer.render(scene, camera);
        };
        animate();
    },
    undefined,
    function (error) {
        console.error('Error loading the model:', error); // Detailed error message
        alert('Failed to load the model. Please check the console for more details.');
    }
);

// Set camera position
camera.position.z = 5;

// Handle window resize
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
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 20
    );
    scene.add(bubble);
}

function animateBubbles() {
    scene.traverse((object) => {
        if (object.isMesh && object.geometry.type === "SphereGeometry") {
            object.position.y += 0.01;
            if (object.position.y > 5) object.position.y = -5;
        }
    });
    requestAnimationFrame(animateBubbles);
}
animateBubbles();
