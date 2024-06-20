import { useState, useEffect, useRef } from 'react';
import useControlStore from 'provider/Zustand';
import { useTexture, useMask, Mask } from '@react-three/drei';
import { gsap } from 'gsap';

type Props = {
  frontSide: string;
  id: number;
};

const ClothModelMask = ({ frontSide, id }: Props) => {
  const hsv = useControlStore((state) => state.hsv);
  const selectedModel = useControlStore((state) => state.selectedModel);
  const [pos, setPos] = useState([0, 0]);
  const texture = useTexture(`/assets/${selectedModel[0]}/${frontSide}.png`);
  const stencil = useMask(id, false);
  const matRef = useRef<any>(null);

  useEffect(() => {
    if (selectedModel[1] === frontSide) setPos([0, 0]);
    else setPos([0, 100]);
  }, [selectedModel[1]]);

  useEffect(() => {
    if (matRef.current) {
      if (hsv.length >= 4 + id) {
        gsap.fromTo(
          matRef.current,
          { opacity: 0 },
          {
            duration: 1,
            ease: 'power2.out',
            opacity: 1,
            overwrite: true,
          }
        );
      } else {
        gsap.to(matRef.current, {
          duration: 1,
          ease: 'power2.out',
          overwrite: true,
          opacity: 0,
        });
      }
    }
  }, [hsv.length]);

  return (
    <group position={[pos[0], 0.01, pos[1]]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <planeGeometry
          args={[parseFloat(selectedModel[2]), parseFloat(selectedModel[3])]}
        />
        <meshBasicMaterial
          ref={matRef}
          map={texture}
          toneMapped={false}
          color={hsv.length > 4 ? hsv[3 + id] : hsv[3]}
          transparent
          opacity={0}
          {...stencil}
        />
      </mesh>
      <Mask
        id={id}
        position={[0, 1.6 - id, 0]}
        rotation={[0, 0, Math.PI * 0.3]}
      >
        <planeGeometry args={[7, 0.6]} />
      </Mask>
    </group>
  );
};

export default ClothModelMask;
