import { gsap } from 'gsap';
import useControlStore from 'provider/Zustand';
import { useEffect, useRef, useState } from 'react';
import { PuffLoader } from 'react-spinners';
export default function Alert() {
  const download = useControlStore((state) => state.download);
  const processFlag = useControlStore((state) => state.processFlag);
  const setDownload = useControlStore((state) => state.setDownload);
  const setProcessFlag = useControlStore((state) => state.setProcessFlag);

  const [hide, setHide] = useState(true);
  const alertRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (alertRef.current)
      if (download) {
        gsap.to(alertRef.current, {
          opacity: 100,
          duration: 0.3,
          ease: 'none',
          overwrite: true,
        });
      } else {
        gsap.to(alertRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: 'power1.inOut',
          overwrite: true,
          onComplete: () => setHide(true),
        });
      }
    else if (download) setHide(false);
  }, [download, alertRef.current, hide]);
  return (
    !hide && (
      <div
        ref={alertRef}
        className='w-screen h-screen z-50 absolute top-0 left-0 opacity-0 flex flex-col justify-center items-center bg-white'
      >
        {!processFlag && download ? (
          <div className='flex flex-col items-center justify-center space-y-10 font-bold text-gray-700'>
            <p>Tasarımınızı oluşturmaya hazır mısınız?</p>
            <div className='flex justify-center items-center space-x-6  '>
              <button
                className='p-5 border-2 rounded-full hover:bg-blue-500 hover:text-white'
                onClick={() => setProcessFlag(true)}
                disabled={processFlag}
              >
                Evet
              </button>
              <button
                className='p-5 border-2 rounded-full bg-gray-300 hover:bg-red-400 hover:text-white'
                onClick={() => setDownload(false)}
                disabled={processFlag}
              >
                Hayır
              </button>
            </div>
          </div>
        ) : (
          <div className='flex flex-col justify-start'>
            <PuffLoader color='#383A39' size={300} />
            <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-zinc-800 text-center pt-8'>
              Görselleriniz hazırlanıyor.
              <br /> Lütfen bekleyiniz.
            </p>
          </div>
        )}
      </div>
    )
  );
}
