import * as THREE from './node_modules/three/build/three.module.js';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { ARButton } from './node_modules/three/examples/jsm/webxr/ARButton.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// Add AR button to the page
document.body.appendChild(ARButton.createButton(renderer));

// Light setup
const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
light.position.set(0.5, 1, 0.25);
scene.add(light);

// Load the GLB model with animation
const loader = new GLTFLoader();
loader.load('./models/sturgeon.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(10, 10, 10); // Scale the model up significantly
    scene.add(model);

    // Extract animations and play them
    const mixer = new THREE.AnimationMixer(model);
    gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
    });

    // Animation update within the render loop
    function animate() {
        renderer.setAnimationLoop((timestamp, frame) => {
            if (frame) {
                mixer.update(0.01); // Update the animation mixer
                renderer.render(scene, camera);
            }
        });
    }

    // Start animation when AR session starts
    renderer.xr.addEventListener('sessionstart', animate);
}, undefined, (error) => {
    console.error('Error loading model:', error);
});

// Handle resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
