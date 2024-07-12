import * as Three from 'three'

//Other option
// const hombroGeometry0 = new Three.CylinderGeometry(1, 1, 2.5, 32)
// hombroGeometry0.translate(0, 0, 0);
// const hombroGeometry1 = new Three.CylinderGeometry(1, 1, 1, 32)
// hombroGeometry1.rotateX(Math.PI/2);
// hombroGeometry1.translate(0, 0, 1);

// const hombroGeometry = mergeGeometries([hombroGeometry0, hombroGeometry1]);
// const meshHombro = new Three.Mesh(
//   hombroGeometry,
//   new Three.MeshStandardMaterial({ color: "red" })
// );
// hombroGeometry.translate(0, 2.5/2 + 2.5, 0);
// scene.add(meshHombro);

export const codoGenericoCuerpo = ( refMesh ) => {
  //Join
  const joinHeight = 0.25;
  const joinGeo = new Three.CylinderGeometry(1, 1, joinHeight, 32);
  const join = new Three.Mesh(
    joinGeo,
    new Three.MeshStandardMaterial({ color: "#000" })
  );
  join.position.set(0, joinHeight/2, 0);

  //Vertical Bone
  const verticalHeight = 3;
  const boneGeo = new Three.CylinderGeometry(1, 1, verticalHeight, 32);
  const vBone = new Three.Mesh(
    boneGeo,
    new Three.MeshStandardMaterial({ color: "#E7E7E7" })
  );
  vBone.position.set(0, (verticalHeight+joinHeight*2)/2, 0);
  
  //Horizontal Bone
  const horizontalHeight = 1.5;
  const hBoneGeo = new Three.CylinderGeometry(1,1, horizontalHeight, 32);
  const hBone = new Three.Mesh(
    hBoneGeo,
    new Three.MeshStandardMaterial({ color: "E7E7E7" })
  );
  hBone.position.set(0, (verticalHeight+joinHeight)/2, horizontalHeight/2);
  hBone.rotation.x = Math.PI/2;

  //roof decoration
  const roofHeight = 0.25;
  const roofGeo = new Three.CylinderGeometry(1.05, 1.05, roofHeight, 32);
  const roof = new Three.Mesh(
    roofGeo,
    new Three.MeshStandardMaterial({ color: "#7ad0f4" })
  );
  roof.position.set(0, verticalHeight+joinHeight, 0);


  //Group
  const codo = new Three.Group();
  codo.add(join);
  codo.add(vBone);
  codo.add(hBone);
  codo.add(roof);

  if(refMesh) {
// Esto no funciona y debe ser una clase

    // const refOutHeight = refMesh.children[2].geometry.parameters.height;
    // const outFace = new Three.Vector3(0, refOutHeight/2, 0);
    // outFace.applyMatrix4(refMesh.children[2].matrixWorld);

    // codo.position.copy(outFace);
    // codo.position.y += verticalHeight/2;
  
  }

  return codo;
}