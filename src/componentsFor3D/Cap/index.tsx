import CapBasicModel from 'componentsFor3D/BasicModel/CapBasicModel';
import { CapBody } from './Body';
import { CapFront } from './Front';
import useControlStore from 'provider/Zustand';
import MobileBasicModel from 'componentsFor3D/BasicModel/MobileBasicModel';

export default function Cap() {
  const items = useControlStore((state) => state.items);
  const selectedModel = useControlStore((state) => state.selectedModel);
  console.log('selectedModel', selectedModel);

  return (
    <>
      <CapBody />
      <CapFront />
      {items.map((ele, index) => {
        let pos = [0, 100];
        if (ele.frontSide === selectedModel[1]) pos = [0, 0];
        return (
          <CapBasicModel
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
