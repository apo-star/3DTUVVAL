import { MapControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Layers } from 'three';
import { Suspense, useRef } from 'react';
import ButtonGroup from 'components/ButtonGroup';
import DownLoad from 'componentsFor3D/DownLoad';
import ImageGenerator from 'components/ImageGenerator';
import Cloth from 'componentsFor3D/Cloth';
import Mobile from 'componentsFor3D/Mobile';
import useControlStore from 'provider/Zustand';
import Cap from 'componentsFor3D/Cap';

const layers = new Layers();
layers.enable(1);
layers.enable(100);

export default function Configurator() {
  const selectedIndex = useControlStore((state) => state.selectedIndex);
  const setSelectedIndex = useControlStore((state) => state.setSelectedIndex);
  const selectedModel = useControlStore((state) => state.selectedModel);
  const download = useControlStore((state) => state.download);

  const ref = useRef<any>();
  return (
    <div className={'h-screen w-screen fixed ios'}>
      <Suspense fallback={null}>
        <Canvas
          orthographic
          dpr={[1, 1.5]}
          style={{
            width: !download ? window.innerWidth : 1800,
            height: !download ? window.innerHeight : 1800,
          }}
          camera={{ position: [0, 2, 0], zoom: 180, layers: layers }}
          raycaster={{ params: { Line: { threshold: 0.15 } } }}
          onPointerMissed={(e) => {
            e.preventDefault();
            setSelectedIndex(-1);
          }}
        >
          {selectedModel[6] === 'cloth' && <Cloth />}
          {selectedModel[6] === 'mobile' && <Cap />}
          <pointLight intensity={0.8} position={[0, 2, 0]} />
          <ambientLight intensity={0.4} />
          <MapControls
            ref={ref}
            panSpeed={0.2}
            minZoom={150}
            maxZoom={600}
            zoomSpeed={0.4}
            enableRotate={true}
            enabled={selectedIndex === -1}
            makeDefault
          />
          <DownLoad />
        </Canvas>
      </Suspense>
      {selectedModel[6] === 'cloth' && <ButtonGroup />}
      <ImageGenerator />
    </div>
  );
}
