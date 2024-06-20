import React, { createContext, ReactNode, useState } from 'react';

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

type ContextProps = {
  controlStatus: boolean;
  showMenu: boolean;
  scale: number;
  hsv: Array<string>;
  sh: Array<number>;
  degree: number;
  clothModel: Array<string>;
  designUrl: FileInfo;
  items: Array<Item>;
  selectedIndex: number;
  download: boolean;
  lastIndex: number;
  processFlag: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setControlStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  setHSV: React.Dispatch<React.SetStateAction<Array<string>>>;
  setSH: React.Dispatch<React.SetStateAction<Array<number>>>;
  setDegree: React.Dispatch<React.SetStateAction<number>>;
  setClothModel: React.Dispatch<React.SetStateAction<Array<string>>>;
  setDesignUrl: React.Dispatch<React.SetStateAction<FileInfo>>;
  setItems: React.Dispatch<React.SetStateAction<Array<Item>>>;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  setDownload: React.Dispatch<React.SetStateAction<boolean>>;
  setLastIndex: React.Dispatch<React.SetStateAction<number>>;
  setProcessFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = {
  children: ReactNode;
};

export const ControlContext = createContext<ContextProps>({
  controlStatus: true,
  showMenu: true,
  scale: 0,
  hsv: [],
  sh: [],
  degree: 0,
  clothModel: [],
  designUrl: {
    name: '',
    path: '',
  },
  selectedIndex: -1,
  items: [],
  download: false,
  lastIndex: -1,
  processFlag: false,
  setDegree: () => {},
  setShowMenu: () => {},
  setControlStatus: () => {},
  setScale: () => {},
  setHSV: () => {},
  setSH: () => {},
  setClothModel: () => {},
  setDesignUrl: () => {},
  setItems: () => {},
  setSelectedIndex: () => {},
  setDownload: () => {},
  setLastIndex: () => {},
  setProcessFlag: () => {},
});

export const ControlProvider = ({ children }: Props) => {
  const [controlStatus, setControlStatus] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState(false);
  const [scale, setScale] = useState<number>(100);
  const [hsv, setHSV] = useState<Array<string>>([
    'white',
    'white',
    'white',
    'white',
  ]);
  const [sh, setSH] = useState<Array<number>>([100, 100]);
  const [degree, setDegree] = useState<number>(0);
  const [designUrl, setDesignUrl] = useState<FileInfo>({ name: '', path: '' });
  const [clothModel, setClothModel] = useState<Array<string>>([
    'TShirt',
    'front',
    '2.8',
    '3',
    '0',
    '600',
  ]);
  const [processFlag, setProcessFlag] = useState<boolean>(false);
  const [items, setItems] = useState<Array<Item>>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [download, setDownload] = useState<boolean>(false);
  const [lastIndex, setLastIndex] = useState<number>(-1);
  return (
    <ControlContext.Provider
      value={{
        controlStatus,
        showMenu,
        scale,
        hsv,
        sh,
        degree,
        clothModel,
        designUrl,
        items,
        selectedIndex,
        download,
        lastIndex,
        processFlag,
        setControlStatus,
        setShowMenu,
        setScale,
        setHSV,
        setSH,
        setDegree,
        setClothModel,
        setDesignUrl,
        setItems,
        setSelectedIndex,
        setDownload,
        setLastIndex,
        setProcessFlag,
      }}
    >
      {children}
    </ControlContext.Provider>
  );
};
