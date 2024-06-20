import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    Apple_Logo_Logo_0: THREE.Mesh;
    Body_Bezel_0: THREE.Mesh;
    Body_Camera_Glass_0: THREE.Mesh;
    Body_Lens_0: THREE.Mesh;
    Body_Material_0: THREE.Mesh;
    Body_Mic_0: THREE.Mesh;
    Body_Wallpaper_0: THREE.Mesh;
    Body001_Screen_Glass_0: THREE.Mesh;
    Button_Frame_0: THREE.Mesh;
    Camera_Body_0: THREE.Mesh;
    Camera_Camera_Frame001_0: THREE.Mesh;
    Camera_Glass_0: THREE.Mesh;
    Camera_Mic_0: THREE.Mesh;
    Camera001_Black_Glass_0: THREE.Mesh;
    Camera001_Body_0: THREE.Mesh;
    Camera001_Camera_Frame_0: THREE.Mesh;
    Camera001_Camera_Glass_0: THREE.Mesh;
    Camera001_Flash_0: THREE.Mesh;
    Camera001_Gray_Glass_0: THREE.Mesh;
    Camera001_Lens_0: THREE.Mesh;
    Camera001_Port_0: THREE.Mesh;
    Camera003_Material002_0: THREE.Mesh;
    Circle003_Frame_0: THREE.Mesh;
    Frame_Antenna_0: THREE.Mesh;
    Frame_Frame2_0: THREE.Mesh;
    Frame_Frame_0: THREE.Mesh;
    Frame_Mic_0: THREE.Mesh;
    Frame_Port_0: THREE.Mesh;
  };
  materials: {
    ['Logo.001']: THREE.MeshStandardMaterial;
    ['Bezel.001']: THREE.MeshStandardMaterial;
    ['Camera_Glass.001']: THREE.MeshStandardMaterial;
    ['Lens.001']: THREE.MeshStandardMaterial;
    ['Material.003']: THREE.MeshStandardMaterial;
    ['material.001']: THREE.MeshStandardMaterial;
    ['Wallpaper.001']: THREE.MeshStandardMaterial;
    ['Screen_Glass.001']: THREE.MeshStandardMaterial;
    ['Frame.001']: THREE.MeshStandardMaterial;
    ['Body.002']: THREE.MeshStandardMaterial;
    ['Camera_Frame.002']: THREE.MeshStandardMaterial;
    ['Glass.001']: THREE.MeshStandardMaterial;
    ['Black_Glass.001']: THREE.MeshStandardMaterial;
    ['Camera_Frame.003']: THREE.MeshStandardMaterial;
    ['Flash.001']: THREE.MeshStandardMaterial;
    ['Gray_Glass.001']: THREE.MeshStandardMaterial;
    ['Port.001']: THREE.MeshStandardMaterial;
    ['Material.004']: THREE.MeshStandardMaterial;
    ['Antenna.001']: THREE.MeshStandardMaterial;
    ['Frame2.001']: THREE.MeshStandardMaterial;
  };
};

export function Mobile_Body(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/assets/Mobile/body.glb') as GLTFResult;
  return (
    <group
      {...props}
      dispose={null}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[3, 3, 3]}
      position={[0, -5, 0]}
    >
      <group scale={0.01}>
        <group scale={100}>
          <mesh
            geometry={nodes.Frame_Antenna_0.geometry}
            material={materials['Antenna.001']}
          />
          <mesh
            geometry={nodes.Frame_Frame2_0.geometry}
            material={materials['Frame2.001']}
          />
          <mesh
            geometry={nodes.Frame_Frame_0.geometry}
            material={materials['Frame.001']}
          />
          <mesh
            geometry={nodes.Frame_Mic_0.geometry}
            material={materials['material.001']}
          />
          <mesh
            geometry={nodes.Frame_Port_0.geometry}
            material={materials['Port.001']}
          />
          <mesh
            geometry={nodes.Apple_Logo_Logo_0.geometry}
            material={materials['Logo.001']}
          />
          <mesh
            geometry={nodes.Body_Bezel_0.geometry}
            material={materials['Bezel.001']}
          />
          <mesh
            geometry={nodes.Body_Camera_Glass_0.geometry}
            material={materials['Camera_Glass.001']}
          />
          <mesh
            geometry={nodes.Body_Lens_0.geometry}
            material={materials['Lens.001']}
          />
          <mesh
            geometry={nodes.Body_Material_0.geometry}
            material={materials['Material.003']}
          />
          <mesh
            geometry={nodes.Body_Mic_0.geometry}
            material={materials['material.001']}
          />
          <mesh
            geometry={nodes.Body_Wallpaper_0.geometry}
            material={materials['Wallpaper.001']}
          />
          <mesh
            geometry={nodes.Body001_Screen_Glass_0.geometry}
            material={materials['Screen_Glass.001']}
          />
          <mesh
            geometry={nodes.Button_Frame_0.geometry}
            material={materials['Frame.001']}
          />
          <mesh
            geometry={nodes.Camera_Body_0.geometry}
            material={materials['Body.002']}
          />
          <mesh
            geometry={nodes.Camera_Camera_Frame001_0.geometry}
            material={materials['Camera_Frame.002']}
          />
          <mesh
            geometry={nodes.Camera_Glass_0.geometry}
            material={materials['Glass.001']}
          />
          <mesh
            geometry={nodes.Camera_Mic_0.geometry}
            material={materials['material.001']}
          />
          <mesh
            geometry={nodes.Camera001_Black_Glass_0.geometry}
            material={materials['Black_Glass.001']}
          />
          <mesh
            geometry={nodes.Camera001_Body_0.geometry}
            material={materials['Body.002']}
          />
          <mesh
            geometry={nodes.Camera001_Camera_Frame_0.geometry}
            material={materials['Camera_Frame.003']}
          />
          <mesh
            geometry={nodes.Camera001_Camera_Glass_0.geometry}
            material={materials['Camera_Glass.001']}
          />
          <mesh
            geometry={nodes.Camera001_Flash_0.geometry}
            material={materials['Flash.001']}
          />
          <mesh
            geometry={nodes.Camera001_Gray_Glass_0.geometry}
            material={materials['Gray_Glass.001']}
          />
          <mesh
            geometry={nodes.Camera001_Lens_0.geometry}
            material={materials['Lens.001']}
          />
          <mesh
            geometry={nodes.Camera001_Port_0.geometry}
            material={materials['Port.001']}
          />
          <mesh
            geometry={nodes.Camera003_Material002_0.geometry}
            material={materials['Material.004']}
          />
          <mesh
            geometry={nodes.Circle003_Frame_0.geometry}
            material={materials['Frame.001']}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/assets/Mobile/body.glb');
