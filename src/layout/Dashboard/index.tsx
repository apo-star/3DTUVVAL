import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Scrollbars } from 'react-custom-scrollbars-2';
import ControlPanel from 'components/ControlPanel';
import Configurator from 'layout/Configurator';
import DataList from 'assets/data.json';
import useControlStore from 'provider/Zustand';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const setSelectedModel = useControlStore((state) => state.setSelectedModel);
  const SideBarRef = useRef<any>(null);

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
          x: window.innerWidth >= 786 ? -393 : -230,
        });
    }
  }, [SideBarRef, sidebarOpen]);

  return (
    <div className='relative z-30'>
      <Configurator />
      <ControlPanel />
      <div
        className='absolute top-0 left-0  border-r border-zinc-300 drop-shadow-md shadow-md text-zinc-700'
        ref={SideBarRef}
      >
        <div className='w-230 md:w-393 h-screen relative'>
          <button
            className='text-3xl h-36 border border-zinc-300 rounded-full p-3 absolute -right-9 bottom-1/2 hover:bg-zinc-200 drop-shadow-md shadow-md bg-white'
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <p className='ml-5'>{sidebarOpen ? '<' : '>'}</p>
          </button>
        </div>
        <div className='w-230 md:w-393 h-screen p-5 md:p-10 absolute top-0 bg-white'>
          <p className='text-2xl text-black'>Modelini Seç</p>
          <p>Tasarımınızı oluşturmak istediğiniz modeli seçebilirsiniz.</p>
          <Scrollbars autoHide>
            {DataList.map((item, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedModel([
                    item.dir,
                    'front',
                    item.wdith,
                    item.height,
                    item.y,
                    item.zoom,
                    item.type,
                  ]);
                }}
              >
                <img
                  src={`assets/${item.dir}/ofront.jpg`}
                  className='p-2 border border-zinc-400 w-full h-auto my-3 hover:shadow-lg hover:border-4'
                />
              </button>
            ))}
            <div className='mt-20'></div>
          </Scrollbars>
        </div>
      </div>
    </div>
  );
}
