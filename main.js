import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import {codoGenericoCuerpo} from './estructuras.js';

// Config
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const scene = new Three.Scene();
scene.background = new Three.Color("#f0e6d2").convertSRGBToLinear();
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
camera.position.set(10, 2.5, 0);
camera.lookAt(0, 0, 0);
controls.update();

const ambientLight = new Three.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);
scene.fog = new Three.Fog(0x000000, 100, 200);
scene.add(new Three.GridHelper(100, 100));


const baseGeometry0 = new Three.CylinderGeometry(2, 2, 0.5, 32)
const baseGeometry1 = new Three.CylinderGeometry(1, 2, 2, 32)
baseGeometry1.translate(0, (2+0.5)/2, 0);
let baseGeometry = mergeGeometries([baseGeometry1, baseGeometry0]);

const meshBase = new Three.Mesh(
  baseGeometry,
  new Three.MeshStandardMaterial({ color: "#E7E7E7" })
);
meshBase.position.set(0, 0.5/2, 0);
scene.add(meshBase);



window.hombro = codoGenericoCuerpo();
hombro.position.set(0, 2.5, 0);
scene.add(hombro);
console.log(hombro);

// No funciona
const codo = codoGenericoCuerpo( hombro );
// codo.translateOnAxis(new Three.Vector3(0, 1, 0), 3);
// codo.rotation.x = Math.PI/2;
// codo.rotation.y = Math.PI;
// codo.position.set(0, 2.5, 2);
scene.add(codo);
console.log(codo);

// const hombroGeometry0 = new Three.CylinderGeometry(1, 1, 2.5, 32);
// const meshHombro0 = new Three.Mesh(
//   hombroGeometry0,
//   new Three.MeshStandardMaterial({ color: "red" })
// );
// meshHombro0.position.set(0, 0, 0);

// const hombroGeometry1 = new Three.CylinderGeometry(1, 1, 1, 32);
// const meshHombro1 = new Three.Mesh(
//   hombroGeometry1,
//   new Three.MeshStandardMaterial({ color: "red" })
// );
// meshHombro1.rotation.x = Math.PI / 2;
// meshHombro1.position.set(0, 0, 1);

// const groupHombro = new Three.Group();
// groupHombro.add(meshHombro0);
// groupHombro.add(meshHombro1);
// groupHombro.position.set(0, 2.5 / 2 + 2.5, 0);

// scene.add(groupHombro);





function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
