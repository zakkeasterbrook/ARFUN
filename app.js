// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);

// Set background color to resemble underwater
scene.background = new THREE.Color(0x003366);

// Add lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2); // soft white light
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0x88aaff, 1, 100);
pointLight.position.set(0, 10, 10);
scene.add(pointLight);

// Load the fish model
const loader = new THREE.GLTFLoader();
loader.load('models/sturgeon.glb', function (gltf) {
    const fish = gltf.scene;
    fish.position.set(0, 0, -10); // Start position of the fish
    fish.scale.set(0.5, 0.5, 0.5); // Scale down the fish if needed
    scene.add(fish);

    // Animate the fish
    const animate = function () {
        requestAnimationFrame(animate);
        fish.position.z += 0.05; // Fish swims towards the camera
        if (fish.position.z > 5) {
            fish.position.z = -10; // Reset the fish position
        }
        renderer.render(scene, camera);
    };
    animate();
}, undefined, function (error) {
    console.error('Error loading the model', error);
});

// Set camera position
camera.position.z = 5;

// Add fog to simulate underwater effect
scene.fog = new THREE.Fog(0x003366, 1, 15);
