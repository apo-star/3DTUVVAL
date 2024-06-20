import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import useControlStore from 'provider/Zustand';

type GLTFResult = GLTF & {
  nodes: {
    Body_Body_0: THREE.Mesh;
  };
  materials: {
    ['Body.001']: THREE.MeshStandardMaterial;
  };
};

export function Mobile_Back(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/assets/Mobile/back.glb') as GLTFResult;
  const hsv = useControlStore((state) => state.hsv);
  const material = new THREE.MeshBasicMaterial({ color: hsv[hsv.length - 1] });
  return (
    <group
      {...props}
      dispose={null}
      scale={[3, 3, 3]}
      position={[0, -4.94, 0]}
      rotation={[-Math.PI / 2, Math.PI, 0]}
    >
      <group scale={0.01}>
        <group scale={100}>
          <mesh
            geometry={nodes.Body_Body_0.geometry}
            material={material}
            position={[0, 0, -0.153]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/assets/Mobile/back.glb');
