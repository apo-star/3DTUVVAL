import { useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { XCircleIcon } from '@heroicons/react/24/solid';
import useControlStore from 'provider/Zustand';
type Props = {
  color: string;
  name: string;
};

export default function ColorTheme({ color, name }: Props) {
  const hsv = useControlStore((state) => state.hsv);
  const setHSV = useControlStore((state) => state.setHSV);
  const [clr, setColor] = useState('');

  return (
    <div
      className='p-2 border border-zinc-300 w-40'
      style={{
        borderStyle: 'solid',
        borderWidth: clr === color ? '4px' : '4px',
        borderColor: clr === color ? '#9DA4C5' : '#EFEFEF',
      }}
    >
      <div className='flex justify-start items-center space-x-3 text-sm'>
        <div className='w-5 h-5' style={{ backgroundColor: color }} />
        <p>{name}</p>
      </div>
      <hr className='my-2' />
      <div className='flex justify-between items-center'>
        <p>{clr === color ? 'Renk Seçildi!' : 'Renk Kullan'}</p>
        {clr === color ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              const result = hsv.filter((ele) => ele !== clr);
              setHSV(result);
              setColor('');
            }}
          >
            <XCircleIcon className='w-7 h-auto text-red-500' />
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              setHSV([...hsv, color]);
              setColor(color);
            }}
          >
            <PlusCircleIcon className='w-7   h-auto text-zinc-500' />
          </button>
        )}
      </div>
    </div>
  );
}
