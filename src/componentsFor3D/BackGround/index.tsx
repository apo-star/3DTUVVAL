import { useState, useEffect } from 'react';
import useControlStore from 'provider/Zustand';
import { useTexture } from '@react-three/drei';

type Props = {
  frontSide: string;
  stand?: number;
  visible?: boolean;
};

const BackGround = ({ frontSide, stand = 0, visible = true }: Props) => {
  const selectedModel = useControlStore((state) => state.selectedModel);
  const [pos, setPos] = useState([0, 0]);
  const texture = useTexture(`/assets/${selectedModel[0]}/o${frontSide}.png`);
  useEffect(() => {
    if (selectedModel[1] === frontSide) setPos([0, 0]);
    else setPos([0, 100]);
  }, [selectedModel[1]]);

  return (
    <mesh
      position={[pos[0] + stand, -0.2, pos[1]]}
      rotation={[-Math.PI / 2, 0, 0]}
      visible={visible}
      layers={100}
    >
      <planeGeometry
        args={[parseFloat(selectedModel[2]), parseFloat(selectedModel[3])]}
      />
      <meshBasicMaterial
        map={texture}
        toneMapped={false}
        transparent
        opacity={1}
      />
    </mesh>
  );
};

export default BackGround;
