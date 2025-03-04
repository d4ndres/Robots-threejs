import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function createScene() {
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

  function draw( callback ) {
    callback()
    renderer.render(scene, camera);
  }

  function start( callback = () => {}) {
    renderer.setAnimationLoop( () => draw(callback));
  }
  function stop() {
    renderer.setAnimationLoop(null);
  }

  return {
    scene,
    stop,
    start
  }

}