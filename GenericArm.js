import * as Three from 'three';

export class GenericArm {
  constructor({linkProps}) {
    this.Group = new Three.Group();
    this.linkLengths = linkProps.map( ({length}) => length);
    this.linkAngles = linkProps.map( ({angle}) => angle || 0);
    this.linkDirections = linkProps.map( ({initialDirection}) => initialDirection || null);
    this.linkRotationAxis = linkProps.map( ({rotationAxis}) => rotationAxis || null);
    this.colors = linkProps.map( ({color}) => color || "#ff0000");
    this.joins = []
    this.robotBones = []
    
    this.init()
  }
  init() {
    let parentObject = this.Group;

    for (let i = 0; i < this.linkLengths.length; i++) {
      const link = this.createLink({
        length: this.linkLengths[i],
        color: this.colors[i],
        initialPosition: i === 0 ? 0 : this.linkLengths[i-1],
        linkDirections: this.linkDirections[i],
      });
      parentObject.add(link);
      this.robotBones.push(link);
      parentObject = link;
    }

  }

  addInScene(scene) {
    scene.add(this.Group);
  }

  createLink({length, linkDirections, color, initialPosition = 0}) {
    const radius = 0.2;
    const mesh = new Three.Mesh(
      new Three.CylinderGeometry(radius, radius, length, 4),
      new Three.MeshStandardMaterial({ color })
    );
    mesh.position.set(0, length/2, 0);
  
    const group = new Three.Group();
    group.add(mesh);
    group.position.set(0, initialPosition, 0);

    if (linkDirections === "x") {
      group.rotateOnAxis(new Three.Vector3(1, 0, 0), Math.PI / 2);
    }
    else if (linkDirections === "-x") {
      group.rotateOnAxis(new Three.Vector3(1, 0, 0), -Math.PI / 2);
    }
    else if (linkDirections === "z") {
      group.rotateOnAxis(new Three.Vector3(0, 0, 1), Math.PI / 2);
    }
    else if (linkDirections === "-z") {
      group.rotateOnAxis(new Three.Vector3(0, 0, 1), -Math.PI / 2);
    }
    else if (linkDirections === "y") {
      group.rotateOnAxis(new Three.Vector3(0, 1, 0), Math.PI /2);
    }
    else if (linkDirections === "-y") {
      group.rotateOnAxis(new Three.Vector3(0, 1, 0), -Math.PI /2);
    }

    group.add(new Three.AxesHelper(2));
    return group;
  }

  rotation(angles = []) {
    for(let i = 0; i < angles.length; i++) {
      if(this.linkRotationAxis[i] === null) continue;
      else if( this.linkRotationAxis[i] == 'x' ) {
        this.robotBones[i].rotation.x = angles[i];
      } else if( this.linkRotationAxis[i] == 'y' ) {
        this.robotBones[i].rotation.y = angles[i];
      } else if( this.linkRotationAxis[i] == 'z' ) {
        this.robotBones[i].rotation.z = angles[i];
      }
    }
  }
  
}