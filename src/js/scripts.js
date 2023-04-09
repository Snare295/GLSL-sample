import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background
renderer.setClearColor(0x202020);

const uniforms = {
    u_time: {type: 'f', value: 0.0},
    u_mouse: {type: 'v2', value: new THREE.Vector2(0.0, 0.0)}
}

const clock = new THREE.Clock();

window.addEventListener('mousemove', function(e) {
    uniforms.u_mouse.value.set(e.screenX / window.innerWidth, e.screenY / window.innerHeight);
    console.log('x and y:', uniforms.u_mouse.value )
})

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Sets orbit control to move the camera around
const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning
camera.position.set(6, 8, 14);
orbit.update();

const geometry = new THREE.PlaneGeometry(10,10, 30, 30);
const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    wireframe: true,
    uniforms
});
const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh);
mesh.rotateZ(90)

// Sets a 12 by 12 gird helper
// const gridHelper = new THREE.GridHelper(12, 12);
// scene.add(gridHelper);

// // Sets the x, y, and z axes with each having a length of 4
// const axesHelper = new THREE.AxesHelper(4);
// scene.add(axesHelper);

function animate() {
    uniforms.u_time.value = clock.getElapsedTime();
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});