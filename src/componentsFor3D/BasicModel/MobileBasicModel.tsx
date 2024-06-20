import { useEffect, useState } from 'react';
import useControlStore from 'provider/Zustand';
import { Decal, Plane, useGLTF, useTexture } from '@react-three/drei';
import { Vector3 } from 'three/src/math/Vector3';
import { Quaternion } from 'three/src/math/Quaternion';
import { Euler } from 'three/src/math/Euler';
import { PivotControls } from 'componentsFor3D/PivotControls';

const position = new Vector3();
const scale = new Vector3();
const quaternion = new Quaternion();

type Props = {
  url: string;
  index: number;
  size: number;
  rot: number;
  visible: boolean;
  pos: Array<number>;
};

const MobileBasicModel = ({ url, index, size, rot, visible, pos }: Props) => {
  const selectedIndex = useControlStore((state) => state.selectedIndex);
  const selectedModel = useControlStore((state) => state.selectedModel);
  const setSelectedIndex = useControlStore((state) => state.setSelectedIndex);
  const [update, setUpdate] = useState(0.000001);
  const [value, setValue] = useState<Array<number>>([0, 0, 0, 0, 0, 1, 1]);
  const texture = useTexture(url);

  const { nodes } = useGLTF(`/assets/Mobile/back.glb`);
  useEffect(() => {
    if (update > 0.001) setUpdate(0.000001);
    else setUpdate(update + 0.000001);
  }, [selectedModel[1]]);

  return (
    <mesh
      geometry={nodes.Body_Body_0.geometry}
      position={[pos[0], -4.48, pos[1]]}
      visible={visible}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[3, 3, 3]}
      layers={1}
    >
      <group position={[0, 0, -0.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <PivotControls
          scale={0.3}
          lineWidth={6}
          activeAxes={[true, false, true]}
          disableAxes={selectedIndex !== index}
          disableSliders={selectedIndex !== index}
          disableRotations={selectedIndex !== index}
          onDrag={(local) => {
            local.decompose(position, quaternion, scale);
            const rotation = new Euler().setFromQuaternion(quaternion);
            let yRad = rotation.y;
            if (rotation.x !== 0) yRad = -rotation.x - rotation.y;
            setValue([
              position.x,
              position.z,
              rotation.x,
              yRad,
              rotation.z,
              scale.x,
              scale.z,
            ]);
          }}
          visible={selectedIndex === index}
        />
      </group>
      <group
        rotation={[-Math.PI, -value[4] + rot, 0]}
        position={[value[0], value[1], 0.8 + parseFloat(selectedModel[4])]}
        scale={[value[5], value[6], 1]}
        onPointerDown={(e) => {
          if (visible) {
            e.stopPropagation();
            setSelectedIndex(index);
          }
        }}
      >
        <Plane rotation={[value[2], 0, value[3]]}>
          <meshBasicMaterial transparent opacity={0} color={'blue'} />
        </Plane>
      </group>
      <Decal
        position={[value[0] + update, value[1], 0]}
        rotation={[-Math.PI, 0, value[3] + rot]}
        scale={[
          value[5] * (texture.image.width / texture.image.height),
          value[6],
          5,
        ]}
      >
        <meshStandardMaterial
          map={texture}
          transparent
          opacity={1}
          toneMapped={false}
          color={selectedIndex === index ? 'grey' : 'white'}
        />
      </Decal>
      <meshBasicMaterial transparent opacity={0} color={'blue'} />
    </mesh>
  );
};

export default MobileBasicModel;
