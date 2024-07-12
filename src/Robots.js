import { GenericArm } from './GenericArm.js';

export const RobotUR3e = () => {
  return {
    robotUR3e: new GenericArm({
      linkProps: [
        { length: 1, color: "#8B8A8A" }, // Fijo
        { length: 2, color: "#97C1E0", rotationAxis: "y" }, // DOF 1
        { length: 1, color: "#97C1E0", initialDirection: "x", rotationAxis: "y" }, // DOF 2
        { length: 3, color: "#FAFAFA", initialDirection: "-x", rotationAxis: "y" },
        { length: 1, color: "#97C1E0", initialDirection: "-x", rotationAxis: "y" }, // DOF 3
        { length: 2.5, color: "#FAFAFA", initialDirection: "x", rotationAxis: "y" },
        { length: 1, color: "#97C1E0", initialDirection: "z", rotationAxis: "y" }, // DOF 4
        { length: 1, color: "#97C1E0", initialDirection: "x", rotationAxis: "y" }, // DOF 5
        { length: 1, color: "#97C1E0", initialDirection: "x", rotationAxis: "y" },
        { length: 0.2, color: "#FAFAFA", rotationAxis: "y", axes: true }, // DOF 6

      ]
    }),
    autoRotation: (time) => {
      return [
        0, // No se mueve
        Math.sin(time) * Math.PI / 2 + Math.PI / 2,  // Base
        Math.sin(time) * Math.PI / 4, // dof 2
        0, // No se mueve
        1,// -Math.sin(time) * Math.PI / 1.5 // dof 3
        0, // No se mueve
        0, //Math.sin(time) * Math.PI / 3 + Math.PI / 2, // dof 4
        Math.sin(time) * Math.PI / 3 + Math.PI / 2, // dof 5
        0,
        0, Math.sin(time) * Math.PI / 3 // dof 6
        //def 6
      ]
    }
  }
}

export const RobotScara = () => {
  return {
    robotScara: new GenericArm({
      linkProps: [
        { length: 5, color: "#ff0000" }, // Fijo
        { length: 5, color: "#00ff00", initialDirection: "x", rotationAxis: "z", axes: true },
        { length: 6, color: "#0000ff", rotationAxis: "z", axes: true }
      ]
    }),
    autoRotation: (time) => {
      return [
        0,
        Math.sin(time) * Math.PI / 2 + Math.PI / 2,
        -Math.sin(time) * Math.PI / 1.3,
      ]
    }
  }
}