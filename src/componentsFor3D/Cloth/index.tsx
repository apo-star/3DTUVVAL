import useControlStore from 'provider/Zustand';
import { Layers } from 'three';
import ClothLayer from 'componentsFor3D/ClothLayer';
import Models from 'componentsFor3D/Models';
import ClothBasicModel from 'componentsFor3D/BasicModel/ClothBasicModel';

const layers = new Layers();
layers.enable(1);
layers.enable(100);

export default function Cloth() {
  const download = useControlStore((state) => state.download);
  const hsv = useControlStore((state) => state.hsv);
  const items = useControlStore((state) => state.items);
  const selectedModel = useControlStore((state) => state.selectedModel);

  return (
    <>
      <Models />
      <ClothLayer
        stand={1}
        index={1}
        visible={download && hsv.length > 5 ? true : false}
      />
      <ClothLayer
        stand={2}
        index={2}
        visible={download && hsv.length > 6 ? true : false}
      />
      <ClothLayer
        stand={3}
        index={3}
        visible={download && hsv.length > 7 ? true : false}
      />
      {items.map((ele, index) => {
        let pos = [0, 100];
        if (ele.frontSide === selectedModel[1]) pos = [0, 0];
        return (
          <ClothBasicModel
            url={ele.content}
            index={ele.order}
            size={ele.scale}
            rot={ele.rotate}
            visible={true}
            key={index}
            pos={pos}
          />
        );
      })}
    </>
  );
}
