import { create } from 'zustand';

interface FreeCount {
  count: number;
  decrementFreeCount: () => void;
}

export const useFreeCount = create<FreeCount>((set) => ({
  count: 5,
  decrementFreeCount: () => set((state) => ({ count: state.count - 1 })),
}));
