import Button from 'components/Button';
import useControlStore from 'provider/Zustand';

export default function ButtonGroup() {
  const selectedModel = useControlStore((state) => state.selectedModel);
  const setSelectedModel = useControlStore((state) => state.setSelectedModel);

  return (
    <div
      className='absolute flex md:flex-row flex-col justify-center items-center bottom-10 inset-x-0 left-1/2 -translate-x-1/2'
      id='button'
    >
      <div className='flex justify-center items-center space-x-4 lg:space-x-12'>
        <Button
          active={selectedModel[1] === 'front'}
          onClick={(e) => {
            e.preventDefault();
            setSelectedModel([
              selectedModel[0],
              'front',
              selectedModel[2],
              selectedModel[3],
              selectedModel[4],
              selectedModel[5],
            ]);
          }}
        >
          Ön Yüz
        </Button>
        <Button
          active={selectedModel[1] === 'back'}
          onClick={(e) => {
            e.preventDefault();
            setSelectedModel([
              selectedModel[0],
              'back',
              selectedModel[2],
              selectedModel[3],
              selectedModel[4],
              selectedModel[5],
            ]);
          }}
        >
          Arka Yüz
        </Button>
      </div>
    </div>
  );
}
