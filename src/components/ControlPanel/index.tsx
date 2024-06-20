import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Scrollbars } from 'react-custom-scrollbars-2';
import ColorTheme from 'components/ColorTheme';
import DesignList from 'components/DesignList';
import useControlStore from 'provider/Zustand';

export default function ControlPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const SideBarRef = useRef<any>(null);
  const setDesignUrl = useControlStore((state) => state.setDesignUrl);
  const setDownload = useControlStore((state) => state.setDownload);
  const setSelectedIndex = useControlStore((state) => state.setSelectedIndex);
  const [selectedFile, setSelectedFile] = useState<any>();

  useEffect(() => {
    if (SideBarRef.current) {
      if (sidebarOpen)
        gsap.to(SideBarRef.current, {
          duration: 1,
          ease: 'power2.out',
          x: 0,
        });
      else
        gsap.to(SideBarRef.current, {
          duration: 1,
          ease: 'power2.out',
          x: window.innerWidth >= 768 ? 393 : 230,
        });
    }
  }, [SideBarRef, sidebarOpen]);

  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile) as string;
    setDesignUrl({ name: selectedFile.name, path: objectUrl });
    setSelectedFile(null);
  }, [selectedFile]);

  const onSelectFile = (e: any) => {
    if (
      !e.target.files ||
      e.target.files.length === 0 ||
      e.target.files[0].size > 26214400
    ) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
    e.target.value = null;
  };

  const hiddenFileInput = useRef<any>();

  const handleClick = () => {
    hiddenFileInput?.current?.click();
  };

  const showModal = () => {
    const element = document.getElementById('aiModal');

    if (element) {
      element.style.display =
        element.style.display === 'block' ? 'none' : 'block';
    }
  };

  return (
    <div
      className='absolute top-0 right-0  border-r border-zinc-300 drop-shadow-md shadow-md text-zinc-700'
      ref={SideBarRef}
    >
      <div className='w-230 md:w-393 h-screen relative'>
        <button
          className='text-3xl h-36 border border-zinc-300 rounded-full p-3 absolute -left-9 top-1/2 hover:bg-zinc-200 drop-shadow-md shadow-md bg-white'
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <p className='mr-5'>{sidebarOpen ? '>' : '<'}</p>
        </button>
      </div>
      <div className='w-230 md:w-393 h-screen  p-5 absolute top-0 bg-white'>
        <p className='text-2xl text-black'>Renk Seçimi</p>
        <p>Ürününüzü oluşturmak istediğiniz renkleri seçebilirsiniz.</p>
        <Scrollbars autoHide>
          <div className='flex justify-start items-center flex-wrap my-6 gap-3'>
            <ColorTheme color='#E7E9E7' name='Blanc De Blanc' />
            <ColorTheme color='#2F2D30' name='Moonless Night' />
            <ColorTheme color='#7C8E76' name='Loden Frost' />
            <ColorTheme color='#F6E2A2' name='Pale Banana' />
          </div>
          <div className='relative'>
            <p className='text-2xl text-zinc-900'>Katmanlar</p>
            <DesignList />
            <input
              className={'hidden'}
              ref={hiddenFileInput}
              type='file'
              accept='.jpg, .png'
              onChange={onSelectFile}
            />
            <button
              className='flex justify-start items-center text-black p-4 border-dashed border border-zinc-400 w-full font-bold space-x-3 hover:bg-zinc-100 my-2'
              onClick={() => showModal()}
            >
              <PlusIcon className='w-7  ' />
              <div className='flex flex-col justify-between items-start'>
                <p className='text-lg'>Create images using AI</p>
              </div>
            </button>
            <button
              className='flex justify-start items-center text-black p-4 border-dashed border border-zinc-400 w-full font-bold space-x-3 hover:bg-zinc-100 my-2'
              onClick={handleClick}
            >
              <PlusIcon className='w-7  ' />
              <div className='flex flex-col justify-between items-start'>
                <p className='text-lg'>Tasarımını Yükle</p>
                <p className='text-zinc-500 text-sm'>
                  Baskı alanı boyutu için önerilen ölçüler
                </p>
                <p className='text-zinc-500 text-sm'>
                  <span className=' border-b border-dashed border-zinc-500'>
                    4500 x 5100px
                  </span>
                  (300 DPI)
                </p>
              </div>
            </button>
          </div>
          <div className='flex justify-center items-center mt-6'>
            <button
              className='bg-black hover:bg-zinc-800 text-white text-center px-8 py-4 rounded-full'
              onClick={() => {
                setSelectedIndex(-1);
                setDownload(true);
              }}
            >
              Ürün Oluştur
            </button>
          </div>
          <div className='mt-40'></div>
        </Scrollbars>
      </div>
    </div>
  );
}
