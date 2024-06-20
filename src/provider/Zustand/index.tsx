import { create } from 'zustand';

type FileInfo = {
  name: string;
  path: string;
};

type Item = {
  id: string;
  content: string;
  name: string;
  scale: number;
  frontSide: string;
  rotate: number;
  order: number;
};

type ControlState = {
  controlStatus: boolean;
  showMenu: boolean;
  scale: number;
  hsv: string[];
  sh: number[];
  degree: number;
  selectedModel: string[];
  designUrl: FileInfo;
  items: Item[];
  selectedIndex: number;
  download: boolean;
  lastIndex: number;
  processFlag: boolean;
};

type ControlActions = {
  setShowMenu: (showMenu: ControlState['showMenu']) => void;
  setControlStatus: (controlStatus: ControlState['controlStatus']) => void;
  setScale: (scale: ControlState['scale']) => void;
  setHSV: (hsv: ControlState['hsv']) => void;
  setSH: (sh: ControlState['sh']) => void;
  setDegree: (degree: ControlState['degree']) => void;
  setSelectedModel: (clothModel: ControlState['selectedModel']) => void;
  setDesignUrl: (designUrl: ControlState['designUrl']) => void;
  setItems: (items: ControlState['items']) => void;
  setSelectedIndex: (selectedIndex: ControlState['selectedIndex']) => void;
  setDownload: (download: ControlState['download']) => void;
  setLastIndex: (lastIndex: ControlState['lastIndex']) => void;
  setProcessFlag: (processFlag: ControlState['processFlag']) => void;
};

const useControlStore = create<ControlState & ControlActions>((set) => ({
  // State
  controlStatus: false,
  showMenu: false,
  scale: 100,
  hsv: ['white', 'white', 'white', 'white'],
  sh: [100, 100],
  degree: 0,
  selectedModel: ['TShirt', 'front', '2.8', '3', '0', '600', 'cloth'],
  designUrl: { name: '', path: '' },
  items: [],
  selectedIndex: -1,
  download: false,
  lastIndex: -1,
  processFlag: false,
  // Actions
  setShowMenu: (showMenu) => set(() => ({ showMenu })),
  setControlStatus: (controlStatus) => set(() => ({ controlStatus })),
  setScale: (scale) => set(() => ({ scale })),
  setHSV: (hsv) => set(() => ({ hsv })),
  setSH: (sh) => set(() => ({ sh })),
  setDegree: (degree) => set(() => ({ degree })),
  setSelectedModel: (selectedModel) => set(() => ({ selectedModel })),
  setDesignUrl: (designUrl) => set(() => ({ designUrl })),
  setItems: (items) => set(() => ({ items })),
  setSelectedIndex: (selectedIndex) => set(() => ({ selectedIndex })),
  setDownload: (download) => set(() => ({ download })),
  setLastIndex: (lastIndex) => set(() => ({ lastIndex })),
  setProcessFlag: (processFlag) => set(() => ({ processFlag })),
}));

export default useControlStore;
