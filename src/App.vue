<script setup>
import { ref, computed } from 'vue'
import {createScene} from './threeSetup.js'
import {RobotUR3e, RobotScara} from './Robots.js';
const { scene, stop, start} = createScene()

const {robotUR3e: robotArm} = RobotUR3e();
robotArm.addInScene(scene);
// robotArm.Group.position.set(0, 0, 0);

const {robotUR3e, autoRotation} = RobotUR3e();
robotUR3e.addInScene(scene);
robotUR3e.Group.position.set(-20, 0, -10);

const {robotScara, autoRotation: autoRotationScara} = RobotScara();
robotScara.addInScene(scene);
robotScara.Group.position.set(-20, 0, 10);

const menuIsActive = ref(true);
const dof = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const dofPosition = [1, 2, 4, 6, 7, 9];

let times = 0;
start(() => {
  times += 0.01;
  robotArm.rotation(dof.value);
  robotUR3e.rotation(autoRotation(times));
  robotScara.rotation(autoRotationScara(times));
})

</script>

<template>
  <div class="menu-controler" :class="{ 'active' : menuIsActive }" @click="menuIsActive = !menuIsActive"></div>
  <div class="menu" :class="{ 'active' : menuIsActive }">
    <div class="controles">
      <div v-for="(position, index) in dofPosition" :key="`dof${index + 1}`">
        <label :for="`dof${index + 1}`">DOF{{ index + 1 }}</label>
        <input :id="`dof${index + 1}`" type="range" v-model="dof[position]" min="0" :max="Math.PI " :step="Math.PI/100" />
      </div>
    </div>
    <div class="title"></div>
  </div>
</template>

<style scoped>
.menu, .menu-controler {
  position: absolute;
}

.menu-controler {
  bottom: 1rem;
  left: 1rem;
  height: 25px;
  width: 25px;
  background: rgba(133, 255, 170, 0.8);
  transition: all 0.5s;
  cursor: pointer;
  z-index: 1;
}
.menu-controler.active {
  background: rgba(133, 176, 255, 0.8);
}

.menu {
  bottom: 0;
  min-width: 100vw;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  visibility: hidden;
  transition: .3s;
}

.menu.active {
  opacity: 1;
  visibility: visible;
}

.title {
  height: 3rem;
}

.controles {
  padding: 0.5rem 0.5rem;
  color: bisque;
  display: flex;
  flex-wrap: wrap;
  gap: .25rem;
  justify-content: center;
  align-items: center;
}


</style>