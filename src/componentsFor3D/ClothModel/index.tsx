import { useRef } from 'react';
import useControlStore from 'provider/Zustand';
import { useTexture } from '@react-three/drei';

type Props = {
  frontSide: string;
  stand?: number;
  visible?: boolean;
  index?: number;
};

const BackGround = ({
  frontSide,
  stand = 0,
  visible = true,
  index = 0,
}: Props) => {
  const hsv = useControlStore((state) => state.hsv);
  const selectedModel = useControlStore((state) => state.selectedModel);
  const colorRef = useRef<any>(null);
  const texture = useTexture(`/assets/${selectedModel[0]}/${frontSide}.png`);

  return (
    <mesh
      position={[
        0,
        0.01 - stand / 100,
        selectedModel[1] === frontSide ? 0 : 100,
      ]}
      rotation={[-Math.PI / 2, 0, 0]}
      visible={true}
      layers={index + 1}
    >
      <planeGeometry
        args={[parseFloat(selectedModel[2]), parseFloat(selectedModel[3])]}
      />
      <meshBasicMaterial
        ref={colorRef}
        map={texture}
        color={hsv[hsv.length - 1 - index]}
        transparent
        opacity={1}
      />
    </mesh>
  );
};

export default BackGround;
