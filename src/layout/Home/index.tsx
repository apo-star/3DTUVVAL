import { Suspense, useEffect, useRef } from 'react';
import { useProgress } from '@react-three/drei';
import gsap from 'gsap';
import useControlStore from 'provider/Zustand';

export default function Home() {
  const { progress } = useProgress();
  const controlStatus = useControlStore((state) => state.controlStatus);
  const setControlStatus = useControlStore((state) => state.setControlStatus);
  const content = useRef<any>(null);
  const bg = useRef<any>(null);
  const slideEffect = () => {
    gsap.to(content.current, {
      duration: 0.8,
      ease: 'power1.out',
      opacity: 0,
      onComplete: () => {
        gsap.to(bg.current, {
          duration: 2,
          ease: 'power1.out',
          opacity: 0,
          onComplete: () => {
            setControlStatus(true);
          },
        });
      },
    });
  };

  useEffect(() => {
    if (content.current && bg.current && progress === 100) slideEffect();
  }, [progress, content, bg]);

  return !controlStatus ? (
    <div
      ref={bg}
      className='w-screen h-screen ios absolute top-0 z-30 flex items-center justify-center bg-zinc-900 select-none'
    >
      <Suspense fallback={null}>
        <div className='p-10 text-gray-500 h-screen ios w-screen flex justify-center items-center text-center'>
          <div
            ref={content}
            className='relative -translate-y-20 flex flex-col justify-center items-center space-y-5'
          >
            <p className='font-bold text-5xl'>YÜKLENİYOR...</p>
          </div>
        </div>
      </Suspense>
    </div>
  ) : null;
}
