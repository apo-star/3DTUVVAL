import { Mobile_Body } from './Body';
import { Mobile_Back } from './Back';
import MobileBasicModel from 'componentsFor3D/BasicModel/MobileBasicModel';
import useControlStore from 'provider/Zustand';

export default function Mobile() {
  const items = useControlStore((state) => state.items);
  const selectedModel = useControlStore((state) => state.selectedModel);

  return (
    <>
      <Mobile_Body />
      <Mobile_Back />
      {items.map((ele, index) => {
        let pos = [0, 100];
        if (ele.frontSide === selectedModel[1]) pos = [0, 0];
        return (
          <MobileBasicModel
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
