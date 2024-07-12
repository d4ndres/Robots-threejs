import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import {GenericArm} from './GenericArm.js';

// Config
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const scene = new Three.Scene();
// scene.background = new Three.Color("#f0e6d2").convertSRGBToLinear();
const renderer = new Three.WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
document.body.style.margin = 0;

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.maxDistance = 100;
controls.minDistance = 10;
// camera.position.set(0, 10, 10);
camera.position.set(20, 16, 0);
camera.lookAt(0, 0, 0);
controls.update();

const ambientLight = new Three.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);
scene.fog = new Three.Fog(0x000000, 100, 200);
scene.add(new Three.GridHelper(100, 100));


// const scara = new GenericArm({
//   linkProps: [
//     {length: 5, color: "#ff0000"}, // Fijo
//     {length: 5, color: "#00ff00", initialDirection: "x", rotationAxis: "z", axes: true},
//     {length: 6, color: "#0000ff", rotationAxis: "z", axes: true}
//   ]
// });
// scara.addInScene(scene);
// scara.Group.position.set(-10, 0, 10);

const robotArm = new GenericArm({
  linkProps: [
    {length: 1, color: "#8B8A8A"}, // Fijo
    {length: 2, color: "#97C1E0", rotationAxis: "y"}, // DOF 1
    {length: 1, color: "#97C1E0", initialDirection: "x", rotationAxis: "y"}, // DOF 2
    {length: 3, color: "#FAFAFA", initialDirection: "-x", rotationAxis: "y"},
    {length: 1, color: "#97C1E0", initialDirection: "-x", rotationAxis: "y"}, // DOF 3
    {length: 2.5, color: "#FAFAFA", initialDirection: "x", rotationAxis: "y"}, 
    {length: 1, color: "#97C1E0", initialDirection: "z", rotationAxis: "y"}, // DOF 4
    {length: 1, color: "#97C1E0", initialDirection: "x", rotationAxis: "y"}, // DOF 5
    {length: 1, color: "#97C1E0", initialDirection: "x", rotationAxis: "y"},
    {length: 0.2, color: "#FAFAFA", rotationAxis: "y", axes: true}, // DOF 6
  
  ]
});
robotArm.addInScene(scene);
robotArm.Group.position.set(0, 0, 0);



let r1 = 0;
let r2 = 0;
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  

  // r1 += 0.01;
  // scara.rotation([ 
  //   0, 
  //   Math.sin(r1) * Math.PI / 2 + Math.PI / 2, 
  //   -Math.sin(r1) * Math.PI / 1.3, 
  // ]);

  r2 += 0.008;
  robotArm.rotation([ 
    0, // No se mueve
    Math.sin(r2) * Math.PI / 2 + Math.PI / 2,  // Base
    Math.sin(r2) * Math.PI / 4, // dof 2
    0, // No se mueve
    1,// -Math.sin(r2) * Math.PI / 1.5 // dof 3
    0, // No se mueve
    0, //Math.sin(r2) * Math.PI / 3 + Math.PI / 2, // dof 4
    Math.sin(r2) * Math.PI / 3 + Math.PI/2, // dof 5
    0,
    0, Math.sin(r2) * Math.PI / 3 // dof 6
    //def 6
  ]);

}
animate();
