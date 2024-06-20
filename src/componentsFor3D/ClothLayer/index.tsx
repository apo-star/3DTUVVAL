import ClothModel from 'componentsFor3D/ClothModel';

type Props = {
  visible?: boolean;
  stand?: number;
  index?: number;
};

export default function ClothLayer({ visible, stand, index = 0 }: Props) {
  return (
    <group>
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
