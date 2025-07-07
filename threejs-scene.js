import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('threejs-container').appendChild(renderer.domElement);

const loader = new GLTFLoader();
let seesawModel;

loader.load('models/seesaw.glb', (gltf) => {
    seesawModel = gltf.scene;
    scene.add(seesawModel);
}, undefined, (error) => {
    console.error(error);
});

camera.position.z = 5;

const tiltSeesaw = (side) => {
    const duration = 2000;
    const start = performance.now();

    const animate = (time) => {
        const timeFraction = (time - start) / duration;
        const progress = Math.min(timeFraction, 1);
        const angle = progress * 45;

        if (seesawModel) {
            if (side === 'debt') {
                seesawModel.rotation.y = THREE.MathUtils.degToRad(angle);
            } else {
                seesawModel.rotation.y = THREE.MathUtils.degToRad(-angle);
            }
        }

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };

    requestAnimationFrame(animate);
};

window.addEventListener('message', (event) => {
    if (event.data.action === 'tiltSeesaw') {
        tiltSeesaw(event.data.side);
    }
});

const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});