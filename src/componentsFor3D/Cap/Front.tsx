import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    baseballCap003: THREE.Mesh;
  };
  materials: {
    ['baseballCap.005']: THREE.MeshStandardMaterial;
  };
};

type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>
>;

export function CapFront(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/assets/Cap/back.glb') as GLTFResult;
  return (
    <group
      {...props}
      dispose={null}
      scale={[0.01, 0.01, 0.01]}
      rotation={[-Math.PI / 2.4, 0, 0]}
      position={[0, -4, 0]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.baseballCap003.geometry}
        material={materials['baseballCap.005']}
        position={[0.005, -2.9, -11.842]}
        rotation={[-0.161, 0, 0]}
        scale={20.118}
      />
    </group>
  );
}

useGLTF.preload('/back.glb');
