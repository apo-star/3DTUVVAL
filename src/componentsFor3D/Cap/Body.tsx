import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    baseballCap001: THREE.Mesh;
    baseballCap002: THREE.Mesh;
    baseballCap003: THREE.Mesh;
    blinn1SG: THREE.Mesh;
    plastic001: THREE.Mesh;
    plastic: THREE.Mesh;
    baseballCap: THREE.Mesh;
  };
  materials: {
    baseballCap: THREE.MeshStandardMaterial;
    blinn1SG: THREE.MeshStandardMaterial;
    plastic: THREE.MeshStandardMaterial;
  };
};

type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>
>;

export function CapBody(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/assets/Cap/body.glb') as GLTFResult;
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
        geometry={nodes.baseballCap001.geometry}
        material={materials.baseballCap}
        position={[0.005, -2.9, -11.842]}
        rotation={[-0.161, 0, 0]}
        scale={20.118}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.baseballCap002.geometry}
        material={materials.baseballCap}
        position={[0.005, -2.9, -11.842]}
        rotation={[-0.161, 0, 0]}
        scale={20.118}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.baseballCap003.geometry}
        material={materials.baseballCap}
        position={[0.005, -2.9, -11.842]}
        rotation={[-0.161, 0, 0]}
        scale={20.118}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.blinn1SG.geometry}
        material={materials.blinn1SG}
        position={[0.005, -2.9, -11.842]}
        rotation={[-0.161, 0, 0]}
        scale={20.118}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.plastic001.geometry}
        material={materials.plastic}
        position={[0.005, -2.9, -11.842]}
        rotation={[-0.161, 0, 0]}
        scale={20.118}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.plastic.geometry}
        material={materials.plastic}
        position={[0.005, -2.9, -11.842]}
        rotation={[-0.161, 0, 0]}
        scale={20.118}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.baseballCap.geometry}
        material={materials.baseballCap}
        position={[0.005, -2.9, -11.842]}
        rotation={[-0.161, 0, 0]}
        scale={20.118}
      />
    </group>
  );
}

useGLTF.preload('/body.glb');
