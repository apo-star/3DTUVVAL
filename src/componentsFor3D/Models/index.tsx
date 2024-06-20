import BackGround from 'componentsFor3D/BackGround';
import ClothModel from 'componentsFor3D/ClothModel';

type Props = {
  visible?: boolean;
  stand?: number;
  index?: number;
};

export default function Models({ visible, stand, index = 0 }: Props) {
  return (
    <group>
      <BackGround frontSide='front' visible={visible} stand={stand} />
      <BackGround frontSide='back' visible={visible} stand={stand} />
      <ClothModel
        frontSide='back'
        visible={visible}
        stand={stand}
        index={index}
      />
      <ClothModel
        frontSide='front'
        visible={visible}
        stand={stand}
        index={index}
      />
    </group>
  );
}
